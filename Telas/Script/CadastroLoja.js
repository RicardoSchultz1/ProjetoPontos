// Aguarda o DOM (a estrutura da página) ser completamente carregado para executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona o formulário e os campos de input pelo ID.
    const form = document.querySelector('main.form-container form');
    const nomeInput = document.getElementById('nome');
    const cnpjInput = document.getElementById('cnpj');
    const enderecoInput = document.getElementById('endereco');
    const imagemInput = document.getElementById('imagem');

    // 2. Adiciona um "ouvinte" para o evento de 'submit' do formulário.
    form.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário, que é recarregar a página.
        event.preventDefault();

        // 3. Pega o arquivo de imagem selecionado pelo usuário.
        const file = imagemInput.files[0];

        if (file) {
            // Se um arquivo foi selecionado, usa o FileReader para convertê-lo.
            const reader = new FileReader();

            // A função onload é chamada quando a leitura do arquivo termina.
            reader.onload = (e) => {
                // O resultado é uma string no formato Base64, que pode ser salva como texto.
                const imagemBase64 = e.target.result;
                
                // Chama a função para salvar os dados, passando a imagem convertida.
                salvarDadosDaLoja(imagemBase64);
            };

            // Inicia a leitura do arquivo de imagem.
            reader.readAsDataURL(file);
        } else {
            // Se nenhuma imagem foi selecionada, salva os dados sem a imagem.
            salvarDadosDaLoja(null);
        }
    });

    function salvarDadosDaLoja(imagemBase64) {
        // 4. Cria um objeto com os dados da nova loja.
        const novaLoja = {
            nome: nomeInput.value,
            cnpj: cnpjInput.value,
            endereco: enderecoInput.value,
            pontos: "",
            imagem: imagemBase64 // A imagem já está em formato de texto (Base64) ou é nula.
        };

        // 5. Busca o array de lojas já existente no localStorage.
        // JSON.parse() converte a string do localStorage de volta para um array/objeto.
        // Se não houver nada ('null'), ele cria um array vazio [].
        const lojasSalvas = JSON.parse(localStorage.getItem('lojas')) || [];

        // 6. Adiciona a nova loja ao final do array.
        lojasSalvas.push(novaLoja);

        // 7. Salva o array atualizado de volta no localStorage.
        // JSON.stringify() converte o array de objetos em uma string, que é como o localStorage armazena dados.
        localStorage.setItem('lojas', JSON.stringify(lojasSalvas));

        // 8. Feedback para o usuário e limpeza do formulário.
        alert('Loja salva com sucesso!');
        form.reset(); // Limpa todos os campos do formulário.
    }
});