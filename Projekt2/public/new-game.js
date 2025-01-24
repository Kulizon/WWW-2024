let playerCount = 3;

function addPlayer() {
    const container = document.getElementById('players-container');
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');
    playerDiv.innerHTML = `
        <div class="input-group">
            <label for="player-name-${playerCount}">Imię gracza</label>
            <input type="text" id="player-name-${playerCount}" name="players[${playerCount}][name]" placeholder="Imię gracza">
        </div>
        <div class="input-group">
            <label for="player-password-${playerCount}">Hasło</label>
            <input type="text" id="player-password-${playerCount}" name="players[${playerCount}][password]" placeholder="Hasło">
        </div>
        <button type="button" onclick="removePlayer(this)">Usuń gracza</button>
    `;
    container.appendChild(playerDiv);
    playerCount++;

    if (document.querySelectorAll('.player').length >= 3) {
        document.getElementById('error-message').innerHTML = '';
    }
}

function removePlayer(button) {
    const container = document.getElementById('players-container');
    const playerDiv = button.parentElement;
    container.removeChild(playerDiv);
    playerCount--;

    if (document.querySelectorAll('.player').length < 3) {
        document.getElementById('error-message').innerHTML = 'Musi być przynajmniej 3 graczy.';
    } else {
        document.getElementById('error-message').innerHTML = '';
    }
}

function validateForm() {
    const playerDivs = document.querySelectorAll('.player');
    let isValid = true;
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.innerHTML = '';

    let playerCountError = false;
    let nameLengthError = false;
    let passwordLengthError = false;

    if (playerDivs.length < 3) {
        errorMessageDiv.innerHTML += 'Dodaj przynajmniej 3 graczy. <br>';
        playerCountError = true;
        isValid = false;
    }

    for (let i = 0; i < playerDivs.length; i++) {
        const nameInput = playerDivs[i].querySelector(`input[name="players[${i}][name]"]`);
        const passwordInput = playerDivs[i].querySelector(`input[name="players[${i}][password]"]`);

        if (nameInput.value.trim().length < 3 && !nameLengthError) {
            errorMessageDiv.innerHTML += 'Imiona graczy muszą mieć co najmniej 3 znaki. <br>';
            nameLengthError = true;
            isValid = false;
        }
        if (passwordInput.value.trim().length < 3 && !passwordLengthError) {
            errorMessageDiv.innerHTML += 'Hasła muszą mieć co najmniej 3 znaki. <br>';
            passwordLengthError = true;
            isValid = false;
        }
    }

    return isValid;
}

window.addEventListener('load', function() {
    const errorMessageDiv = document.getElementById('error-message');
    let serverError;
    try {
        serverError = typeof error !== "undefined" ? error.slice(7) : '';
    } catch (e) {
        serverError = "";
    }

    if (serverError) {
        errorMessageDiv.innerHTML = serverError;
    }
});
