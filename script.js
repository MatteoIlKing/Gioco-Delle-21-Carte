const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const columnsContainer = document.getElementById('columns');
const message = document.getElementById('message');

let deck = [];
let selectedColumn = null;
let rounds = 0;

// Genera un mazzo di 21 carte
function generateDeck() {
    deck = [];
    for (let i = 1; i <= 21; i++) {
        deck.push(i);
    }
}

// Mostra le carte in 3 colonne
function displayColumns() {
    columnsContainer.innerHTML = '';
    const columns = [[], [], []];

    for (let i = 0; i < deck.length; i++) {
        columns[i % 3].push(deck[i]);
    }

    columns.forEach((column, index) => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');

        column.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.textContent = card;
            columnDiv.appendChild(cardDiv);
        });

        const selectBtn = document.createElement('button');
        selectBtn.classList.add('select-btn');
        selectBtn.textContent = 'Seleziona';
        selectBtn.addEventListener('click', () => selectColumn(index));
        columnDiv.appendChild(selectBtn);

        columnsContainer.appendChild(columnDiv);
    });
}

// Seleziona una colonna
function selectColumn(index) {
    selectedColumn = index;
    message.textContent = `Hai scelto la colonna ${index + 1}. Riorganizzo...`;

    setTimeout(() => {
        reorganizeDeck();
        rounds++;

        if (rounds === 3) {
            const chosenCard = deck[10]; // La carta scelta sarà sempre al centro del mazzo
            message.textContent = `La tua carta è ${chosenCard}!`;
            columnsContainer.innerHTML = '';
        } else {
            displayColumns();
            message.textContent = 'Scegli una colonna.';
        }
    }, 1000);
}

// Riorganizza le carte in base alla colonna selezionata
function reorganizeDeck() {
    const columns = [[], [], []];
    for (let i = 0; i < deck.length; i++) {
        columns[i % 3].push(deck[i]);
    }

    const newOrder = [
        ...columns[(selectedColumn + 1) % 3],
        ...columns[selectedColumn],
        ...columns[(selectedColumn + 2) % 3],
    ];

    deck = newOrder;
}

// Inizia il gioco
function startGame() {
    generateDeck();
    rounds = 0;
    displayColumns();
    message.textContent = 'Scegli una colonna.';
    startBtn.disabled = true;
    restartBtn.disabled = false;
}

// Riavvia il gioco
function restartGame() {
    selectedColumn = null;
    startGame();
}

// Eventi pulsanti
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
