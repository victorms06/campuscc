async function fetchJson(arquivo) {
    try {
        const resposta = await fetch(arquivo);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar o arquivo: " + resposta.statusText);
        }

        // Chamar o método json() para obter os dados
        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao processar o arquivo JSON:", erro);
        return null;
    }
}

async function getPlaces() {
    return await fetchJson('scripts/json/places.json');
}

async function getBlocos() {
    return await fetchJson('scripts/json/blocos.json');
}

async function getFAQ() {
    return await fetchJson('scripts/json/faq.json');
}

export { getPlaces, getBlocos, getFAQ };
