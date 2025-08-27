document.addEventListener('DOMContentLoaded', () => {
    
    const listaContainer = document.getElementById('Lista');
    const lojasSalvas = JSON.parse(localStorage.getItem('lojas'));

    // Verifica se não há lojas salvas e exibe a mensagem de lista vazia
    if (!lojasSalvas || lojasSalvas.length === 0) {
        listaContainer.innerHTML = '<p class="mensagem-vazia">Nenhuma loja cadastrada ainda.</p>';
        return; // Encerra a execução da função aqui
    }

    // 1. Busca o nosso "molde" HTML primeiro
    fetch('Componentes/ListaLojas.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar o template da loja.');
            }
            return response.text(); // Converte o arquivo em uma string de texto
        })
        .then(template => {
            // 2. Agora que temos o molde (template), vamos percorrer as lojas salvas
            
            // Limpa o container para garantir que não haja conteúdo duplicado
            listaContainer.innerHTML = ''; 

            lojasSalvas.forEach(loja => {
                // 3. Para cada loja, fazemos uma cópia do molde e substituímos os marcadores
                let itemHtml = template
                    .replaceAll('{{IMAGEM_SRC}}', loja.imagem || 'https://via.placeholder.com/150')
                    .replaceAll('{{NOME_LOJA}}', loja.nome)
                    .replaceAll('{{PONTOS}}', loja.pontos || 0); // Usando 0 como placeholder para os pontos

                // 4. Inserimos o HTML preenchido no container. 
                // Usar 'insertAdjacentHTML' é um pouco mais performático que 'innerHTML +='
                listaContainer.insertAdjacentHTML('beforeend', itemHtml);
            });
        })
        .catch(error => {
            console.error('Erro ao renderizar a lista de lojas:', error);
            listaContainer.innerHTML = '<p class="mensagem-vazia">Ocorreu um erro ao carregar as lojas.</p>';
        });
});