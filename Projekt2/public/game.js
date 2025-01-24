let playerId;
let questions;

function togglePasswords(index, players, allQuestions) {
    const passwordsUl = document.getElementById('passwords-ul');
    const playersList = document.getElementById('player-list');
    playersList.style.display = "none";
    passwordsUl.innerHTML = "";

    playerId = players[index]._id;
    questions = allQuestions ? allQuestions.filter(question => question.playerId === playerId) : [];

    players.forEach((player, i) => {
        if (i !== index) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${player.name}</strong>: ${player.password}`;
            passwordsUl.appendChild(li);
        }
    });

    const questionsListContainer = document.getElementById('questions-list-container');
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '';

    if (questions.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Brak pytań.";
        questionsList.appendChild(li);
    } else {
        questions.forEach((question) => {
            const li = document.createElement('li');
            li.setAttribute('data-id', question._id);
            li.innerHTML = `
                <strong>${question.question}</strong> - <em>Odpowiedź: ${question.answer}</em>
                <button class="xs" onclick="removeQuestion('${gameId}', '${question._id}')">Usuń</button>`;
            questionsList.appendChild(li);
        });
    }

    document.getElementById('question-form-container').style.display = "block";
    questionsListContainer.style.display = "block";
}

function addQuestion(gameId, event) {
    event.preventDefault();

    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');

    const newQuestion = {
        playerId: playerId,
        question: questionInput.value,
        answer: answerInput.value
    };

    fetch(`/game/${gameId}/add-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
    })
    .then(data => data.json())
    .then(questionId => {
        questions.push({ ...newQuestion, _id: questionId });

        const questionsList = document.getElementById('questions-list');
        if (questions.length === 1) questionsList.innerHTML = '';

        const li = document.createElement('li');
        li.setAttribute('data-id', questionId);
        li.innerHTML = `
            <strong>${newQuestion.question}</strong> - <em>Odpowiedź: ${newQuestion.answer}</em>
            <button class="xs" onclick="removeQuestion('${gameId}', '${questionId}')">Usuń</button>`;
        questionsList.appendChild(li);

        questionInput.value = '';
        answerInput.value = '';
    });
}

function removeQuestion(gameId, questionId) {
    fetch(`/game/${gameId}/remove-question/${questionId}`, { method: 'DELETE' })
    .then(() => {
        questions = questions.filter(question => question._id !== questionId);

        const questionsList = document.getElementById('questions-list');
        if (questions.length === 0) {
            questionsList.innerHTML = '<li>Brak pytań.</li>';
        }

        const questionListItem = document.querySelector(`#questions-list li[data-id="${questionId}"]`);
        if (questionListItem) questionListItem.remove();
    });
}
