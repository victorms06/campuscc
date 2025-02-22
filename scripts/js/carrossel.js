import { map } from "./mapa.js";

document.getElementById('overlay').addEventListener('click', (evento) => {
    if (evento.target === document.getElementById('overlay')) {
       fecharCarrossel();
    }
    if(evento.target === document.getElementById('btn-fechar-modal-carrossel')) {
        fecharCarrossel();
    }
})

export function abrirCarrossel(nome, imagens) {
    if (imagens && imagens.length > 0) {
        document.getElementById("overlay").style.display = "flex"; 
        configuracaoCarrosel(nome, imagens);  
    } else {
        console.error("Sem imagens do local");
    }
}

export function fecharCarrossel() {
    document.getElementById('overlay').style.display = 'none';
    map.closePopup();
}


function configuracaoCarrosel(nome, imagens) {
    const carousel = document.getElementById("carouselExample");
    const prevButton = document.getElementsByClassName('carousel-control-prev')[0];
    const nextButton = document.getElementsByClassName('carousel-control-next')[0];
    const carouselInner = document.getElementsByClassName('carousel-inner')[0];
    const imagemCarrosselAtual = document.getElementById('atual');  // Adicionado
    const imagemCarrosselTotal = document.getElementById('total');  // Adicionado
    const tituloCarrossel = document.getElementById('modal-carrossel-titulo');

    carouselInner.innerHTML = '';

    carousel.focus();

    console.log(tituloCarrossel)
    tituloCarrossel.innerHTML = nome;

    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            prevButton.click();
        } else if (event.key === 'ArrowRight') {
            nextButton.click();
        } else if (event.key === 'Escape') {
            fecharCarrossel();
        }
    });

    if (imagens.length > 0) {
        imagemCarrosselTotal.textContent = imagens.length; // Atualiza o total de imagens

        imagens.forEach((imagem, index) => {
            const itemCarrossel = document.createElement('div');
            itemCarrossel.classList.add('carousel-item');
            if (index === 0) itemCarrossel.classList.add('active');

            const imagemCarrossel = document.createElement('img');
            imagemCarrossel.classList.add('d-flex', 'imagem-carrossel');
            imagemCarrossel.src = 'images/' + imagem.src;
            imagemCarrossel.alt = imagem.alt;

            imagemCarrossel.onerror = () => console.error('Erro ao carregar imagem:', imagem.src);

            itemCarrossel.appendChild(imagemCarrossel);
            carouselInner.appendChild(itemCarrossel);
        });

        // Atualiza o contador atual ao navegar
        let indiceAtual = 1; 
        imagemCarrosselAtual.textContent = indiceAtual;

        prevButton.addEventListener('click', () => {
            indiceAtual = (indiceAtual - 1) < 1 ? imagens.length : indiceAtual - 1;
            imagemCarrosselAtual.textContent = indiceAtual;
        });

        nextButton.addEventListener('click', () => {
            indiceAtual = (indiceAtual % imagens.length) + 1;
            imagemCarrosselAtual.textContent = indiceAtual;
        });
    } else {
        console.error("Nenhuma imagem foi recebida para esse local.");
    }
}


