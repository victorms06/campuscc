import { map } from "./mapa.js";

document.getElementById('second-overlay').addEventListener('click', (evento) => {
    if (evento.target === document.getElementById('second-overlay') || evento.target === document.getElementById('btnClosemodalDescricao')) {
        fecharModalDescricao();
    }
})

export function abrirModalDescricao(titulo, descricao) {
    document.getElementById("second-overlay").style.display = "flex"; 
    modalDescricao(titulo, descricao);
 }
 
function modalDescricao(titulo, descricao) {

     const modalDescricao = window.document.getElementsByClassName('box-content')[0]; 
     const tituloModal = window.document.getElementsByClassName('modal-title')[0];
     const textoDescricaoModal = window.document.getElementsByClassName('modal-body')[0];
 
     textoDescricaoModal.innerHTML = '';
 
     tituloModal.textContent = titulo;
 
     const p = document.createElement('p');
     p.textContent = descricao;
 
     textoDescricaoModal.appendChild(p);

     document.addEventListener('keydown', (evento) => {
        if(evento.key === 'Escape') {
            fecharModalDescricao();
        }
     })
 }
 
export function fecharModalDescricao() {
    document.getElementById('second-overlay').style.display = 'none';
    map.closePopup();
}