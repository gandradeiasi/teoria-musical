var escalas_maiores_data = {
    escalas: [
        ["C", "D", "E", "F", "G", "A", "B"],
        ["D", "E", "F#", "G", "A", "B", "C#"],
        ["E", "F#", "G#", "A", "B", "C#", "D#"],
        ["F", "G", "A", "Bb", "C", "D", "E"],
        ["G", "A", "B", "C", "D", "E", "F#"],
        ["A", "B", "C#", "D", "E", "F#", "G#"],
        ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
        ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
        ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        ["Bb", "C", "D", "Eb", "F", "G", "A"]
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

function atualizaSaveConformeResposta(acertou) {
    var escalas_maiores_save = obterEscalaMaioresSave();
    if (acertou) {
        escalas_maiores_save.numero_de_acertos++;
        if (escalas_maiores_save.numero_de_acertos > escalas_maiores_save.acertos_maximo)
            escalas_maiores_save.acertos_maximo = escalas_maiores_save.numero_de_acertos;
        salvaEscalaMaioresSave(escalas_maiores_save);
        clicaEmMenuItemAleatorio();
    } else {
        escalas_maiores_save.numero_de_acertos = 0;
        salvaEscalaMaioresSave(escalas_maiores_save);
        atualizaMensagem('Errou!');
    }
}

function obterAcertosSeguidos() {
    return obterEscalaMaioresSave().numero_de_acertos;
}
        
function obterMelhorSequencia() {
    return obterEscalaMaioresSave().acertos_maximo;
}

function obterEscala(primeiro_grau_da_escala) {
    return escalas_maiores_data.escalas.find(x => x[0] == primeiro_grau_da_escala);
}

function atualizaMensagem(mensagem) {
    var message_el = document.querySelector('#message');
    message_el.innerText = mensagem;
}

function obterEscalaParaQuestao() {
    var escalas_maiores_save = obterEscalaMaioresSave();
    var numero_de_acertos = escalas_maiores_save.numero_de_acertos;
    var indice_escala = parseInt(Math.random() * (numero_de_acertos / escalas_maiores_data.acertos_para_proxima_escala));
    if (indice_escala > escalas_maiores_data.escalas.length - 1) 
        indice_escala = escalas_maiores_data.escalas.length - 1;
    var escala = escalas_maiores_data.escalas[indice_escala][0];
    window.escala = escala;
    return escala;
}

function clicaEmMenuItemAleatorio() {
    var menu_items = document.querySelectorAll('nav li');
    var menu_item_sorteado = menu_items[parseInt(Math.random() * menu_items.length)];
    menu_item_sorteado.click();
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

function obterEscalaMaioresSave() {
    var save = localStorage.escalas_maiores_save ?
        JSON.parse(localStorage.escalas_maiores_save)
        : {
            numero_de_acertos: 0,
            acertos_maximo: 0
        };
    //caso a pessoa tenha usado o site antes de ter a opçaõ de acertos máximo
    save.acertos_maximo = save.acertos_maximo || save.numero_de_acertos;
    return save;
}

function salvaEscalaMaioresSave(json) {
    localStorage.escalas_maiores_save = JSON.stringify(json);
}