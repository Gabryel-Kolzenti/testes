const perguntas = [
    {
        pergunta: "Quem foi o apresentador original do programa 'Show do Milhão' no Brasil?",
        opcoes: ["Silvio Santos", "Fausto Silva", "Luciano Huck", "Jô Soares"],
        resposta: "Silvio Santos"
    },

    {
        pergunta: "Qual era o valor do prêmio máximo no programa 'Quem Quer Ser um Milionário' na versão brasileira?",
        opcoes: ["R$ 1 milhão", "R$ 2 milhões", "R$ 500 mil", "R$ 1,5 milhão"],
        resposta: "R$ 1 milhão"
    },

    {
        pergunta: "Qual era o nome do quadro em que participantes do 'Show do Milhão' podiam ganhar um carro?",
        opcoes: ["Duelo", "Corrida Milionária", "Carro na Mão", "Rodada de Carros"],
        resposta: "Duelo"
    },

    {
        pergunta: "Quem foi o primeiro apresentador do programa 'Quem Quer Ser um Milionário' na versão brasileira?",
        opcoes: ["Luciano Huck", "Fausto Silva", "Pedro Bial", "Serginho Groisman"],
        resposta: "Luciano Huck"
    },

    {
        pergunta: "Qual desses artistas brasileiros participou como convidado especial no programa 'Show do Milhão'?",
        opcoes: ["Ivete Sangalo", "Luan Santana", "Sandy & Junior", "Caetano Veloso"],
        resposta: "Ivete Sangalo"
    }
];


const perguntaElemento = document.getElementById('pergunta');
const opcoesElemento = document.getElementById('opcoes');
const resultadoElemento = document.getElementById('resultado');
const body = document.querySelector('body')
const buttons = document.querySelectorAll('#opcoes button')
const divInicial = document.querySelector('main div')
const quizContainer = document.querySelector('.quiz-container')

let indicePerguntaAtual = 0;
let questõesCertas = 0;

function comecaJogo(params) {
const buttonComeca = document.querySelector('main div button');
buttonComeca.addEventListener("click", () => {
    divInicial.classList.add('animaComeco');
    quizContainer.classList.add('animaPergunta');
    carregarPergunta();
    setTimeout(removeItem, 1500)
});
}

function removeItem(params) {
    divInicial.classList.add('comecaJogo');
}


function carregarPergunta(respostaSelecionada) {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    perguntaElemento.textContent = perguntaAtual.pergunta;

    opcoesElemento.innerHTML = "";
    resultadoElemento.innerHTML ='';
    perguntaAtual.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.addEventListener("click", () => {verificaResposta(opcao);
            desabilitarBotoes();
        });
        opcoesElemento.appendChild(botao);
        resultadoElemento.textContent = "";
        resultadoElemento.className = ""; 
    });
    resultadoElemento.textContent = "";
    resultadoElemento.className = "";
    habilitarBotoes(); 
}

function recompensa(respostaSelecionada) {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    perguntaElemento.textContent = perguntaAtual.pergunta;

    opcoesElemento.innerHTML = "";
    perguntaAtual.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.addEventListener("click", () => verificaResposta(opcao));
        opcoesElemento.appendChild(botao);
        resultadoElemento.textContent = "";
        resultadoElemento.className = ""; 
    });
    resultadoElemento.textContent = "";
    resultadoElemento.className = ""; 
}


function verificaResposta(respostaSelecionada) {
    const perguntaAtual = perguntas [indicePerguntaAtual];
    if (respostaSelecionada === perguntaAtual.resposta) {
        function certa(params) {
            questõesCertas++;
            resultadoElemento.textContent = "Resposta Correta!";
            resultadoElemento.className = "correto";
            const audioCerto = new Audio();
            audioCerto.src = 'audios/silvio-santos-certa-resposta.mp3'
            audio.volume = 0.17;
            audioCerto.play();
    }
    } else {
        function errada(params) {
            resultadoElemento.textContent = "Resposta incorreta. A resposta correta é:" + perguntaAtual.resposta;
            resultadoElemento.className = "incorreto";   
            const audioErrado = new Audio();
            audioErrado.src = 'audios/silvio-santos-que-pena-voce-errou.mp3'
            audio.volume = 0.17;
            audioErrado.play();
        }

    }
    //Avança para proxima pergunta ou finaliza o quiz
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        setTimeout(carregarPergunta, 3500); //Carrega próxima pergunta após 2 segundos
    } else {
        function concluido(params) {
            resultadoElemento.innerHTML = ''
            resultadoElemento.textContent = `Parabéns, você acertou ${questõesCertas.toString()} questões!!`;
            resultadoElemento.className = "concluido";
            body.className = 'vencedor'
        }
        setTimeout(concluido, 3000)
    }

        setTimeout(certa, 2000)
        setTimeout(errada, 2000)
}

function desabilitarBotoes() {
    const botoes = document.querySelectorAll('.quiz-container button');
    botoes.forEach(botao => {   
        botao.className = `desabilita`; 
    });
}

function habilitarBotoes() {
    const botoes = document.querySelectorAll('.quiz-container button');
    botoes.forEach(botao => {
        botao.className = ``; 
    });
}

//Carrega a primeira pergunta quando a página carrega

comecaJogo();