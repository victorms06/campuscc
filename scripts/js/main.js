import { getPlaces, getBlocos } from "./loadJson.js";
import { mostrarBlocos, mostrarMarcadores } from "./filter.js";
import { pesquisarLugares, pesquisarLugarPelaURL } from "./search.js";
import { removerSidebar } from "./sidebar.js";
import { map } from "./mapa.js";

const inicio = document.getElementById('overlay-inicio');

window.onload = function() {
    if (inicio) {
        console.log(inicio);
        inicio.style.display = 'flex';

        inicio.addEventListener('click', (evento) => {
            if (evento.target === inicio) {
                inicio.style.display = 'none';
            }
        });
    }
};


const btnInicio = document.getElementById('btn-inicio');
if (btnInicio) {
    btnInicio.addEventListener('click', () => inicio.style.display = 'none');
}


window.onload = function() {
    if (inicio) {
        console.log(inicio);
        inicio.style.display = 'flex';

        inicio.addEventListener('click', (evento) => {
            if (evento.target === inicio) {
                inicio.style.display = 'none';
            }
        });
    }
}
 
const inputPesquisa = document.getElementById('search-input');
const botaoPesquisa = document.getElementById('search-button');

let marcadores = []
let blocos = [];
let blocoFiltrado = null;

let todosLugares = [];
todosLugares = await getPlaces();
marcadores = mostrarMarcadores(todosLugares, marcadores, blocoFiltrado, map)
marcadores = pesquisarLugarPelaURL(todosLugares, marcadores, blocoFiltrado, map);

let todosBlocos = [];
todosBlocos = await getBlocos();


//Chamada de função para quando for filtrado os blocos, adicionando um ouvinte para o evento click nos botões que são respectivos aos blocos
document.querySelectorAll('.blocos').forEach(blocos => {
    blocos.addEventListener('click', evento => {
        
        const filtro = evento.target.getAttribute('data-bloco');
        blocoFiltrado = todosBlocos.find(bloco => bloco.nome === filtro); // Use find() ao invés de filter()[0]

        if (blocoFiltrado) {
            blocoFiltrado = mostrarBlocos(blocoFiltrado.nome, blocoFiltrado.coordenadasBloco, map, blocoFiltrado, marcadores);
            blocoFiltrado.openPopup();
        }
    })
});


//Chamada de função para quando for filtrado as categorias, adicionando um ouvinte para o evento click nos botões que são respectivos as categorias
document.querySelectorAll('.categorias').forEach(categoria => {
    categoria.addEventListener('click', evento => {
        
        const filtro = evento.target.getAttribute('data-category'); // Pega todos os elementos que possuem o atributo 'data-category'
        let lugaresFiltrados;
        if(filtro === 'all') {
            marcadores = mostrarMarcadores(todosLugares, marcadores, blocoFiltrado, map);
        } else {
            // Filtrar os lugares
            lugaresFiltrados = todosLugares.filter(place => place.categoria === filtro);

            // Mostrar os marcadores
            marcadores = mostrarMarcadores(lugaresFiltrados, marcadores, blocoFiltrado, map);
        }

        removerSidebar();
    })
})

//Chamada de função para quando buscamos algum lugar, adicionando um ouvinte para o evento click no formulario de pesquisa
botaoPesquisa.addEventListener('click', evento => {
    evento.preventDefault(); // Previne o comportamento padrão de recarregar a página
    const valorInput = inputPesquisa.value.toLowerCase(); // Pega o valor do input de pesquisa

    const lugaresEncontrados = pesquisarLugares(valorInput, todosLugares)
    

    if(lugaresEncontrados.length == 0) {
        window.alert("O local que você deseja nao foi encontrado no mapa");
        marcadores = mostrarMarcadores(todosLugares, marcadores, blocoFiltrado, map);
    } else {
        // Atualiza a URL com o lugar pesquisado
        const novoUrl = new URL(window.location.href);
        novoUrl.searchParams.set('search', valorInput);
        window.history.pushState({}, '', novoUrl);

        marcadores = mostrarMarcadores(lugaresEncontrados, marcadores, blocoFiltrado, map); // Atualiza os marcadores no mapa
    }
    removerSidebar();
    marcadores.forEach(marcador => marcador.openPopup());
});



