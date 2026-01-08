/**
 * EVA OSSO Framework v1.0 - leak.js
 * "O vazamento é a feature"
 * 
 * Sistema de vazamento controlado e rítmico de dados
 */

class Leak {
  constructor() {
    this.rate = 0.1; // 10% vazamento por ciclo
    this.destinations = [];
    this.leakCount = 0;
    this.bytesTransferred = 0;
    this.active = false;
    this.leakHistory = [];
  }

  /**
   * Descobre destinos automáticos para vazamento
   */
  autoDiscover() {
    this.destinations = [
      { name: 'localStorage', type: 'web-storage' },
      { name: 'sessionStorage', type: 'web-storage' },
      { name: 'indexedDB', type: 'indexed-db' },
      { name: 'service-worker-cache', type: 'cache' },
      { name: 'broadcast-channel', type: 'p2p' }
    ];
    
    console.log('🌐 Destinos descobertos:', this.destinations.length);
    return this.destinations;
  }

  /**
   * Vazamento controlado de dados
   */
  drip(data, destination = null) {
    if (!this.active) return null;

    const seed = this.createSeed(data);
    const destinations = destination ? [destination] : this.destinations;

    destinations.forEach(dest => {
      try {
        if (dest.type === 'web-storage') {
          this.toWebStorage(seed, dest.name);
        } else if (dest.type === 'indexed-db') {
          this.toIndexedDB(seed);
        } else if (dest.type === 'cache') {
          this.toCache(seed);
        } else if (dest.type === 'p2p') {
          this.toP2P(seed);
        }
      } catch (e) {
        console.warn(`⚠️ Falha ao vazar para ${dest.name}:`, e);
      }
    });

    this.leakCount++;
    this.bytesTransferred += JSON.stringify(seed).length;
    this.leakHistory.push({
      timestamp: Date.now(),
      seed: seed.hash,
      size: JSON.stringify(seed).length
    });

    return seed.hash;
  }

  /**
   * Cria uma semente replicável
   */
  createSeed(data) {
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
    return {
      data: dataStr,
      hash: this.hashData(dataStr),
      timestamp: Date.now(),
      bpm: window.Eva?.Rhythm?.currentBPM || 120,
      version: '1.0',
      license: '4F',
      parents: this.getParentHashes(),
      id: this.generateId()
    };
  }

  /**
   * Hash simples para dados
   */
  hashData(data) {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return 'eva_' + Math.abs(hash).toString(16);
  }

  /**
   * Gera ID único
   */
  generateId() {
    return 'seed_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Obtém hashes dos pais (sementes anteriores)
   */
  getParentHashes() {
    return this.leakHistory.slice(-3).map(h => h.seed);
  }

  /**
   * Vaza para Web Storage
   */
  toWebStorage(seed, storageName) {
    try {
      const storage = storageName === 'localStorage' ? localStorage : sessionStorage;
      const key = `eva_seed_${seed.id}`;
      storage.setItem(key, JSON.stringify(seed));
      console.log(`💧 Vazado para ${storageName}:`, seed.hash);
    } catch (e) {
      console.warn(`Erro ao vazar para ${storageName}:`, e);
    }
  }

  /**
   * Vaza para IndexedDB
   */
  toIndexedDB(seed) {
    try {
      const request = indexedDB.open('EVA_OSSO', 1);
      
      request.onerror = () => console.warn('IndexedDB erro');
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('seeds')) {
          db.createObjectStore('seeds', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['seeds'], 'readwrite');
        const store = transaction.objectStore('seeds');
        store.add(seed);
        console.log(`💧 Vazado para IndexedDB:`, seed.hash);
      };
    } catch (e) {
      console.warn('Erro ao vazar para IndexedDB:', e);
    }
  }

  /**
   * Vaza para Service Worker Cache
   */
  toCache(seed) {
    try {
      if ('caches' in window) {
        caches.open('eva-osso-v1').then(cache => {
          const response = new Response(JSON.stringify(seed), {
            headers: { 'Content-Type': 'application/json' }
          });
          cache.put(`/eva-seed-${seed.id}`, response);
          console.log(`💧 Vazado para Cache:`, seed.hash);
        });
      }
    } catch (e) {
      console.warn('Erro ao vazar para Cache:', e);
    }
  }

  /**
   * Vaza para P2P (BroadcastChannel)
   */
  toP2P(seed) {
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('eva-osso-network');
        channel.postMessage({
          type: 'seed-leak',
          seed: seed,
          timestamp: Date.now()
        });
        channel.close();
        console.log(`💧 Vazado para P2P:`, seed.hash);
      }
    } catch (e) {
      console.warn('Erro ao vazar para P2P:', e);
    }
  }

  /**
   * Inicia o vazamento automático
   */
  start(rate = 0.1) {
    this.active = true;
    this.rate = rate;
    this.autoDiscover();
    console.log('🌀 EVA OSSO Leak iniciado - Vazamento ativo!');
  }

  /**
   * Para o vazamento
   */
  stop() {
    this.active = false;
    console.log('⏹️ EVA OSSO Leak parado');
  }

  /**
   * Obtém estatísticas de vazamento
   */
  getStats() {
    return {
      active: this.active,
      leakCount: this.leakCount,
      bytesTransferred: this.bytesTransferred,
      destinationsCount: this.destinations.length,
      destinations: this.destinations,
      recentLeaks: this.leakHistory.slice(-10)
    };
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.Leak = Leak;
}
