document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona os elementos do formulário
    const form = document.querySelector('.form-codigo');
    const codigoInput = document.getElementById('codigo');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // 2. Pega o código do input, remove espaços e converte para maiúsculas
        const codigoParaValidar = codigoInput.value.trim().toUpperCase();

        if (!codigoParaValidar) {
            alert("Por favor, digite um código.");
            return;
        }

        // 3. Carrega ambos os arrays do localStorage
        const codigosSalvos = JSON.parse(localStorage.getItem('codigosGerados')) || [];
        const lojasSalvas = JSON.parse(localStorage.getItem('lojas')) || [];
        
        // 4. Busca o registro do código no array 'codigosGerados'
        const registroDoCodigo = codigosSalvos.find(item => item.codigo === codigoParaValidar);

        // 5. Validações do código
        if (!registroDoCodigo) {
            alert("Código inválido ou não encontrado.");
            form.reset();
            return;
        }

        if (registroDoCodigo.utilizado) {
            alert("Este código já foi utilizado.");
            form.reset();
            return;
        }

        // 6. Se o código é válido, encontra a loja correspondente
        const lojaParaReceberPontos = lojasSalvas.find(loja => loja.cnpj === registroDoCodigo.cnpj);

        if (!lojaParaReceberPontos) {
            alert("Erro crítico: A loja associada a este código não foi encontrada no sistema.");
            return;
        }

        // 7. Adiciona os pontos à loja
        lojaParaReceberPontos.pontos = (lojaParaReceberPontos.pontos || 0) + registroDoCodigo.pontos;
        
        // 8. Marca o código como utilizado
        registroDoCodigo.utilizado = true;

        // 9. Salva AMBOS os arrays atualizados de volta no localStorage
        localStorage.setItem('lojas', JSON.stringify(lojasSalvas));
        localStorage.setItem('codigosGerados', JSON.stringify(codigosSalvos));

        // 10. Exibe mensagem de sucesso
        alert(`Sucesso! ${registroDoCodigo.pontos} pontos foram adicionados à loja "${lojaParaReceberPontos.nome}".`);
        form.reset();
    });
});