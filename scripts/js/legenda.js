const legenda = document.getElementById('legend');
const legendaBtn = document.getElementById('legendaBtn');
map.getContainer().appendChild(legenda);
map.getContainer().appendChild(legendaBtn);


legendaBtn.addEventListener('click', () => {
    legenda.classList.toggle('hidden'); // Alterna a visibilidade
    if (legenda.classList.contains('hidden')) {
        legendaBtn.textContent = 'Mostrar Legenda'; // Texto do botão
    } else {
        legendaBtn.style.display = 'none'; 
    }
});

document.addEventListener('click', (event) => {
    if (!legenda.contains(event.target) && event.target !== legendaBtn) {
        legenda.classList.add('hidden'); // Fecha a legenda
        legendaBtn.style.display = 'block'; 
    }
});