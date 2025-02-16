let selectedGame = null;
let selectedPlayers = null;

function startGame(game) {
    selectedGame = game;
    document.getElementById("players-selection").style.display = "block";  // Megjelenítjük a játékosok választási lehetőségét
}

function selectPlayers(players) {
    selectedPlayers = players;
    document.getElementById("start-game-container").style.display = "block";  // Megjelenítjük a Start Game gombot
    document.getElementById("start-game-btn").innerText = `Start ${selectedGame} for ${selectedPlayers} Player(s)`;
}

function startActualGame() {
    if (selectedGame && selectedPlayers) {
        alert(`Starting ${selectedGame} for ${selectedPlayers} player(s)`);
        // Itt átirányíthatunk egy másik oldalra vagy elkezdhetjük a játékot
    } else {
        alert("Please select a game and number of players.");
    }
}
