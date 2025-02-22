import { mostrarMarcadores } from "./filter.js";
import { removerSidebar } from "./sidebar.js";

export function pesquisarLugares(valorInput, todosLugares) {
    
    const lugaresEncontrados = todosLugares.filter(place => 
        place.local.toLowerCase().includes(valorInput) ||
        place.categoria.toLowerCase().includes(valorInput) ||
        place.bloco.toLowerCase().includes(valorInput)
    );
    
    return lugaresEncontrados;
};

export function pesquisarLugarPelaURL(todosLugares, marcadores, blocoFiltrado, map) {
    const parametrosURL = new URLSearchParams(window.location.search);
    const lugarParametro = parametrosURL.get('search');
    
    let algumPopupAberto = false;

    map.eachLayer(layer => {
        if (layer instanceof L.Popup && map.hasLayer(layer)) {
            algumPopupAberto = true;
        }
    });

    if (algumPopupAberto) {
        console.log("Existe um popup aberto!");
    } else {
        console.log("Nenhum popup aberto.");
    }


    if (lugarParametro) {
    
        const lugarPesquisado = lugarParametro.toLowerCase();

        // Pesquise o lugar correspondente
        const lugaresEncontrados = pesquisarLugares(lugarPesquisado, todosLugares);

        if (lugaresEncontrados.length === 0) {
            console.warn("O local especificado na URL não foi encontrado.");
        } else {

            // Mostra os marcadores no mapa
            marcadores = mostrarMarcadores(lugaresEncontrados, marcadores, blocoFiltrado, map);

            // Fecha a sidebar e abre os popups
            removerSidebar();
            marcadores.forEach(marcador => marcador.openPopup());
        }
    }

    return marcadores;
}