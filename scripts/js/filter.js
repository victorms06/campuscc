import { abrirCarrossel, fecharCarrossel } from "./carrossel.js";
import { abrirModalDescricao } from "./info.js";
import { removerSidebar } from "./sidebar.js";


export function mostrarMarcadores(listaDeLugares, marcadores, blocoFiltrado, map) {
    
    
    if (!Array.isArray(listaDeLugares)) {
        console.error('listaDeLugares não é uma array válida:', listaDeLugares);
        return;
    }

    if (!Array.isArray(marcadores)) {
        console.error('marcadores não é uma array válida:', marcadores);
        marcadores = [];
    }

    // Limpa os marcadores e o polígono existente
    if (blocoFiltrado) {
        map.eachLayer(layer => {
            if (layer instanceof L.Polygon) {
                map.removeLayer(layer);
            }
        });
    }

    marcadores.forEach(marcador => map.removeLayer(marcador));
    marcadores = [];

    // Adiciona novos marcadores
    listaDeLugares.forEach(place => {
        const icon = L.icon({
            iconUrl: `images/icons/${place.icon}.png`,
            iconSize: [23, 23],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const marcador = L.marker(place.coordinates, { icon }).addTo(map);
        marcadores.push(marcador);

        const popupContent = `
            <p class="text-popup"><strong>Local: </strong>${place.local}</p>
            <p class="text-popup"><strong>Categoria: </strong>${place.categoria}</p>
            <p class="text-popup"><strong>Bloco: </strong>${place.bloco}</p>
            <p class="text-popup"><strong>Andar: </strong>${place.andar}</p>
            <i id="btn-info" class="fas fa-info-circle"></i>
            <i id="btn-images" class="fas fa-images"></i>
        `;

        marcador.bindPopup(popupContent);

        marcador.on('popupopen', () => {
            const botaoAbrirCarrossel = document.getElementById("btn-images");
            const botaoAbrirDescricao = document.getElementById("btn-info");

            document.addEventListener('keydown', (evento) => {
                if(evento.ctrlKey && evento.key.toLowerCase() === 'c') {
                    evento.preventDefault();
                    abrirCarrossel(place.local, place.imagens);
                } else if(evento.ctrlKey && evento.key.toLowerCase() === 'i') {
                    evento.preventDefault();
                    abrirModalDescricao(place.local, place.descricao);
                } else if(evento.key === 'Escape') {
                    evento.preventDefault();
                    map.closePopup();
                }
                
            })

            if (botaoAbrirCarrossel) {
                botaoAbrirCarrossel.addEventListener('click', () => abrirCarrossel(place.local, place.imagens));
            }

            if (botaoAbrirDescricao) {
                botaoAbrirDescricao.addEventListener('click', () => abrirModalDescricao(place.local, place.descricao));
            }
        });
    });

    return marcadores;
}

export function mostrarBlocos(nomeBloco, coordenadas, map, blocoFiltrado, marcadores) {
    console.log(blocoFiltrado);
    if (blocoFiltrado) {
        map.eachLayer(layer => {
            if (layer instanceof L.Polygon) {
                map.removeLayer(layer);
            }
        });
    }
    // Remover os marcadores do mapa antes de adicionar novos
    marcadores.forEach(marcador => {
        marcador.remove(); // Usa o método `remove()` diretamente no marcador
    });

    // Limpar a lista de marcadores (não redefinir, só limpar)
    marcadores.length = 0;  // Limpa a lista, mas mantém a referência

    const coordenadasDeArea = [coordenadas];

    // Criar o novo polígono e adicioná-lo ao mapa
    blocoFiltrado = L.polygon(coordenadasDeArea, {
        color: 'blue',          // Cor da borda
        fillColor: 'lightblue', // Cor de preenchimento
        fillOpacity: 0.5        // Opacidade do preenchimento
    }).addTo(map);

    // Adicionar popup ao polígono
    blocoFiltrado.bindPopup(nomeBloco);
    removerSidebar();

    return blocoFiltrado;
}



