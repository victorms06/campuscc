export let map = L.map('map').setView([-24.987859731678746, -53.44917952674408], 18);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // Permite níveis de zoom mais altos
    minZoom: 14,
    attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);
