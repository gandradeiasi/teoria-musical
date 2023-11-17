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