import { map } from "./mapa.js";

const legenda = document.getElementById('legend');
const legendaBtn = document.getElementById('legendaBtn');
map.getContainer().appendChild(legenda);
map.getContainer().appendChild(legendaBtn);

document.addEventListener('keydown', (evento) => {
    if(evento.ctrlKey && evento.key === 'l') {
        evento.preventDefault();
        abrirEFecharLegenda();
    }
})

legendaBtn.addEventListener('click', () => {
    abrirEFecharLegenda();
});

document.addEventListener('click', (event) => {
    if (!legenda.contains(event.target) && event.target !== legendaBtn) {
        legenda.classList.add('hidden');
        legendaBtn.style.display = 'block'; 
        legendaBtn.textContent = 'Mostrar Legenda'; // Garante a atualização do texto
    }
});

function abrirEFecharLegenda() {
    legenda.classList.toggle('hidden');
    if (legenda.classList.contains('hidden')) {
        legendaBtn.style.display = 'block'; // Garantir que o botão reapareça ao fechar a legenda
        legendaBtn.textContent = 'Mostrar Legenda';
    } else {
        legendaBtn.style.display = 'none';
    }
}
