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
        <div id="pontuacao">
            <p>Acertos seguidos: ${obterAcertosSeguidos()}</p>
            <p>Melhor sequência: ${obterMelhorSequencia()}</p>
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
                atualizaSaveConformeResposta(acertou);
            })
        });
    }

    function avaliaResposta(escala, nota, grau_index) {
        var opcoes_de_nota = obterEscala(escala);
        var nota_selecionada = opcoes_de_nota[grau_index];
        return nota == nota_selecionada;
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