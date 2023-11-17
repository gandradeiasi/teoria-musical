(function () {
    var escalas_maiores_nav_item = document.querySelector('#escalas_maiores');

    escalas_maiores_nav_item.addEventListener('click', x => geraQuestao());

    function geraQuestao() {
        var main = document.querySelector('#main');
        main.innerHTML = `
        <label>Escala: <input class="disabled_input" id='input_escala' disabled type='text' value='${obterEscalaParaQuestao()}'/></label>
        <label>Nota: <input class="disabled_input" id='input_nota' disabled type='text' value='${sortearNotaDaEscala(window.escala)}'/></label>
        <div id="graus">
            ${obterBotoesDeGrausSorteados()}
        </div>
        <div id="message">
        </div>
    `;

        var botoes_graus = document.querySelectorAll("#graus button");
        botoes_graus.forEach(function (botao) {
            botao.addEventListener('click', function () {
                var escala = document.querySelector('#input_escala').value;
                var nota = document.querySelector('#input_nota').value;
                var grau_index = botao.value;
                var acertou = avaliaResposta(escala, nota, grau_index);
                var escalas_maiores_save = obterEscalaMaioresSave();
                var numero_de_acertos = escalas_maiores_save.numero_de_acertos;
                if (acertou) {
                    if (numero_de_acertos < 7 * escalas_maiores_data.acertos_para_proxima_escala)
                        escalas_maiores_save.numero_de_acertos++;
                    salvaEscalaMaioresSave(escalas_maiores_save);
                    clicaEmMenuItemAleatorio();
                } else {
                    escalas_maiores_save.numero_de_acertos = 0;
                    salvaEscalaMaioresSave(escalas_maiores_save);
                    atualizaMensagem('Errou!');
                }
            })
        });
    }

    function atualizaMensagem(mensagem) {
        var message_el = document.querySelector('#message');
        message_el.innerText = mensagem;
    }

    function avaliaResposta(escala, nota, grau_index) {
        var opcoes_de_nota = obterEscala(escala);
        var nota_selecionada = opcoes_de_nota[grau_index];
        return nota == nota_selecionada;
    }

    function obterEscalaParaQuestao() {
        var escalas_maiores_save = obterEscalaMaioresSave();
        var numero_de_acertos = escalas_maiores_save.numero_de_acertos;
        var indice_escala = parseInt(Math.random() * (numero_de_acertos / escalas_maiores_data.acertos_para_proxima_escala));
        var escala = escalas_maiores_data.escalas[indice_escala][0];
        window.escala = escala;
        return escala;
    }

    function obterEscalaMaioresSave() {
        return localStorage.escalas_maiores_save ?
            JSON.parse(localStorage.escalas_maiores_save)
            : {
                numero_de_acertos: 0
            };
    }

    function salvaEscalaMaioresSave(json) {
        localStorage.escalas_maiores_save = JSON.stringify(json);
    }

    function obterEscala(primeiro_grau_da_escala) {
        return escalas_maiores_data.escalas.find(x => x[0] == primeiro_grau_da_escala);
    }

    function sortearNotaDaEscala(primeiro_grau_da_escala) {
        var escala = obterEscala(primeiro_grau_da_escala);
        var nota_sorteada = escala[parseInt(Math.random() * 6) + 1];
        return nota_sorteada;
    }

    function obterBotoesDeGrausSorteados() {
        var botoes = [];
        for (var i = 1; i < 7; i++) {
            botoes.push(`<button value=${i}>${escalas_maiores_data.mapa_indices_para_grau[i]}</button>`)
        }
        var botoes_shuffled = shuffle(botoes);
        return botoes_shuffled.join('');
    }
})();