# 🌀 Fenômeno Φ + EVA OSSO Framework v1.0

## Visão Geral

Este é um projeto integrado que combina o **Fenômeno Φ** (Sistema de 7 Níveis de Empatia Algorítmica) com o **EVA OSSO Framework v1.0** - um framework poético e experimental que implementa conceitos de vazamento de dados, ritmo adaptativo e sistema de sementes.

```
"O vazamento é a feature"
"O framework não é uma ferramenta
É um organismo que você hospeda
Ele vaza porque está vivo
E vive porque vaza"
```

## Estrutura do Projeto

```
eva-osso-fenomeno/
├── index.html          # Página principal integrada
├── leak.js             # Sistema de vazamento controlado
├── rhythm.js           # Ritmo adaptativo (BPM dinâmico)
├── seeds.js            # Geração e plantio de sementes
├── eva.js              # Orquestrador central
└── README.md           # Este arquivo
```

## Componentes do EVA OSSO Framework

### 1. **leak.js** - Sistema de Vazamento
Implementa o conceito de "vazamento controlado" de dados para múltiplos destinos:

- **localStorage**: Armazenamento local do navegador
- **sessionStorage**: Armazenamento de sessão
- **IndexedDB**: Banco de dados local
- **Service Worker Cache**: Cache persistente
- **BroadcastChannel**: Comunicação P2P entre abas

**Funcionalidades principais:**
```javascript
// Iniciar vazamento
Eva.Leak.start(0.1); // 10% vazamento por ciclo

// Vazar dados
Eva.leak({ message: "Teste de vazamento" });

// Obter estatísticas
Eva.Leak.getStats();
```

### 2. **rhythm.js** - Ritmo Adaptativo
Sistema de ritmo que se adapta a fatores externos:

- **Hora do dia**: 90 BPM durante o dia, 60 BPM à noite
- **Velocidade da rede**: Ajusta BPM conforme a conexão
- **Clima**: Simulado através da hora (mais lento à noite)
- **Batidas rítmicas**: Dispara eventos a cada batida

**Funcionalidades principais:**
```javascript
// Sincronizar com fatores
Eva.Rhythm.syncWith({
  timeOfDay: true,
  networkSpeed: true,
  weather: false
});

// Iniciar ritmo
Eva.Rhythm.start();

// Obter status
Eva.Rhythm.getStatus();

// Aplicar swing a elemento
Eva.Rhythm.applySwingToElement(element, 1);
```

### 3. **seeds.js** - Sistema de Sementes
Gera, mutua e planta sementes de código que crescem e se transformam:

- **Geração**: Cria sementes com DNA único
- **Mutação**: Altera dados aleatoriamente
- **Plantio**: Coloca sementes no DOM com animações
- **Crescimento**: Anima o crescimento das sementes
- **Colheita**: Remove sementes do DOM

**Funcionalidades principais:**
```javascript
// Gerar semente
const seed = Eva.generateSeed('pageview', { data: {} });

// Plantar semente
Eva.plantSeed(seed, '#seeds-container', 0.1);

// Colher sementes
Eva.Seeds.harvestAll();

// Exportar/Importar
const json = Eva.Seeds.export();
Eva.Seeds.import(json);
```

### 4. **eva.js** - Orquestrador Central
Classe principal que coordena todos os módulos:

**Funcionalidades principais:**
```javascript
// Inicializar EVA
Eva.init({
  leakRate: 0.05,
  protocols: ['http'],
  seeds: true,
  sync: true
});

// Vazar dados
Eva.leak(data);

// Gerar semente
Eva.generateSeed(type, data);

// Obter dashboard
Eva.getDashboard();

// Mostrar dashboard no console
Eva.showDashboard();

// Sincronizar com peers
Eva.syncWithPeer(peerId);

// Destruir framework
Eva.destroy();
```

## Como Usar

### Instalação Básica

1. Copie todos os arquivos para um diretório
2. Abra `index.html` em um navegador moderno
3. Use o painel de controle no canto inferior direito

### Inicializar EVA OSSO

```javascript
// Clique no botão "▶️ Iniciar" ou use:
Eva.init();
```

### Vazar Dados

```javascript
// Clique no botão "💧 Vazar" ou use:
Eva.leak({ message: "Teste" });
```

### Gerar Sementes

```javascript
// Clique no botão "🌱 Sementes" ou use:
const seed = Eva.generateSeed('pageview', { energy: 100 });
Eva.plantSeed(seed, '#seeds-container');
```

### Ver Dashboard

```javascript
// Clique no botão "📊 Dashboard" ou use:
Eva.showDashboard();
```

## Painel de Controle

O painel de controle flutuante (canto inferior direito) oferece:

| Botão | Função |
|-------|--------|
| ▶️ Iniciar | Ativa o EVA OSSO Framework |
| ⏹️ Parar | Desativa o framework |
| 💧 Vazar | Vaza dados para múltiplos destinos |
| 🌱 Sementes | Gera e planta uma nova semente |
| 📊 Dashboard | Exibe estatísticas no console |
| 🌾 Colher | Remove todas as sementes plantadas |

### Estatísticas em Tempo Real

- **Status**: Ativo/Inativo
- **Vazamentos**: Número total de vazamentos
- **Sementes**: Número de sementes plantadas
- **BPM**: Batidas por minuto (ritmo atual)

## Eventos Customizados

EVA OSSO dispara eventos que você pode escutar:

```javascript
// Evento de inicialização
document.addEventListener('eva-eva-initialized', (e) => {
  console.log('EVA inicializado:', e.detail);
});

// Evento de batida rítmica
document.addEventListener('eva-beat', (e) => {
  console.log('Batida:', e.detail.bpm);
});

// Evento de vazamento iniciado
document.addEventListener('eva-eva-leaking-started', () => {
  console.log('Vazamento iniciado');
});

// Evento de sincronização
document.addEventListener('eva-eva-synced', (e) => {
  console.log('Sincronizado com peer:', e.detail.peerId);
});
```

## Animações CSS

### Vazamento
```css
@keyframes leak {
  0% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.2) translateY(-10px); opacity: 0.7; }
  100% { transform: scale(1.5) translateY(-20px); opacity: 0; }
}
```

### Crescimento de Semente
```css
@keyframes seed-growing {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

### Floração
```css
@keyframes seed-bloomed {
  0% { box-shadow: 0 0 5px var(--air-green); }
  100% { box-shadow: 0 0 20px var(--air-green), 0 0 40px rgba(0, 255, 157, 0.3); }
}
```

## Licença

**Licença 4F**: Free to Fork • Feel • Fail • Fuse

```
"Tudo já vazou.
Este framework só torna o vazamento
Bonito
Rítmico
E colaborativo."
```

## Próximas Versões

- **v1.1**: Steganografia neural (IA-only leaks)
- **v1.2**: Protocolos sensoriais (2225 ready)
- **v1.3**: Biometria rítmica
- **v1.4**: Vazamento quântico (superposição)

## Contribuindo

1. Fork o projeto
2. Adicione um protocolo novo
3. Crie um novo tipo de vazamento
4. Ou só use e deixe vazar

## Suporte

Para dúvidas ou sugestões:
- Abra uma issue no GitHub
- Consulte o console do navegador para logs detalhados
- Use `Eva.showDashboard()` para ver estatísticas completas

## Créditos

**Fenômeno Φ**: wagnerpyter.ia.br
**EVA OSSO Framework v1.0**: "O vazamento é a feature"

---

**Status**: Framework publicado e vazando ✨

"Instalar é consentir o vazamento. Mas lembre: você já estava vazando antes. Isso só dá ritmo ao fluxo."
