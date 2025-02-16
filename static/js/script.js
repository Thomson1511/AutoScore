let selectedPlayers = null;
let currentPlayer = 1; // Jelenlegi játékos
let currentThrow = 0; // Jelenlegi dobások száma
let scores = {}; // Játékosok pontszámai

// Kezdeti pontszám beállítása
const startingScore = 501;

function selectPlayers(players) {
    selectedPlayers = players;
    scores = {};  // Játékosok pontszámainak resetelése

    // Elrejtjük a választási lehetőséget
    document.getElementById("players-selection").style.display = "none";

    // Megjelenítjük a játékosokat és kezdőpontjaikat
    let playersDisplay = document.getElementById("players-display");
    playersDisplay.style.display = "block";

    // Töröljük a korábbi játékosokat
    playersDisplay.innerHTML = "";

    // Hozzáadjuk a játékosokat
    for (let i = 1; i <= selectedPlayers; i++) {
        scores[i] = startingScore;  // Minden játékos 501-tel kezd
        let playerDiv = document.createElement("div");
        playerDiv.id = `player-${i}`;
        playerDiv.innerHTML = `Player ${i}: ${scores[i]}`;
        playersDisplay.appendChild(playerDiv);
    }

    // Hozzáadjuk a "Player 1 to throw first!" szöveget és a gombokat
    let firstPlayerText = document.createElement("p");
    firstPlayerText.innerHTML = `Player 1 to throw first!`;
    playersDisplay.appendChild(firstPlayerText);

    // Gombok a dobás típusának kiválasztására
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    const throwTypes = ['single', 'double', 'treble', '25', '50', 'none'];
    throwTypes.forEach(type => {
        let button = document.createElement("button");
        button.innerText = type.charAt(0).toUpperCase() + type.slice(1);
        button.onclick = function() {
            selectThrowType(type);
        };
        buttonContainer.appendChild(button);
    });

    playersDisplay.appendChild(buttonContainer);
}

function selectThrowType(type) {
    let buttonContainer = document.getElementById("numbers-selection");
    buttonContainer.style.display = "block"; // Megjelenítjük a számokat 1-20-ig

    // Elrejtjük a dobás típusú gombokat, hogy ne válasszanak másik típust
    let throwButtons = document.querySelectorAll(".button-container button");
    throwButtons.forEach(button => button.disabled = true);

    // Ha single, double, vagy treble van kiválasztva, akkor megjelenítjük a számokat
    if (type === 'single' || type === 'double' || type === 'treble') {
        let numbersContainer = document.getElementById("numbers");
        numbersContainer.innerHTML = ''; // Töröljük a korábbi számokat

        for (let i = 1; i <= 20; i++) {
            let numberButton = document.createElement("button");
            numberButton.innerText = i;
            numberButton.onclick = function() {
                handleNumberSelection(i, type);
            };
            numbersContainer.appendChild(numberButton);
        }
    } else {
        // Ha 25, 50 vagy none választás van, azonnal levonjuk az összeget és váltunk a következő játékosra
        handleSpecialThrow(type);
    }
}

function handleNumberSelection(number, type) {
    let scoreDeduction = 0;

    // A dobás típusától függően levonjuk a megfelelő pontot
    switch(type) {
        case 'single':
            scoreDeduction = number;
            break;
        case 'double':
            scoreDeduction = number * 2;
            break;
        case 'treble':
            scoreDeduction = number * 3;
            break;
        case '25':
            scoreDeduction = 25;
            break;
        case '50':
            scoreDeduction = 50;
            break;
        case 'none':
            scoreDeduction = 0;
            break;
    }

    // Levonjuk a kiválasztott dobás értékét az aktuális játékos pontszámából
    scores[currentPlayer] -= scoreDeduction;
    updateScoreDisplay();

    // Növeljük a dobások számát
    currentThrow++;

    // Ha 3 dobás után vált a játékos
    if (currentThrow >= 3) {
        currentThrow = 0;  // Resetáljuk a dobások számát
        currentPlayer++;    // Váltunk a következő játékosra

        // Ha elértük az utolsó játékost, kezdjük újra az első játékossal
        if (currentPlayer > selectedPlayers) {
            currentPlayer = 1;
        }

        // Frissítjük, hogy ki dob most
        document.getElementById("player-turn").innerHTML = `Player ${currentPlayer} to throw first!`;

        // Elrejtjük a számokat és újra elérhetővé tesszük a dobás típusokat
        document.getElementById("numbers-selection").style.display = "none";
        let throwButtons = document.querySelectorAll(".button-container button");
        throwButtons.forEach(button => button.disabled = false);
    }

    // Ha vége van a dobásnak, újra választhat a dobás típusa
    resetThrowOptions();
}

function handleSpecialThrow(type) {
    let scoreDeduction = 0;

    // Levonjuk a kiválasztott dobás értékét az aktuális játékos pontszámából
    switch(type) {
        case '25':
            scoreDeduction = 25;
            break;
        case '50':
            scoreDeduction = 50;
            break;
        case 'none':
            scoreDeduction = 0;
            break;
    }

    scores[currentPlayer] -= scoreDeduction;
    updateScoreDisplay();

    // Növeljük a dobások számát
    currentThrow++;

    // Ha 3 dobás után vált a játékos
    if (currentThrow >= 3) {
        currentThrow = 0;  // Resetáljuk a dobások számát
        currentPlayer++;    // Váltunk a következő játékosra

        // Ha elértük az utolsó játékost, kezdjük újra az első játékossal
        if (currentPlayer > selectedPlayers) {
            currentPlayer = 1;
        }

        // Frissítjük, hogy ki dob most
        document.getElementById("player-turn").innerHTML = `Player ${currentPlayer} to throw first!`;

        // Elrejtjük a számokat és újra elérhetővé tesszük a dobás típusokat
        document.getElementById("numbers-selection").style.display = "none";
        let throwButtons = document.querySelectorAll(".button-container button");
        throwButtons.forEach(button => button.disabled = false);
    }

    // Ha vége van a dobásnak, újra választhat a dobás típusa
    resetThrowOptions();
}

function resetThrowOptions() {
    // Elrejtjük az 1-20 számokat
    document.getElementById("numbers-selection").style.display = "none";

    // Újra engedjük a dobás típusának választását
    let throwButtons = document.querySelectorAll(".button-container button");
    throwButtons.forEach(button => button.disabled = false);
}

function updateScoreDisplay() {
    for (let i = 1; i <= selectedPlayers; i++) {
        document.getElementById(`player-${i}`).innerHTML = `Player ${i}: ${scores[i]}`;
    }
}
