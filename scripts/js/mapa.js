const map = L.map('map').setView([-24.987859731678746, -53.44917952674408], 19);
const carouselInner = window.document.getElementsByClassName('carousel-inner')[0];
const modalTitle = window.document.getElementsByClassName('modal-title')[0];
const modalBody = window.document.getElementsByClassName('modal-body')[0];

let allPlaces = [];
let allBlocos = [];
let markers = [];
let blocos = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


fetch('scripts/json/places.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.statusText);
        }
        return response.json();
    })
    .then(places => {
        allPlaces = places
        mostrarMarcadores(allPlaces);
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

    fetch('scripts/json/blocos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.statusText);
        }
        return response.json();
    })
    .then(blocos => {
       allBlocos = blocos;
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

function carouselImages(imagens) {
    
    
    carouselInner.innerHTML = '';

    
    if (imagens.length > 0) {
        const div0 = document.createElement('div');
        div0.classList.add('carousel-item', 'active');
        

        const image0 = document.createElement('img');
        image0.classList.add('d-flex');
        image0.classList.add('imagem-carrossel');
        image0.src = 'images/' + imagens[0]; 
        image0.alt = imagens[0];


        div0.appendChild(image0);
        carouselInner.appendChild(div0);

        // Criação dos outros itens do carrossel
        for (let i = 1; i < imagens.length; i++) {
            const div = document.createElement('div');

            div.classList.add('carousel-item'); 
            const image = document.createElement('img');
            image.classList.add('imagem-carrossel'); 
            image.src = 'images/' + imagens[i];  
            image.alt = imagens[i];

            image.onerror = () => console.error('Erro ao carregar imagem:', imagens[i]);

            div.appendChild(image);
            carouselInner.appendChild(div);
        }
    } else {
        console.error("Nenhuma imagem foi recebida para esse local.");
    }
}

function mostrarMarcadores(places) {

     if (poligonoFiltrado) {
        map.removeLayer(poligonoFiltrado);
    }

    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    

    

    places.forEach(place => {

        const icon = L.icon({
            iconUrl: `images/icons/${place.icon}.png`,
            iconSize: [23, 23],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const marker = L.marker(place.coordinates, {icon}).addTo(map);
        markers.push(marker);
        
        const popupContent = `
            <p><strong>Local: </strong>${place.local}</p>
            <p><strong>Categoria: </strong>${place.categoria}</p>
            <p><strong>Bloco: </strong>${place.bloco}</p>
            <p><strong>Andar: </strong>${place.andar}</p>
            <i class="fas fa-info-circle" onclick='abrirModalInfo(${JSON.stringify(place.local)}, ${JSON.stringify(place.descricao)})'></i>
            <i class="fas fa-images" onclick='abrirCarrossel(${JSON.stringify(place.imagens)})' ></i>
        `;


        marker.bindPopup(popupContent);
        
    });
}

let poligonoFiltrado = null;

function mostrarBlocos(nomeBloco, coordenadas) {

    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const polygonCoordinates = [coordenadas];

    // Remover o polígono anterior, se houver
    if (poligonoFiltrado) {
        map.removeLayer(poligonoFiltrado);
    }

    // Criar o novo polígono e adicioná-lo ao mapa
    poligonoFiltrado = L.polygon(polygonCoordinates, {
        color: 'blue',          // Cor da borda
        fillColor: 'lightblue', // Cor de preenchimento
        fillOpacity: 0.5        // Opacidade do preenchimento
    }).addTo(map);

    // Adicionar popup ao polígono
    poligonoFiltrado.bindPopup(nomeBloco);

    // Ajustar o zoom para o polígono
    map.fitBounds(poligonoFiltrado.getBounds());
}

document.querySelectorAll('.blocos').forEach(blocos => {
    blocos.addEventListener('click', e => {
        

        const filtro = e.target.getAttribute('data-bloco');

       
        const blocoFiltrado = allBlocos.filter(bloco => bloco.nome === filtro)[0];


        mostrarBlocos(blocoFiltrado.nome, blocoFiltrado.coordenadasBloco);

        markers.forEach(marker => marker.openPopup())
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('main-content').classList.remove('with-sidebar');
    })
})

document.querySelectorAll('.categorias').forEach(categoria => {
    categoria.addEventListener('click', e => {
        

        const filtro = e.target.getAttribute('data-category');

        if(filtro === 'all') {
            mostrarMarcadores(allPlaces);
        } else {
            // Filtrar os lugares
            const lugaresFiltrados = allPlaces.filter(place => place.categoria === filtro);

            // Mostrar os marcadores
            mostrarMarcadores(lugaresFiltrados);
        }

        markers.forEach(marker => marker.openPopup())
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('main-content').classList.remove('with-sidebar');
    })
})

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function filterPlaces(searchTerm) {
    const filteredPlaces = allPlaces.filter(place => 
        place.local.toLowerCase().includes(searchTerm) ||
        place.categoria.toLowerCase().includes(searchTerm) ||
        place.bloco.toLowerCase().includes(searchTerm)
    );

    if(filteredPlaces == 0) {
        window.alert("O local que você deseja nao foi encontrado no mapa");
    } else {
        mostrarMarcadores(filteredPlaces); // Atualiza os marcadores no mapa
    }

    markers.forEach(marker => marker.openPopup())
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('main-content').classList.remove('with-sidebar');
};

searchButton.addEventListener('click', event => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    const searchTerm = searchInput.value.toLowerCase(); // Pega o valor do input de pesquisa
    filterPlaces(searchTerm); // Filtra e exibe os marcadores
});

function abrirModalInfo(titulo, descricao) {
   document.getElementById("second-overlay").style.display = "flex"; 
   modalInfo(titulo, descricao);
}

function modalInfo(titulo, descricao) {

    modalBody.innerHTML = '';

    modalTitle.textContent = titulo;

    const p = document.createElement('p');
    p.textContent = descricao;

    modalBody.appendChild(p);
}



function abrirCarrossel(imagens) {
    if (imagens && imagens.length > 0) {
        document.getElementById("overlay").style.display = "flex"; 
        carouselImages(imagens);  
    } else {
        console.error("Sem imagens do local");
    }
}

function fechar(event) {
    if (event.target === document.getElementById('overlay')) {
        document.getElementById('overlay').style.display = 'none';
    }
    if (event.target === document.getElementById('second-overlay') || event.target === document.getElementById('closeModalInfo') || event.target === document.getElementById('btnCloseModalInfo')) {
        document.getElementById('second-overlay').style.display = 'none';
    }
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.style.display = 'block';

    // Filtra os lugares enquanto digita
    const suggestions = allPlaces.filter(place =>
        place.local.toLowerCase().includes(searchTerm) ||
        place.categoria.toLowerCase().includes(searchTerm) ||
        place.bloco.toLowerCase().includes(searchTerm)
    );

    suggestionsBox.innerHTML = ''; // Limpa as sugestões anteriores


    if (searchTerm && suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.textContent = suggestion.local;
            item.classList.add('suggestion-item');

            // Clique na sugestão filtra os lugares e destaca no mapa
            item.addEventListener('click', () => {
                filterPlaces(suggestion.local.toLowerCase());
                searchInput.value = suggestion.local; // Define no campo de entrada
                suggestionsBox.innerHTML = ''; // Limpa a caixa de sugestões
                suggestionsBox.style.display = 'none';
            });

            suggestionsBox.appendChild(item);
        });
    } else {
        suggestionsBox.innerHTML = 'Nenhum resultado encontrado';
    }
});

// Ocultar a caixa de sugestões ao perder o foco
searchInput.addEventListener('blur', () => {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.style.display = 'none';
});

// Prevenir o fechamento ao clicar dentro da caixa de sugestões
const suggestionsBox = document.getElementById('suggestions');
suggestionsBox.addEventListener('mousedown', (event) => {
    event.preventDefault(); // Previne o blur do campo ao clicar nas sugestões
});