import { getFAQ } from "./loadJson.js";

 let allFAQ = [];
 allFAQ = await getFAQ();

 allFAQ.forEach(item => {
    const faqContainer = document.getElementById('faq-items');

    const faqItemDiv = document.createElement('div');
    faqItemDiv.classList.add('faq-item');
    
    const faqPerguntaDiv = document.createElement('div');
    faqPerguntaDiv.classList.add('faq-pergunta');
    faqPerguntaDiv.textContent = item.pergunta;
    faqItemDiv.appendChild(faqPerguntaDiv);

    const faqRespostaDiv = document.createElement('div');
    faqRespostaDiv.classList.add('faq-resposta');
    faqRespostaDiv.textContent = item.resposta;
    faqItemDiv.appendChild(faqRespostaDiv);

    faqContainer.appendChild(faqItemDiv);

 })
 
 document.querySelectorAll('.faq-pergunta').forEach(item => {
            item.addEventListener('click', () => {
                console.log(`Pergunta clicada: ${item.textContent.trim()}`);
                const answer = item.nextElementSibling;
                if (answer.style.display === 'block') {
                    console.log('Ocultando resposta');
                    answer.style.display = 'none';
                } else {
                    console.log('Exibindo resposta');
                    answer.style.display = 'block';
                }
            });
        });