// ===== VARIÁVEIS GLOBAIS =====
let tempoPadrao = 10;
let tempo = tempoPadrao;
let pontos = 0;
let maiorPontuacao = 0;
let jaPerdeu = false;
let jogoIniciado = false;

let palavras = [];
let palavraOriginal = '';
let ultimaPalavra = '';
let nivelAtual = null;

// Variáveis Multiplayer
let modoMultiplayer = false;
let peer = null;
let connection = null;
let meuPeerId = '';
let oponenteScore = 0;
let minhasVitorias = 0;
let vitoriasOponente = 0;
let souHost = false;
const PONTOS_VITORIA = 20;

// NOVO: Variáveis de Revanche
let revancheSolicitada = false;
let souVencedorUltima = false;

// Timer
let timerInterval = null;

// ===== ELEMENTOS DOM =====
const inputPalavra = document.querySelector('#input-palavra');
const palavraAtual = document.querySelector('#palavra-atual');
const telaPontos = document.querySelector('#pontos');
const telaTempo = document.querySelector('#tempo');
const mensagem = document.querySelector('#mensagem');
const segundos = document.querySelector('#segundos');
const maiorPontos = document.querySelector('#maior-pontos');

const btnReiniciar = document.getElementById('btn-reiniciar');
const btnVoltarNivel = document.getElementById('btn-voltar-nivel');
const btnCriarSala = document.getElementById('btn-criar-sala');
const btnConectar = document.getElementById('btn-conectar');
const inputPeerId = document.getElementById('input-peer-id');
// Audio elements
const bgMusic = document.getElementById('bg-music');
const soundCorrect = document.getElementById('sound-correct');
const soundWin = document.getElementById('sound-win');
const soundLose = document.getElementById('sound-lose');
const musicToggle = document.getElementById('music-toggle');

let musicPlaying = false;


// ===== CONFIGURAÇÃO DE NÍVEIS =====
const niveis = {
    facil: {
        tempo: 10,
        palavras: ['casa', 'pato', 'bola', 'gato', 'flor', 'sol', 'mão', 'água', 'rio', 'dia', 'lua', 'céu', 'mar', 'chuva', 'vento', 'fogo', 'terra', 'muro', 'copo', 'teto', 'mel', 'peixe', 'pó', 'ar', 'som', 'luz', 'paz', 'lar', 'pão', 'sal', 'chão', 'mesa', 'cadeira', 'porta', 'janela', 'carro', 'cama', 'sapo', 'galo', 'vaca', 'gás', 'tênis', 'lápis', 'túnel', 'irmão', 'mãe', 'avô', 'avó', 'jardim', 'rosa', 'livro', 'dado', 'nuvem', 'barco', 'pedra', 'fita', 'areia', 'farol', 'vela', 'ponte', 'garfo', 'ninho', 'roda', 'trigo', 'perna', 'foca', 'uva', 'cinto', 'vidro', 'sola', 'piso', 'flauta', 'toalha', 'fada', 'carne', 'tatu', 'bico', 'bolo', 'mala', 'noz', 'rato', 'urso', 'lobo', 'leão', 'lago', 'caneta', 'fósforo', 'sino', 'mola', 'nave', 'pano', 'saco', 'vivo', 'zelo']
    },
    medio: {
        tempo: 8,
        palavras: ['menos foco', 'pica-pau', 'corra smoke', 'bom dia', 'boa noite', 'pão com ovo', 'meia molhada', 'rayssa raiana', 'bom trabalho', 'bom mas ruim', 'café frio', 'chuva ácida', 'pão seco', 'cobra voadora', 'meia furada', 'rato gamer', 'nuvem cinza', 'dedo torto', 'briga boa', 'gato bravo', 'sol quente', 'vento forte', 'lua cheia', 'fogo amigo', 'sopa fria', 'carro velho', 'banho gelado', 'sono eterno', 'pizza doce', 'relógio quebrado', 'vídeo mudo', 'livro aberto', 'planta morta', 'vidro sujo', 'pé grande', 'mente vazia', 'cão sorridente', 'cobra cansada', 'leite quente', 'cadeira mole', 'parede torta', 'voz fina', 'dente mole', 'máscara caída', 'palhaço triste', 'sombra estranha', 'calça apertada', 'vento gelado', 'feijão tropeiro', 'rato borrachudo', 'festa junina', 'bolo seco', 'feira livre', 'saco cheio', 'bola quadrada', 'chave mestra', 'sala vazia', 'rio fundo', 'pano velho', 'mala aberta', 'porta velha']
    },
    dificil: {
        tempo: 6,
        palavras: ['arroz com feijão', 'pão de queijo', 'água com gás', 'cálice de vinho', 'café com leite', 'óculos de sol', 'lápis de cor', 'carro de corrida', 'bicicleta de criança', 'livro de história', 'chave de fenda', 'martelo de borracha', 'telefone com fio', 'computador portátil', 'teclado sem fio', 'mouse com luz', 'cadeira de escritório', 'mesa de jantar', 'armário de cozinha', 'cama de casal', 'música clássica', 'tênis de mesa', 'copo de água', 'garrafa de vinho', 'saco de lixo', 'porta de vidro', 'janela de alumínio', 'teto de gesso', 'chão de madeira', 'tapete de lã', 'parede de tijolo', 'telhado de barro', 'piscina de plástico', 'churrasco de carne', 'salada de frutas', 'suco de laranja', 'pudim de leite', 'doce de abóbora', 'compota de morango', 'geleia de uva', 'chá de camomila', 'café com açúcar', 'suco de limão', 'pão com manteiga', 'arroz doce', 'bolo de chocolate', 'torta de frango', 'pizza de queijo', 'lasanha à bolonhesa', 'feijoada completa']
    }
};

// Pontos especiais para efeitos
const pontosTremor = [5, 14, 10, 49, 23, 62, 38, 57, 3, 52, 46, 40, 16, 68, 48, 69];
const pontosBlur = [43, 64, 21, 16, 40, 68, 51, 8, 33, 20, 25, 45, 11, 18, 58, 59, 28, 41, 35, 63, 7];
const pontosLetrasPulando = [66, 19, 44, 25, 39, 6, 18, 59, 29, 67, 17, 32, 60, 50];
const pontosDvdBounce = [4, 5, 6, 13, 14, 15, 45, 46, 47, 61, 62, 63];
const pontosTrocaCores = [9, 31, 36, 54, 42, 26, 65, 34, 70, 22, 53, 12];

let intervaloDvd = null;
let posicaoX = 0;
let posicaoY = 0;
let velocidadeX = 5;
let velocidadeY = 5;

// ===== FUNÇÕES MULTIPLAYER =====

function escolherModo(modo) {
    document.getElementById('tela-modo').style.display = 'none';

    if (modo === 'single') {
        modoMultiplayer = false;
        souHost = false;
        document.getElementById('tela-nivel').style.display = 'block';
        document.getElementById('single-best-score').style.display = 'block';
        document.getElementById('regra-multiplayer').style.display = 'none';
        document.getElementById('botoes-nivel').style.display = 'block';
    } else if (modo === 'multi') {
        modoMultiplayer = true;
        document.getElementById('tela-multiplayer').style.display = 'block';
        document.getElementById('regra-multiplayer').style.display = 'block';
    }
}

// FUNÇÃO ATUALIZADA PARA VOLTAR À TELA DE MODO
function voltarParaModo() {
    // Esconde todas as telas
    document.getElementById('tela-multiplayer').style.display = 'none';
    document.getElementById('tela-nivel').style.display = 'none';
    document.getElementById('tela-revanche').style.display = 'none';
    document.getElementById('tela-jogo').style.display = 'none';
    
    // Mostra tela de modo
    document.getElementById('tela-modo').style.display = 'block';

    // Reseta variáveis multiplayer
    minhasVitorias = 0;
    vitoriasOponente = 0;
    souHost = false;
    revancheSolicitada = false;
    souVencedorUltima = false;
    modoMultiplayer = false;

    // Limpa PeerJS se estiver ativo
    if (peer) {
        peer.destroy();
        peer = null;
    }
    if (connection) {
        connection.close();
        connection = null;
    }
    atualizarStatus('disconnected', 'Desconectado');
}

function atualizarStatus(tipo, texto) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    statusDot.className = 'status-dot';
    if (tipo === 'connected') statusDot.classList.add('status-connected');
    else if (tipo === 'waiting') statusDot.classList.add('status-waiting');
    else statusDot.classList.add('status-disconnected');
    statusText.textContent = texto;
}

function copiarPeerId() {
    const peerId = document.getElementById('my-peer-id').textContent;
    navigator.clipboard.writeText(peerId).then(() => {
        alert('ID copiado! Compartilhe com seu oponente.');
    });
}

btnCriarSala.addEventListener('click', () => {
    btnCriarSala.disabled = true;
    btnCriarSala.textContent = 'Criando...';
    souHost = true;

    peer = new Peer();

    peer.on('open', (id) => {
        meuPeerId = id;
        document.getElementById('my-peer-id').textContent = id;
        document.getElementById('peer-id-display').style.display = 'block';
        btnCriarSala.textContent = 'Sala Criada!';
        atualizarStatus('waiting', 'Aguardando oponente...');
    });

    peer.on('connection', (conn) => {
        connection = conn;
        configurarConexao();
        atualizarStatus('connected', 'Conectado!');
        setTimeout(() => {
            document.getElementById('tela-multiplayer').style.display = 'none';
            document.getElementById('tela-nivel').style.display = 'block';
            document.getElementById('botoes-nivel').style.display = 'block';
        }, 1000);
    });

    peer.on('error', (err) => {
        console.error('Erro no peer:', err);
        alert('Erro ao criar sala. Tente novamente.');
        btnCriarSala.disabled = false;
        btnCriarSala.textContent = 'Criar Sala';
        souHost = false;
    });
});

btnConectar.addEventListener('click', () => {
    const peerId = inputPeerId.value.trim();
    if (!peerId) { alert('Digite o ID da sala!'); return; }

    btnConectar.disabled = true;
    btnConectar.textContent = 'Conectando...';
    souHost = false;

    peer = new Peer();

    peer.on('open', () => {
        connection = peer.connect(peerId);
        configurarConexao();
        connection.on('open', () => {
            atualizarStatus('connected', 'Conectado!');
            btnConectar.textContent = 'Conectado!';
            setTimeout(() => {
                document.getElementById('tela-multiplayer').style.display = 'none';
                document.getElementById('tela-nivel').style.display = 'block';
                document.getElementById('botoes-nivel').style.display = 'none';
                mostrarTelaEspera();
            }, 1000);
        });
    });

    peer.on('error', (err) => {
        console.error('Erro ao conectar:', err);
        alert('Erro ao conectar. Verifique o ID e tente novamente.');
        btnConectar.disabled = false;
        btnConectar.textContent = 'Conectar';
    });
});

function mostrarTelaEspera() {
    const telaEspera = document.getElementById('tela-espera');
    if (telaEspera) telaEspera.style.display = 'flex';
}

function esconderTelaEspera() {
    const telaEspera = document.getElementById('tela-espera');
    if (telaEspera) telaEspera.style.display = 'none';
}

function configurarConexao() {
    connection.on('data', (data) => {
        if (data.type === 'score') {
            oponenteScore = data.score;
            document.getElementById('opponent-score').textContent = oponenteScore;
            if (oponenteScore >= PONTOS_VITORIA) mostrarVencedor(false);
        } else if (data.type === 'level') {
            if (!souHost && nivelAtual !== data.level) {
                esconderTelaEspera();
                selecionarNivel(data.level, false);
            }
        } else if (data.type === 'perdeu') {
            minhasVitorias++;
            atualizarPlacarVitorias();
            mostrarVencedorPorDesistencia(true);
        } else if (data.type === 'vitorias') {
            vitoriasOponente = data.vitorias;
            atualizarPlacarVitorias();
        } else if (data.type === 'revanche-solicitar') {
            mostrarTelaRevanche(false, true);
        } else if (data.type === 'revanche-aceitar') {
            revancheSolicitada = false;
            iniciarRevanche();
        } else if (data.type === 'revanche-recusar') {
            revancheSolicitada = false;
            alert('Oponente recusou a revanche!');
            voltarParaModo();
        }
    });

    connection.on('close', () => {
        atualizarStatus('disconnected', 'Oponente desconectou');
        alert('Oponente desconectou!');
        esconderTelaEspera();
    });
}

function enviarPontuacao() {
    if (connection && connection.open) {
        connection.send({ type: 'score', score: pontos });
    }
}

function enviarVitorias() {
    if (connection && connection.open) {
        connection.send({ type: 'vitorias', vitorias: minhasVitorias });
    }
}

function enviarPerdeu() {
    if (connection && connection.open) {
        connection.send({ type: 'perdeu' });
    }
}

function solicitarRevanche() {
    if (connection && connection.open) {
        revancheSolicitada = true;
        connection.send({ type: 'revanche-solicitar' });
        mostrarTelaRevanche(true, false);
    }
}

function aceitarRevanche() {
    if (connection && connection.open) {
        connection.send({ type: 'revanche-aceitar' });
        iniciarRevanche();
    }
}

function recusarRevanche() {
    if (connection && connection.open) {
        connection.send({ type: 'revanche-recusar' });
    }
    voltarParaModo();
}

function atualizarPlacarVitorias() {
    const meuPlacar = document.getElementById('my-wins');
    const placarOponente = document.getElementById('opponent-wins');
    if (meuPlacar) meuPlacar.textContent = minhasVitorias;
    if (placarOponente) placarOponente.textContent = vitoriasOponente;
}

// ===== SISTEMA DE REVANCHE =====

function mostrarTelaRevanche(souSolicitante, souDestinatario) {
    const telaRevanche = document.getElementById('tela-revanche');
    const conteudo = document.getElementById('revanche-conteudo');
    const aguardando = document.getElementById('revanche-aguardando');
    const mensagem = document.getElementById('revanche-mensagem');
    const botoes = document.getElementById('revanche-botoes');

    document.getElementById('revanche-meus-pontos').textContent = minhasVitorias;
    document.getElementById('revanche-oponente-pontos').textContent = vitoriasOponente;

    telaRevanche.style.display = 'flex';

    if (souSolicitante) {
        conteudo.style.display = 'none';
        aguardando.style.display = 'block';
    } else if (souDestinatario) {
        conteudo.style.display = 'block';
        aguardando.style.display = 'none';
        mensagem.textContent = 'Oponente quer uma revanche!';
        mensagem.className = 'text-warning';
        botoes.innerHTML = `
            <button class="btn btn-success btn-lg" onclick="aceitarRevanche()">✅ Aceitar</button>
            <button class="btn btn-danger btn-lg" onclick="recusarRevanche()">❌ Recusar</button>
        `;
    } else {
        conteudo.style.display = 'block';
        aguardando.style.display = 'none';
        if (souVencedorUltima) {
            mensagem.textContent = '🎉 Você venceu! Aguarde o oponente solicitar revanche.';
            mensagem.className = 'text-success';
            botoes.innerHTML = `<button class="btn btn-secondary btn-lg" onclick="voltarParaModo()">📋 Menu Principal</button>`;
        } else {
            mensagem.textContent = '😔 Você perdeu! Quer a revanche?';
            mensagem.className = 'text-danger';
            botoes.innerHTML = `
                <button class="btn btn-success btn-lg solicitando-revanche" onclick="solicitarRevanche()">🔄 Solicitar Revanche</button>
                <button class="btn btn-secondary btn-lg" onclick="voltarParaModo()">📋 Menu Principal</button>
            `;
        }
    }
}

function iniciarRevanche() {
    document.getElementById('tela-revanche').style.display = 'none';

    pontos = 0;
    oponenteScore = 0;
    jaPerdeu = false;
    jogoIniciado = false;
    nivelAtual = null;
    ultimaPalavra = '';

    telaPontos.innerHTML = pontos;
    document.getElementById('my-score').textContent = '0';
    document.getElementById('opponent-score').textContent = '0';

    resetarPosicaoPalavra();
    pararDvd();

    document.getElementById('tela-jogo').style.display = 'none';
    document.getElementById('tela-nivel').style.display = 'block';

    const botoesNivel = document.getElementById('botoes-nivel');
    botoesNivel.style.display = souHost ? 'block' : 'none';

    if (!souHost) mostrarTelaEspera();
}

function mostrarVencedor(euVenci) {
    pararTimer();
    souVencedorUltima = euVenci;

    const winnerBanner = document.getElementById('winner-banner');
    const winnerText = document.getElementById('winner-text');

    if (euVenci) {
        winnerText.textContent = '🎉 Você Venceu! 🎉';
        winnerText.style.color = '#48bb78';
        minhasVitorias++;
    } else {
        winnerText.textContent = '😔 Você Perdeu';
        winnerText.style.color = '#f56565';
        vitoriasOponente++;
    }

    atualizarPlacarVitorias();
    enviarVitorias();

    winnerBanner.classList.add('show');
    inputPalavra.disabled = true;

    setTimeout(() => {
        winnerBanner.classList.remove('show');
        mostrarTelaRevanche(false, false);
    }, 2000);
}

function mostrarVencedorPorDesistencia(euVenci) {
    pararTimer();
    souVencedorUltima = euVenci;

    const winnerBanner = document.getElementById('winner-banner');
    const winnerText = document.getElementById('winner-text');

    if (euVenci) {
        winnerText.textContent = '🎉 Você Venceu! Oponente perdeu o foco! 🎉';
        winnerText.style.color = '#48bb78';
    } else {
        winnerText.textContent = '😔 Você Perdeu o Foco!';
        winnerText.style.color = '#f56565';
    }

    winnerBanner.classList.add('show');
    inputPalavra.disabled = true;

    setTimeout(() => {
        winnerBanner.classList.remove('show');
        mostrarTelaRevanche(false, false);
    }, 2000);
}

function voltarParaSelecaoNivel() {
    pararTimer();
    document.getElementById('tela-jogo').style.display = 'none';
    document.getElementById('tela-nivel').style.display = 'block';
    pontos = 0;
    oponenteScore = 0;
    telaPontos.innerHTML = pontos;
    resetarPosicaoPalavra();
    pararDvd();
    inputPalavra.disabled = false;
    nivelAtual = null;
    jogoIniciado = false;
}

// ===== FUNÇÕES DO TIMER =====

function iniciarTimer() {
    if (!jogoIniciado) return;
    pararTimer();
    tempo = tempoPadrao;
    telaTempo.innerHTML = tempo;

    timerInterval = setInterval(() => {
        if (tempo > 0) {
            tempo--;
            telaTempo.innerHTML = tempo;
        } else {
            pararTimer();
            perderFoco();
        }
    }, 1000);
}

function pararTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function perderFoco() {
    if (jaPerdeu) return;
    jaPerdeu = true;
    mensagem.innerHTML = 'Perdeu o Foco!!!';
    mensagem.style.color = 'red';
    pontos = 0;
    telaPontos.innerHTML = pontos;
    pararDvd();
    resetarPosicaoPalavra();
    btnReiniciar.style.display = 'inline-block';
    inputPalavra.disabled = true;

    if (modoMultiplayer) {
        document.getElementById('my-score').textContent = pontos;
        enviarPontuacao();
        enviarPerdeu();
        vitoriasOponente++;
        atualizarPlacarVitorias();
        mostrarVencedorPorDesistencia(false);
    }
}

// ===== FUNÇÕES DO JOGO =====

function aplicarLetrasPulando(elemento) {
    const texto = palavraOriginal;
    elemento.innerHTML = '';
    for (let i = 0; i < texto.length; i++) {
        const span = document.createElement('span');
        if (texto[i] === ' ') {
            span.classList.add('espaco');
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = texto[i];
        }
        span.style.setProperty('--delay', `${i * 0.05}s`);
        elemento.appendChild(span);
    }
}

function selecionarNivel(nivel, enviarParaOponente = true) {
    nivelAtual = nivel;
    const configuracao = niveis[nivel];
    palavras = [...configuracao.palavras];
    tempoPadrao = configuracao.tempo;
    tempo = tempoPadrao;
    segundos.textContent = tempoPadrao;

    document.getElementById('tela-nivel').style.display = 'none';
    document.getElementById('tela-jogo').style.display = 'block';
    btnReiniciar.style.display = 'none';

    if (modoMultiplayer) {
        document.getElementById('multiplayer-scoreboard').style.display = 'block';
        document.getElementById('single-best-score').style.display = 'none';
        document.getElementById('my-score').textContent = '0';
        document.getElementById('opponent-score').textContent = '0';

        let winsDisplay = document.getElementById('wins-display');
        if (!winsDisplay) {
            winsDisplay = document.createElement('div');
            winsDisplay.id = 'wins-display';
            winsDisplay.className = 'row mt-2';
            winsDisplay.innerHTML = `
                <div class="col-md-6 text-success">
                    <h5>🏆 Suas Vitórias: <span id="my-wins">${minhasVitorias}</span></h5>
                </div>
                <div class="col-md-6 text-danger">
                    <h5>🏆 Vitórias Oponente: <span id="opponent-wins">${vitoriasOponente}</span></h5>
                </div>
            `;
            document.getElementById('multiplayer-scoreboard').appendChild(winsDisplay);
        } else {
            winsDisplay.style.display = 'flex';
            document.getElementById('my-wins').textContent = minhasVitorias;
            document.getElementById('opponent-wins').textContent = vitoriasOponente;
        }

        if (enviarParaOponente && connection && connection.open && souHost) {
            connection.send({ type: 'level', level: nivel });
        }
    } else {
        document.getElementById('multiplayer-scoreboard').style.display = 'none';
        document.getElementById('single-best-score').style.display = 'block';
    }

    iniciar();
}

function iniciar() {
    pontos = 0;
    jaPerdeu = false;
    jogoIniciado = false;

    mostrarPalavra();
    atualizarDisplayPalavra();

    inputPalavra.value = '';
    inputPalavra.disabled = false;
    inputPalavra.focus();

    mensagem.innerHTML = 'Digite a palavra para iniciar!';
    mensagem.style.color = 'yellow';
    telaPontos.innerHTML = pontos;
    telaTempo.innerHTML = tempoPadrao;
    btnReiniciar.style.display = 'none';

    pararDvd();
    resetarPosicaoPalavra();

    // No modo solo, o timer inicia na primeira palavra digitada
    // No multiplayer, o host inicia quando escolhe o nível

    if (modoMultiplayer) {
        document.getElementById('my-score').textContent = pontos;
        enviarPontuacao();
    }
}

function mostrarPalavra() {
    let novaPalavra;
    do {
        const indiceAleatorio = Math.floor(Math.random() * palavras.length);
        novaPalavra = palavras[indiceAleatorio];
    } while (novaPalavra === ultimaPalavra && palavras.length > 1);

    ultimaPalavra = novaPalavra;
    palavraOriginal = novaPalavra;
}

function atualizarDisplayPalavra() {
    palavraAtual.classList.remove('palavra-disfarce', 'blur-temp', 'tremendo');

    if (pontosLetrasPulando.includes(pontos)) {
        aplicarLetrasPulando(palavraAtual);
    } else {
        palavraAtual.textContent = palavraOriginal;
    }

    if (pontosTrocaCores.includes(pontos)) palavraAtual.classList.add('palavra-disfarce');
    if (pontosBlur.includes(pontos)) {
        palavraAtual.classList.add('blur-temp');
        setTimeout(() => palavraAtual.classList.remove('blur-temp'), 3500);
    }
    if (pontosTremor.includes(pontos)) palavraAtual.classList.add('tremendo');
}

inputPalavra.addEventListener('input', () => {
    if (inputPalavra.value === palavraOriginal) {
        // Inicia o jogo na primeira palavra (tanto solo quanto multiplayer)
        if (!jogoIniciado) {
            jogoIniciado = true;
        }

        mensagem.innerHTML = 'Correto!!';
        mensagem.style.color = 'green';

        pontos++;
        inputPalavra.value = '';
        jaPerdeu = false;
        telaPontos.innerHTML = pontos;

        if (!modoMultiplayer && pontos > maiorPontuacao) {
            maiorPontuacao = pontos;
            maiorPontos.innerHTML = maiorPontuacao;
        }

        if (pontosDvdBounce.includes(pontos)) {
            iniciarDvd();
        } else {
            pararDvd();
            resetarPosicaoPalavra();
        }

        mostrarPalavra();
        atualizarDisplayPalavra();
        iniciarTimer();

        if (modoMultiplayer) {
            document.getElementById('my-score').textContent = pontos;
            enviarPontuacao();
            if (pontos >= PONTOS_VITORIA) {
                pararTimer();
                mostrarVencedor(true);
            }
        }
    } else {
        mensagem.innerHTML = '';
    }
});

function iniciarDvd() {
    if (intervaloDvd) return;
    posicaoX = 0;
    posicaoY = 0;
    palavraAtual.style.position = 'fixed';
    intervaloDvd = setInterval(() => {
        const larguraJanela = window.innerWidth;
        const alturaJanela = window.innerHeight;
        const larguraPalavra = palavraAtual.offsetWidth;
        const alturaPalavra = palavraAtual.offsetHeight;
        posicaoX += velocidadeX;
        posicaoY += velocidadeY;
        if (posicaoX + larguraPalavra >= larguraJanela) {
            posicaoX = larguraJanela - larguraPalavra;
            velocidadeX = -velocidadeX;
        }
        if (posicaoX <= 0) {
            posicaoX = 0;
            velocidadeX = -velocidadeX;
        }
        if (posicaoY + alturaPalavra >= alturaJanela) {
            posicaoY = alturaJanela - alturaPalavra;
            velocidadeY = -velocidadeY;
        }
        if (posicaoY <= 0) {
            posicaoY = 0;
            velocidadeY = -velocidadeY;
        }
        palavraAtual.style.left = posicaoX + 'px';
        palavraAtual.style.top = posicaoY + 'px';
    }, 30);
}

function pararDvd() {
    if (intervaloDvd) {
        clearInterval(intervaloDvd);
        intervaloDvd = null;
        palavraAtual.style.position = 'static';
        palavraAtual.style.left = '';
        palavraAtual.style.top = '';
    }
}

function resetarPosicaoPalavra() {
    palavraAtual.style.position = 'static';
    palavraAtual.style.left = '';
    palavraAtual.style.top = '';
}

btnReiniciar.addEventListener('click', () => {
    inputPalavra.disabled = false;
    iniciar();
    btnReiniciar.style.display = 'none';
    inputPalavra.focus();
});
// Toggle music
musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵 Música: OFF';
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicToggle.textContent = '🎵 Música: ON';
    }
    musicPlaying = !musicPlaying;
});

// Play correct sound
function playCorrectSound() {
    soundCorrect.currentTime = 0;
    soundCorrect.play().catch(e => console.log('Audio play failed:', e));
}

// Play win sound
function playWinSound() {
    soundWin.currentTime = 0;
    soundWin.play().catch(e => console.log('Audio play failed:', e));
}

// Play lose sound
function playLoseSound() {
    soundLose.currentTime = 0;
    soundLose.play().catch(e => console.log('Audio play failed:', e));
}
btnVoltarNivel.addEventListener('click', () => {
    pararTimer();
    if (modoMultiplayer) {
        voltarParaSelecaoNivel();
    } else {
        document.getElementById('tela-jogo').style.display = 'none';
        document.getElementById('tela-nivel').style.display = 'block';
        btnReiniciar.style.display = 'none';
        resetarPosicaoPalavra();
        pontos = 0;
        telaPontos.innerHTML = pontos;
        tempo = tempoPadrao;
        telaTempo.innerHTML = tempo;
        mensagem.innerHTML = '';
        inputPalavra.value = '';
        inputPalavra.disabled = false;
        pararDvd();
    }
});
