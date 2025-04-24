let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let itens = container.querySelectorAll('.list .item');
let indicator = document.querySelector('.indicators');
let dots = indicator ? indicator.querySelectorAll('ul li') : [];
let list = container.querySelector('.list');

let active = 0;
let firstPosition = 0;
let lastPosition = itens.length - 1;

// Função para ajustar a exibição do slider
function setSlider() {
    // Remove o item ativo anterior
    let itemOld = container.querySelector('.list .item.active');
    if (itemOld) {
        itemOld.classList.remove('active');
    }

    // Atualiza o número do slide
    let slideNumber = active + 1;
    indicator.querySelector('.number').innerHTML = slideNumber < 10 ? "0" + slideNumber : slideNumber;

    // Remove o indicador ativo anterior
    let dotActive = indicator.querySelector('ul li.active');
    if (dotActive) {
        dotActive.classList.remove('active');
    }

    // Define o novo indicador ativo com base no índice atual
    let dotIndex = active % 3;
    if (dots[dotIndex]) {
        dots[dotIndex].classList.add('active');
    }

    // Define o item atual como ativo
    itens[active].classList.add('active');
}

// Função para navegar para o próximo item
nextButton.onclick = () => {
    list.style.setProperty('--calculation', '1');
    active = (active < lastPosition) ? active + 1 : firstPosition;
    setSlider();
};

// Função para navegar para o item anterior
prevButton.onclick = () => {
    list.style.setProperty('--calculation', '-1');
    active = (active > firstPosition) ? active - 1 : lastPosition;
    setSlider();
};

// Inicializa o slider na primeira vez
setSlider();
