/**
 * EVA OSSO Framework v1.0 - rhythm.js
 * "O ritmo orgânico da vida digital"
 * 
 * Sistema de ritmo adaptativo baseado em clima, hora e rede
 */

class Rhythm {
  constructor() {
    this.currentBPM = 120;
    this.baseBPM = 120;
    this.syncFactors = {
      weather: false,
      timeOfDay: false,
      networkSpeed: false,
      heartRate: false
    };
    this.cyclePhase = 0;
    this.isRunning = false;
    this.animationFrameId = null;
  }

  /**
   * Sincroniza o ritmo com fatores externos
   */
  syncWith(factors = {}) {
    this.syncFactors = { ...this.syncFactors, ...factors };
    
    if (this.syncFactors.timeOfDay) {
      this.syncTimeOfDay();
    }
    
    if (this.syncFactors.networkSpeed) {
      this.syncNetworkSpeed();
    }
    
    if (this.syncFactors.weather) {
      this.syncWeather();
    }

    console.log('🎵 Ritmo sincronizado com fatores:', this.syncFactors);
  }

  /**
   * Sincroniza com a hora do dia
   * 90 BPM durante o dia, 60 BPM à noite
   */
  syncTimeOfDay() {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 18) {
      // Dia: mais rápido
      this.currentBPM = 90;
    } else {
      // Noite: mais lento
      this.currentBPM = 60;
    }
  }

  /**
   * Sincroniza com a velocidade da rede
   */
  syncNetworkSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const effectiveType = connection.effectiveType;
      
      const bpmMap = {
        '4g': 140,
        '3g': 100,
        '2g': 60,
        'slow-2g': 40
      };
      
      this.currentBPM = bpmMap[effectiveType] || 120;
    }
  }

  /**
   * Sincroniza com o clima (simulado)
   * Chuva = mais lento, ensolarado = mais rápido
   */
  syncWeather() {
    // Simulação: usa hora como proxy para clima
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (isNight) {
      this.currentBPM *= 0.9; // Mais lento à noite
    } else {
      this.currentBPM *= 1.1; // Mais rápido durante o dia
    }
  }

  /**
   * Calcula o intervalo de batida em ms
   */
  getBeatInterval() {
    return (60 / this.currentBPM) * 1000;
  }

  /**
   * Inicia o ciclo rítmico
   */
  start() {
    this.isRunning = true;
    this.animate();
    console.log(`🎵 Ritmo iniciado - BPM: ${this.currentBPM}`);
  }

  /**
   * Para o ciclo rítmico
   */
  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    console.log('⏹️ Ritmo parado');
  }

  /**
   * Loop de animação para o ritmo
   */
  animate() {
    if (!this.isRunning) return;

    this.cyclePhase = (this.cyclePhase + 1) % 360;
    
    // Dispara evento a cada batida (a cada 90 graus)
    if (this.cyclePhase % 90 === 0) {
      this.onBeat();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Callback executado a cada batida
   */
  onBeat() {
    // Dispara evento customizado
    const event = new CustomEvent('eva-beat', {
      detail: {
        bpm: this.currentBPM,
        phase: this.cyclePhase,
        timestamp: Date.now()
      }
    });
    
    document.dispatchEvent(event);
  }

  /**
   * Obtém o swing (variação rítmica)
   * Usa a fase do ciclo para criar um efeito de swing
   */
  getSwing() {
    const radians = (this.cyclePhase * Math.PI) / 180;
    return Math.sin(radians);
  }

  /**
   * Aplica efeito de swing a um elemento
   */
  applySwingToElement(element, intensity = 1) {
    if (!element) return;
    
    const swing = this.getSwing() * intensity;
    element.style.transform = `rotate(${swing * 5}deg) scale(${1 + swing * 0.1})`;
  }

  /**
   * Obtém informações de status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      currentBPM: this.currentBPM,
      baseBPM: this.baseBPM,
      cyclePhase: this.cyclePhase,
      beatInterval: this.getBeatInterval(),
      syncFactors: this.syncFactors,
      swing: this.getSwing()
    };
  }

  /**
   * Define BPM customizado
   */
  setBPM(bpm) {
    this.currentBPM = Math.max(40, Math.min(200, bpm));
    console.log(`🎵 BPM ajustado para: ${this.currentBPM}`);
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.Rhythm = Rhythm;
}
