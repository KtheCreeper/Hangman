const text = document.getElementById("hmtxt");
const gametext = document.getElementById("hmgametxt");
const form = document.getElementById("guessForm");
const input = document.getElementById("guess");
const hmstate = document.getElementById("hmstates");
const guessedletters = document.getElementById("guessedletters");
let word = null;
let guessing = false;
let display = [];
let amountused = 0;
let amountwrong;
let lau = false; //letter already used
let glar = []; //game letters array
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
  }
});
