document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona o formulário e os campos de input
    // Nota: A classe do seu form está como "form-codigo", vou usá-la, mas "form-produto" seria mais semântico.
    const form = document.querySelector('.form-codigo');
    const cnpjInput = document.getElementById('cnpj');
    const nomeInput = document.getElementById('nome');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');
    const descricaoInput = document.getElementById('descricao');
    const fotoInput = document.getElementById('foto');

    // 2. Adiciona um "ouvinte" para o evento de 'submit' do formulário
    form.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário, que é recarregar a página
        event.preventDefault();

        // 3. Pega o arquivo de imagem selecionado pelo usuário
        const file = fotoInput.files[0];

        // Se uma imagem foi selecionada, converte para Base64. Senão, continua sem ela.
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const fotoBase64 = e.target.result;
                // Chama a função principal de salvar, passando a imagem convertida
                salvarProduto(fotoBase64);
            };

            reader.readAsDataURL(file); // Inicia a leitura do arquivo
        } else {
            // Se nenhuma imagem foi selecionada, chama a função passando null
            salvarProduto(null);
        }
    });

    function salvarProduto(fotoBase64) {
        // 4. Cria um objeto com os dados do novo produto
        const novoProduto = {
            cnpjAssociado: cnpjInput.value.trim(),
            nome: nomeInput.value.trim(),
            valor: parseFloat(valorInput.value),
            quantidade: parseInt(quantidadeInput.value, 10),
            descricao: descricaoInput.value.trim(),
            foto: fotoBase64,
            id: Date.now() // Adiciona um ID único baseado no tempo atual
        };

        // 5. Busca o array de produtos já existente no localStorage (usando a nova chave 'produtos')
        const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];

        // 6. Adiciona o novo produto ao final do array
        produtosSalvos.push(novoProduto);

        // 7. Salva o array atualizado de volta no localStorage na chave 'produtos'
        localStorage.setItem('produtos', JSON.stringify(produtosSalvos));

        // 8. Feedback para o usuário e limpeza do formulário
        alert('Produto cadastrado com sucesso!');
        form.reset();
    }
});