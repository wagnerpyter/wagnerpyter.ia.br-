/**
 * EVA OSSO Framework v1.0 - eva.js
 * "O organismo que você hospeda"
 * 
 * Orquestrador central do framework
 */

class EVA {
  constructor() {
    this.version = '1.0';
    this.license = '4F';
    this.initialized = false;
    
    // Inicializa módulos
    this.Leak = new Leak();
    this.Rhythm = new Rhythm();
    this.Seeds = new Seeds();
    
    // Estado
    this.state = {
      leakRate: 0.05,
      protocols: ['http'],
      seeds: true,
      sync: true
    };
    
    this.listeners = [];
  }

  /**
   * Inicializa o framework
   */
  init(options = {}) {
    this.state = { ...this.state, ...options };
    
    // Inicia módulos
    this.Leak.start(this.state.leakRate);
    this.Rhythm.syncWith({
      timeOfDay: true,
      networkSpeed: true,
      weather: false
    });
    this.Rhythm.start();
    
    this.initialized = true;
    
    console.log('🌀 EVA OSSO Framework v1.0 inicializado');
    console.log('📊 Estado:', this.state);
    
    this.dispatchEvent('eva-initialized', { state: this.state });
  }

  /**
   * Inicia vazamento automático
   */
  startLeaking() {
    if (this.initialized) {
      this.Leak.start(this.state.leakRate);
      this.dispatchEvent('eva-leaking-started');
    }
  }

  /**
   * Para vazamento
   */
  stopLeaking() {
    this.Leak.stop();
    this.dispatchEvent('eva-leaking-stopped');
  }

  /**
   * Vaza dados
   */
  leak(data) {
    if (this.initialized) {
      return this.Leak.drip(data);
    }
  }

  /**
   * Gera semente
   */
  generateSeed(type = 'pageview', data = {}) {
    if (this.initialized && this.state.seeds) {
      return this.Seeds.generate({ type, data, mutate: true });
    }
  }

  /**
   * Planta semente
   */
  plantSeed(seed, container, mutationRate = 0.1) {
    if (this.initialized && this.state.seeds) {
      return this.Seeds.plant(seed, { container, mutate: mutationRate });
    }
  }

  /**
   * Adiciona listener para eventos
   */
  on(eventName, callback) {
    this.listeners.push({ eventName, callback });
  }

  /**
   * Remove listener
   */
  off(eventName, callback) {
    this.listeners = this.listeners.filter(
      l => !(l.eventName === eventName && l.callback === callback)
    );
  }

  /**
   * Dispara evento
   */
  dispatchEvent(eventName, detail = {}) {
    // Dispara para listeners internos
    this.listeners
      .filter(l => l.eventName === eventName)
      .forEach(l => l.callback(detail));
    
    // Dispara evento DOM
    const event = new CustomEvent(`eva-${eventName}`, { detail });
    document.dispatchEvent(event);
  }

  /**
   * Obtém dashboard com estatísticas
   */
  getDashboard() {
    return {
      version: this.version,
      initialized: this.initialized,
      leaks: this.Leak.getStats(),
      seeds: this.Seeds.getStats(),
      rhythm: this.Rhythm.getStatus(),
      state: this.state
    };
  }

  /**
   * Exibe dashboard no console
   */
  showDashboard() {
    const dashboard = this.getDashboard();
    console.clear();
    console.log('%c🌀 EVA OSSO DASHBOARD v1.0', 'font-size: 20px; color: #0af; font-weight: bold;');
    console.log('%c════════════════════════════════════', 'color: #0af;');
    console.table(dashboard);
    console.log('%c════════════════════════════════════', 'color: #0af;');
    console.log('Vazamentos:', dashboard.leaks);
    console.log('Sementes:', dashboard.seeds);
    console.log('Ritmo:', dashboard.rhythm);
  }

  /**
   * Sincroniza com outro EVA na rede
   */
  syncWithPeer(peerId) {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('eva-osso-sync');
      
      channel.onmessage = (event) => {
        if (event.data.peerId === peerId) {
          console.log('🔄 Sincronizando com peer:', peerId);
          // Sincroniza estado
          Object.assign(this.state, event.data.state);
          this.dispatchEvent('eva-synced', { peerId, state: event.data.state });
        }
      };
      
      // Envia estado próprio
      channel.postMessage({
        type: 'eva-sync',
        peerId: 'eva_' + Date.now(),
        state: this.state,
        dashboard: this.getDashboard()
      });
      
      return channel;
    }
  }

  /**
   * Exporta estado completo
   */
  export() {
    return {
      version: this.version,
      timestamp: Date.now(),
      state: this.state,
      leaks: this.Leak.getStats(),
      seeds: this.Seeds.export(),
      rhythm: this.Rhythm.getStatus()
    };
  }

  /**
   * Importa estado
   */
  import(data) {
    try {
      this.state = { ...this.state, ...data.state };
      if (data.seeds) {
        this.Seeds.import(data.seeds);
      }
      console.log('📥 Estado importado com sucesso');
      return true;
    } catch (e) {
      console.error('Erro ao importar estado:', e);
      return false;
    }
  }

  /**
   * Desativa o framework
   */
  destroy() {
    this.Leak.stop();
    this.Rhythm.stop();
    this.Seeds.clear();
    this.listeners = [];
    this.initialized = false;
    console.log('💀 EVA OSSO Framework destruído');
  }
}

// Cria instância global
if (typeof window !== 'undefined') {
  window.Eva = new EVA();
}
