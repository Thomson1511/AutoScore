let selectedPlayers = null;

function selectPlayers(players) {
    selectedPlayers = players;

    // Elrejtjük a választási lehetőséget
    document.getElementById("players-selection").style.display = "none";

    // Megjelenítjük a játékosok nevét és kezdőpontját
    let playersDisplay = document.getElementById("players-display");
    playersDisplay.style.display = "block";

    // Töröljük a korábbi játékosokat
    playersDisplay.innerHTML = "";  // Ürítjük a tartalmat, hogy újra generálhassuk

    // Hozzáadjuk a játékosokat a kijelzőhöz
    for (let i = 1; i <= selectedPlayers; i++) {
        let playerDiv = document.createElement("div");
        playerDiv.innerHTML = `Player ${i}: 501`;  // Alapértelmezett kezdőpont 501
        playersDisplay.appendChild(playerDiv);
    }
}
