const paragraphs = [
    "Bem vindo à ETPR, nesta escola trabalhamos todos com Empenho Trabalho Profissionalismo e Rigor. Neste curso, Técnico de Gestão de Equipamentos Informáticos irão aprender muito mais do que possam imaginar sobre informática.",
    "No curso de TGEI, temos quatro disciplinas do curso, tal que Comunicação de dados, Sistemas digitais e arquitetura de computadores, eletrónica fundamental e instalação e manutenção de equipamentos informaticos.",
    "Comunicações de Dados são componentes essenciais de qualquer sistema de informação atual. Através da interligação de sistemas é possível tornala disponível aos utilizadores um vasto leque de serviços e recursos.",
    "Sistemas Digitais e Arquiteturas de Computadores envolvem o design e funcionamento dos componentes digitais dos computadores modernos, abrangendo circuitos eletrónicos, operações lógicas e o projeto de hardware e software.",
    "A instalação e manutenção de equipamentos informáticos envolve configurar e colocar em funcionamento dispositivos e sistemas de computador, garantindo sua operação adequada e resolvendo problemas quando necessário.",
    "Eletrónica fundamental estuda e aplica princípios básicos da eletricidade e componentes eletrónicos, como circuitos, semicondutores e amplificadores. É essencial para o desenvolvimento de dispositivos e sistemas eletrónicos.",
    "A ETPR iniciou a sua atividade educativa em 2002, com dois cursos profissionais: Técnico/a Auxiliar de Infância e Técnico/a de Manutenção e Instalação de Equipamentos Informáticos.",  
]; 

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0; 
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);