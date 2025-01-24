function togglePasswords(button) {
    const gameItem = button.closest('.game-item');
    const passwords = gameItem.querySelectorAll('.password');
    
    passwords.forEach(password => {
        password.style.display = password.style.display === 'inline' ? 'none' : 'inline';
    });

    button.textContent = passwords[0].style.display === 'inline' ? 'Ukryj hasła' : 'Pokaż hasła';
}

function showGame(gameId) {
    window.location.href = `/game/${gameId}`;
}
