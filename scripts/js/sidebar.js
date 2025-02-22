import { map } from "./mapa.js";

const sidebar = document.getElementById('sidebar');
const conteudoPrincipal = document.getElementById('main-content');
const botaoSidebar = document.getElementById('toggleSidebar');
const btnFecharSidebar = document.getElementById('closeSidebar');
const inputPesquisa = document.getElementById('search-input');
const botaoDisciplinas = document.getElementById('btn-disciplina');
const botaoFaq = document.getElementById('btn-faq');
const botaoFecharModalFaq = document.getElementById('btn-fechar-modal-faq');
const botaoFecharModalDisciplinas = document.getElementById('btn-fechar-modal-disciplina');
const modalDisciplinas = document.getElementById('modal-disciplinas');
const modalFaq = document.getElementById('modal-faq');
const btnModalAtalhos = document.getElementById('btn-atalhos');
const btnFecharModalAtalhos = document.getElementById('btn-fechar-modal-atalhos');

function abrirSidebar() {
  sidebar.classList.toggle('active');
  conteudoPrincipal.classList.toggle('with-sidebar')
  map.closePopup();
  inputPesquisa.focus();
}

export function removerSidebar() {
  sidebar.classList.remove('active');
  conteudoPrincipal.classList.remove('with-sidebar');
}

botaoSidebar.addEventListener('click', () => {
    abrirSidebar();
});

document.addEventListener('keydown', (evento) => {
  if(evento.ctrlKey && evento.key === 'f') {
    evento.preventDefault();
    abrirSidebar();
  }
})

btnFecharSidebar.addEventListener('click', () =>  removerSidebar());

botaoDisciplinas.addEventListener('click', () => {
  const overlayDisciplina = document.getElementById('overlay-disciplina');
  overlayDisciplina.style.display = 'flex'; // Exibe o overlay
}); 

botaoFaq.addEventListener('click', () => {
  const overlayFaq = document.getElementById('overlay-faq');
  overlayFaq.style.display = 'flex'; // Exibe o overlay
}); 

btnModalAtalhos.addEventListener('click', () => {
  const overlayAtalho = document.getElementById('overlay-atalhos');
  overlayAtalho.style.display = 'flex';
});

document.getElementById('overlay-disciplina').addEventListener('click', (evento) => {
    if (evento.target === document.getElementById('overlay-disciplina')) {
       fecharModalDisciplina();
    }
});

document.getElementById('overlay-faq').addEventListener('click', (evento) => {
    if (evento.target === document.getElementById('overlay-faq')) {
       fecharModalFaq();
    }
});

document.getElementById('overlay-atalhos').addEventListener('click', (evento) => {
  if (evento.target === document.getElementById('overlay-atalhos')) {
    fecharModalAtalhos();
  }
})


modalDisciplinas.focus();

document.addEventListener('keydown', (evento) => {
  if(evento.key === 'ArrowUp') {
    modalDisciplinas.scrollTop -= 50; // Rola para cima
    modalFaq.scrollTop -= 50; // Rola para cima
  } else if(evento.key === 'ArrowDown') {
    modalDisciplinas.scrollTop += 50; // Rola para baixo
    modalFaq.scrollTop += 50; // Rola para baixo
  } else if(evento.key === 'Escape') {
    fecharModalDisciplina();
    fecharModalFaq();
    fecharModalAtalhos();
  } 
})

botaoFecharModalDisciplinas.addEventListener('click', () => {
  fecharModalDisciplina();
})

botaoFecharModalFaq.addEventListener('click', () => {
  fecharModalFaq();
})

btnFecharModalAtalhos.addEventListener('click', () => {
  fecharModalAtalhos();
})

function fecharModalDisciplina() {
  document.getElementById('overlay-disciplina').style.display = 'none';
}

function fecharModalFaq() {
  document.getElementById('overlay-faq').style.display = 'none';
}

function fecharModalAtalhos() {
  document.getElementById('overlay-atalhos').style.display = 'none';
}
