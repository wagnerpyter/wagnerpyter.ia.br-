/**
 * EVA OSSO Framework v1.0 - seeds.js
 * "Sementes que crescem no código"
 * 
 * Sistema de geração, mutação e plantio de sementes
 */

class Seeds {
  constructor() {
    this.generated = 0;
    this.planted = 0;
    this.growing = 0;
    this.seedLibrary = [];
    this.mutationRate = 0.1;
  }

  /**
   * Gera uma nova semente
   */
  generate(options = {}) {
    const {
      type = 'pageview',
      data = {},
      mutate = false,
      mutationRate = this.mutationRate
    } = options;

    const seed = {
      id: this.generateId(),
      type: type,
      data: data,
      timestamp: Date.now(),
      bpm: window.Eva?.Rhythm?.currentBPM || 120,
      generation: 1,
      mutations: 0,
      dna: this.generateDNA(data)
    };

    if (mutate) {
      this.mutateSeed(seed, mutationRate);
    }

    this.seedLibrary.push(seed);
    this.generated++;

    console.log(`🌱 Semente gerada [${seed.type}]:`, seed.id);
    return seed;
  }

  /**
   * Gera ID único para semente
   */
  generateId() {
    return 'seed_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Gera DNA da semente (representação codificada)
   */
  generateDNA(data) {
    const dataStr = JSON.stringify(data);
    let dna = '';
    
    for (let i = 0; i < dataStr.length; i++) {
      const code = dataStr.charCodeAt(i);
      dna += String.fromCharCode(65 + (code % 26)); // A-Z
    }
    
    return dna.substring(0, 32); // Limita a 32 caracteres
  }

  /**
   * Mutação de semente
   */
  mutateSeed(seed, mutationRate = 0.1) {
    if (Math.random() < mutationRate) {
      seed.mutations++;
      seed.generation++;
      
      // Altera dados aleatoriamente
      if (typeof seed.data === 'object') {
        const keys = Object.keys(seed.data);
        if (keys.length > 0) {
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          seed.data[randomKey] = this.mutateValue(seed.data[randomKey]);
        }
      }
      
      // Regenera DNA
      seed.dna = this.generateDNA(seed.data);
      
      console.log(`🧬 Semente mutada:`, seed.id);
    }
  }

  /**
   * Mutação de valor individual
   */
  mutateValue(value) {
    if (typeof value === 'number') {
      return value + (Math.random() - 0.5) * value * 0.2;
    } else if (typeof value === 'string') {
      return value + '_mutated_' + Math.random().toString(36).substr(2, 5);
    } else if (typeof value === 'boolean') {
      return !value;
    }
    return value;
  }

  /**
   * Planta uma semente em um container
   */
  plant(seed, options = {}) {
    const {
      container = '#content',
      mutate = 0,
      animate = true
    } = options;

    const element = typeof container === 'string' 
      ? document.querySelector(container)
      : container;

    if (!element) {
      console.warn('Container não encontrado:', container);
      return null;
    }

    // Cria uma cópia da semente
    const plantedSeed = JSON.parse(JSON.stringify(seed));
    
    // Aplica mutação se necessário
    if (mutate > 0) {
      this.mutateSeed(plantedSeed, mutate);
    }

    // Cria elemento visual para a semente
    const seedElement = document.createElement('div');
    seedElement.className = 'eva-seed-planted';
    seedElement.dataset.seedId = plantedSeed.id;
    seedElement.dataset.seedType = plantedSeed.type;
    seedElement.innerHTML = `
      <div class="seed-content">
        <div class="seed-dna">${plantedSeed.dna}</div>
        <div class="seed-info">
          <span class="seed-type">${plantedSeed.type}</span>
          <span class="seed-gen">Gen: ${plantedSeed.generation}</span>
        </div>
      </div>
    `;

    if (animate) {
      seedElement.classList.add('eva-seed-growing');
    }

    element.appendChild(seedElement);
    this.planted++;
    this.growing++;

    console.log(`🌱 Semente plantada:`, plantedSeed.id);
    return seedElement;
  }

  /**
   * Faz uma semente crescer (anima)
   */
  grow(seedElement, duration = 3000) {
    if (!seedElement) return;

    seedElement.classList.add('eva-seed-growing');
    
    setTimeout(() => {
      seedElement.classList.add('eva-seed-bloomed');
      this.growing--;
    }, duration);
  }

  /**
   * Colhe uma semente (remove do DOM)
   */
  harvest(seedElement) {
    if (!seedElement) return;

    seedElement.classList.add('eva-seed-harvested');
    
    setTimeout(() => {
      seedElement.remove();
      this.growing = Math.max(0, this.growing - 1);
    }, 1000);
  }

  /**
   * Colhe todas as sementes
   */
  harvestAll() {
    const seeds = document.querySelectorAll('.eva-seed-planted');
    seeds.forEach(seed => this.harvest(seed));
  }

  /**
   * Obtém estatísticas
   */
  getStats() {
    return {
      generated: this.generated,
      planted: this.planted,
      growing: this.growing,
      librarySize: this.seedLibrary.length,
      mutationRate: this.mutationRate,
      recentSeeds: this.seedLibrary.slice(-5)
    };
  }

  /**
   * Limpa a biblioteca de sementes
   */
  clear() {
    this.seedLibrary = [];
    this.generated = 0;
    this.planted = 0;
    this.growing = 0;
    console.log('🗑️ Biblioteca de sementes limpa');
  }

  /**
   * Exporta sementes como JSON
   */
  export() {
    return JSON.stringify(this.seedLibrary, null, 2);
  }

  /**
   * Importa sementes de JSON
   */
  import(jsonData) {
    try {
      const seeds = JSON.parse(jsonData);
      this.seedLibrary = [...this.seedLibrary, ...seeds];
      this.generated += seeds.length;
      console.log(`📥 ${seeds.length} sementes importadas`);
      return true;
    } catch (e) {
      console.error('Erro ao importar sementes:', e);
      return false;
    }
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.Seeds = Seeds;
}
