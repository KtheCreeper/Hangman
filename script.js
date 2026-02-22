const text = document.getElementById("hmtxt");
const gametext = document.getElementById("hmgametxt");
const form = document.getElementById("guessForm");
const input = document.getElementById("guess");
const hmstate = document.getElementById("hmstate");
const guessedletters = document.getElementById("guessedletters");
const keyboardEl = document.getElementById("keyboard");
const keyboardLayout = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
];
let word = null;
let guessing = false;
let display = [];
let amountused = 0;
let amountwrong;
let amountcorrect = 0;
function renderWord() {
  return display
    .map(([letter, revealed]) => (revealed ? letter : "_"))
    .join(" ");
}

text.textContent = "Enter the word to guess.";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim().toLowerCase();
  if (!value) return;

  if (!word) {
    word = value.toLowerCase().split("");
    guessing = true;
    text.textContent = "Word selected. Guess a letter.";
    for (let i = 0; i < word.length; i++) {
      display.push([word[i], false]);
    }
    amountwrong = 0;
    amountcorrect = 0;
    input.value = "";
    form.style.display = "none";
    gametext.textContent = renderWord();
    buildKeyboard();

  }
});




function buildKeyboard() {
    keyboardLayout.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.className = "key-row";
        [...row].forEach(letter => {
            const btn = document.createElement("button");
            btn.className = "key";
            btn.textContent = letter;
            btn.dataset.key = letter;
            rowEl.appendChild(btn);
        });
        keyboardEl.appendChild(rowEl);
    });
 


    keyboardEl.addEventListener("click", (e) => {
        amountused = 0;
        const btn = e.target.closest(".key");
        if (!btn || btn.classList.contains("wrong") || btn.classList.contains("correct")) return;

        const letter = btn.dataset.key;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter.toLowerCase()) {
            display[i][1] = true;
            amountused++;
            amountcorrect++;
            }
        }

        gametext.textContent = renderWord();

        if (amountused > 0) {
            btn.classList.add("correct");
            text.textContent = `The letter ${letter} is in the word ${amountused} ${amountused === 1 ? "time" : "times"}.`;
        } else {
            btn.classList.add("wrong");
            amountwrong++;
            hmstate.src = `hangman-states/Penjat_-_${amountwrong + 1}.svg`;
            text.textContent = "Incorrect guess.";
        }
        

        const gameover = display.every(([letter, revealed]) => revealed) || amountwrong >= 11;
        if (gameover) {
            showWinScreen();
        }
    });
};
document.getElementById("playagain").addEventListener("click", resetGame);

function showWinScreen() {
    
    form.style.display = "none";
    keyboardEl.innerHTML = "";
    document.getElementById("winscreen").classList.remove("hidden");
    const winword = document.getElementById("winword");
    winword.textContent = `The word was: ${word.join("")}`;
    const winscore = document.getElementById("winscore");
    winscore.textContent = `Your score was: ${amountcorrect * 10 - amountwrong * 5}`;

}
function resetGame() {
    word = null;
    guessing = false;
    display = [];
    amountused = 0;
    amountwrong = 0;
    amountcorrect = 0;

    form.style.display = "block";
    
    document.getElementById("winscreen").classList.add("hidden");
    input.value = "";
    text.textContent = "Enter the word to guess.";
    gametext.textContent = "";
    hmstate.src = "hangman-states/Penjat_-_1.svg";
}