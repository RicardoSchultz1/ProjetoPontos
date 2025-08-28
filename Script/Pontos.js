document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do formulário
    const form = document.querySelector('.form-adicionar');
    const cnpjInput = document.getElementById('cnpj');
    const pontosInput = document.getElementById('pontos');

    // Função para gerar um código aleatório de 5 caracteres
    function gerarCodigoAleatorio() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';
        for (let i = 0; i < 5; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    }

    // Ouve o evento de envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede a página de recarregar

        // --- 1. Pega os dados do formulário ---
        const cnpj = cnpjInput.value.trim();
        const pontos = parseInt(pontosInput.value, 10);

        // Validação mínima para garantir que os campos não estão vazios
        if (!cnpj || isNaN(pontos) || pontos <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // --- 2. Gera um código aleatório ---
        const novoCodigo = gerarCodigoAleatorio();

        // Cria um novo objeto simples com as informações
        const novoRegistro = {
            cnpj: cnpj,
            pontos: pontos,
            codigo: novoCodigo,
            dataGeracao: new Date().toISOString(), // Adiciona data e hora da geração
            utilizado: false
        };

        // --- 3. Salva no localStorage separado ---
        // Pega o array existente de 'codigosGerados' ou cria um novo se não existir
        const codigosSalvos = JSON.parse(localStorage.getItem('codigosGerados')) || [];

        // Adiciona o novo registro ao array
        codigosSalvos.push(novoRegistro);

        // Salva o array atualizado de volta na chave 'codigosGerados'
        localStorage.setItem('codigosGerados', JSON.stringify(codigosSalvos));

        // Exibe o resultado para o usuário
        alert(`Código gerado com sucesso!\n\nCódigo: ${novoCodigo}`);
        
        form.reset();
    });
});