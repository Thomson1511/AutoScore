let selectedPlayers = null;

function selectPlayers(players) {
    selectedPlayers = players;
    document.getElementById("start-game-container").style.display = "block";  // Megjelenítjük a Start Game gombot
    document.getElementById("start-game-btn").innerText = `Start ${selectedGame} for ${selectedPlayers} Player(s) with ${startingScore}`;
}
