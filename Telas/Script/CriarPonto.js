document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona os elementos do formulário
    const form = document.querySelector('.form-adicionar');
    const cnpjInput = document.getElementById('cnpj');
    const pontosInput = document.getElementById('pontos');

    // Função para gerar um código aleatório de 5 caracteres
    function gerarCodigoAleatorio() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';
        for (let i = 0; i < 5; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[indiceAleatorio];
        }
        return codigo;
    }

    // 2. Adiciona um ouvinte para o evento de submit do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // 3. Pega os valores dos inputs
        const cnpj = cnpjInput.value.trim();
        const pontos = parseInt(pontosInput.value, 10);

        // Validação simples
        if (!cnpj || isNaN(pontos) || pontos <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // 4. Gera o código aleatório
        const novoCodigo = gerarCodigoAleatorio();

        // 5. Cria um objeto com as informações
        const novoRegistro = {
            cnpj: cnpj,
            pontos: pontos,
            codigo: novoCodigo,
            utilizado: false // Adicionamos um status para saber se o código já foi usado
        };

        // 6. Busca o array de códigos já existente no localStorage
        const codigosSalvos = JSON.parse(localStorage.getItem('codigosGerados')) || [];

        // 7. Adiciona o novo registro ao array
        codigosSalvos.push(novoRegistro);

        // 8. Salva o array atualizado de volta no localStorage
        localStorage.setItem('codigosGerados', JSON.stringify(codigosSalvos));

        // 9. Feedback para o usuário e limpeza do formulário
        alert(`Código gerado com sucesso!\n\nCódigo: ${novoCodigo}\nPontos: ${pontos}`);
        
        form.reset();
    });
});