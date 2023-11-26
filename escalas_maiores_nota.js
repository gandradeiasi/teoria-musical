(function () {
    var escalas_maiores_nav_item = document.querySelector('#escalas_maiores_nota');

    escalas_maiores_nav_item.addEventListener('click', x => geraQuestao());

    function geraQuestao() {
        var main = document.querySelector('#main');
        main.innerHTML = `
        <label>Escala: <input class="disabled_input" id='input_escala' disabled type='text' value='${obterEscalaParaQuestao()}'/></label>
        <label>Nota: <input class="disabled_input" id='input_grau' disabled type='text' value='${sortearGrauDaEscala()}'/></label>
        <div id="notas">
            ${obterBotoesDeNotasSorteadas(window.escala)}
        </div>
        <div id="pontuacao">
            <p>Acertos seguidos: ${obterAcertosSeguidos()}</p>
            <p>Melhor sequência: ${obterMelhorSequencia()}</p>
        </div>
        <div id="message">
        </div>
    `;

        var botoes_notas = document.querySelectorAll("#notas button");
        botoes_notas.forEach(function (botao) {
            botao.addEventListener('click', function () {
                var grau = document.querySelector('#input_grau').value;
                var nota_index = botao.value;
                var acertou = avaliaResposta(grau, nota_index);
                atualizaSaveConformeResposta(acertou);
            })
        });
    }

    function avaliaResposta(grau, grau_index) {
        return grau == escalas_maiores_data.mapa_indices_para_grau[grau_index];
    }

    function sortearGrauDaEscala() {
        var graus = escalas_maiores_data.graus;
        var grau_sorteado = graus[parseInt(Math.random() * graus.length)];
        return grau_sorteado;
    }

    function obterBotoesDeNotasSorteadas(escala) {
        var opcoes = obterEscala(escala);
        var botoes = [];
        for (var i = 1; i < 7; i++) {
            botoes.push(`<button value=${i}>${opcoes[i]}</button>`)
        }
        var botoes_shuffled = shuffle(botoes);
        return botoes_shuffled.join('');
    }
})();


