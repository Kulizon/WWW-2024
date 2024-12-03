function startQuiz() {
    let score = 0;

    const question1 = prompt("1. Jak nazywa się małpa znana z głośnych wokalizacji?\nA) Makak\nB) Wyjec\nC) Kapucynka").toUpperCase();
    if (question1 === "B") score++;

    const question2 = prompt("2. Która małpa używa narzędzi, takich jak kamienie?\nA) Kapucynka\nB) Małpa Długonosowa\nC) Wyjec").toUpperCase();
    if (question2 === "A") score++;

    const question3 = prompt("3. Gdzie kąpią się makaki japońskie?\nA) W gorących źródłach\nB) W rzekach\nC) W oceanie").toUpperCase();
    if (question3 === "A") score++;

    alert(`Twój wynik: ${score}/3`);
}