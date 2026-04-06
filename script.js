// Coloque a data do início do namoro aqui (Ano, Mês-1, Dia, Hora, Minuto)
// Exemplo: 27 de Agosto de 2024 às 20:00 -> new Date(2024, 7, 27, 20, 0, 0)
// Nota: Janeiro é 0, Agosto é 7.
const dataInicio = new Date(2025, 11, 12, 20, 0, 0); 

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById('dias').innerText = dias.toString().padStart(2, '0');
    document.getElementById('horas').innerText = horas.toString().padStart(2, '0');
    document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
}

// Atualiza a cada 1 segundo
setInterval(atualizarContador, 1000);
atualizarContador(); // Chama uma vez logo de cara

const textoCarta = `Meu bem,

Sou muito feliz ao seu lado, de um jeito que palavras nem conseguem explicar direito. É uma paz, uma alegria e uma certeza no coração que eu nunca senti antes. Com você, tudo faz mais sentido, tudo fica mais leve… e até os dias difíceis se tornam mais fáceis só por saber que eu tenho você.

E no fundo eu sei, com toda certeza, que não foi por acaso. Foi Deus. Foi Ele que escreveu a nossa história, que cruzou os nossos caminhos no momento certo e do jeito certo. Porque algo tão especial assim não poderia simplesmente acontecer… foi propósito, foi cuidado, foi resposta de oração.

Eu agradeço a Deus por você todos os dias. Por ter colocado alguém tão incrível na minha vida, alguém que me faz sorrir, crescer e querer ser melhor. E se depender de mim, eu vou cuidar de nós com todo amor do mundo, porque eu sei o quanto isso aqui é raro… e o quanto é de Deus. 🤍✨
💜 `;

let index = 0;

function escreverCarta() {
    if (index < textoCarta.length) {
        document.getElementById("typewriter").innerHTML += textoCarta.charAt(index);
        index++;
        setTimeout(escreverCarta, 50); // Velocidade da digitação
    }
}

// Para começar a escrever apenas quando a seção aparecer na tela
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        escreverCarta();
        observer.disconnect(); // Roda apenas uma vez
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('#carta'));

const audio = document.getElementById('meuAudio');
const btn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progress');
const disco = document.getElementById('disco');

// Função para dar Play/Pause
btn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            btn.innerText = '⏸';
            disco.classList.add('playing');
        }).catch(error => {
            console.log("Erro ao tocar: ", error);
            alert("Clique em qualquer lugar da página antes de dar o play!");
        });
    } else {
        audio.pause();
        btn.innerText = '▶';
        disco.classList.remove('playing');
    }
});

// Atualiza a barra de progresso conforme a música toca
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
});

// Resetar quando a música acabar
audio.addEventListener('ended', () => {
    btn.innerText = '▶';
    disco.classList.remove('playing');
    progressBar.style.width = '0%';
});