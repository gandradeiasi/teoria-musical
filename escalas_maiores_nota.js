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
        <div id="message">
        </div>
    `;

        var botoes_notas = document.querySelectorAll("#notas button");
        botoes_notas.forEach(function (botao) {
            botao.addEventListener('click', function () {
                var grau = document.querySelector('#input_grau').value;
                var nota_index = botao.value;
                var acertou = avaliaResposta(grau, nota_index);
                var escalas_maiores_save = obterEscalaMaioresSave();
                var numero_de_acertos = escalas_maiores_save.numero_de_acertos;
                if (acertou) {
                    if (numero_de_acertos < 7 * escalas_maiores_data.acertos_para_proxima_escala)
                        escalas_maiores_save.numero_de_acertos++;
                    salvaEscalaMaioresSave(escalas_maiores_save);
                    geraQuestao();
                    atualizaMensagem('Acertou!');
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

    function avaliaResposta(grau, grau_index) {
        return grau == escalas_maiores_data.mapa_indices_para_grau[grau_index];
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
        return localStorage.escalas_maiores_notas_save ?
            JSON.parse(localStorage.escalas_maiores_notas_save)
            : {
                numero_de_acertos: 0
            };
    }

    function salvaEscalaMaioresSave(json) {
        localStorage.escalas_maiores_notas_save = JSON.stringify(json);
    }

    function obterEscala(primeiro_grau_da_escala) {
        return escalas_maiores_data.escalas.find(x => x[0] == primeiro_grau_da_escala);
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

    var escalas_maiores_data = {
        escalas: [
            ["C", "D", "E", "F", "G", "A", "B"],
            ["D", "E", "F# | Gb", "G", "A", "B", "C# | Db"],
            ["E", "F# | Gb", "G# | Ab", "A", "B", "C# | Db", "D# | Eb"],
            ["F", "G", "A", "A# | Bb", "C", "D", "E"],
            ["G", "A", "B", "C", "D", "E", "F#"],
            ["A", "B", "C# | Db", "D", "E", "F# | Gb", "G# | Ab"],
            ["B", "C# | Db", "D# | Eb", "E", "F# | Gb", "G# | Ab", "A# | Bb"]
        ],
        graus: ['II', 'III', 'IV', 'V', 'VI', 'VII'],
        mapa_indices_para_grau: {
            1: 'II',
            2: 'III',
            3: 'IV',
            4: 'V',
            5: 'VI',
            6: 'VII'
        },
        acertos_para_proxima_escala: 6
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex > 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
})();