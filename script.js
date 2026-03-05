const wordLists = {
  easy: [
    "cat","dog","sun","moon","star","tree","rock","sand","fish","bird",
    "milk","book","pen","cup","hat","shoe","sock","coat","rain","snow",
    "wind","fire","lake","road","hill","farm","ship","boat","ring","bell",
    "cake","rice","corn","bean","meat","salt","soup","jam","map","key",
    "door","wall","roof","desk","chair","bed","lamp","clock","phone","mouse",
    "plant","grass","leaf","seed","apple","grape","peach","pear","plum","mango",
    "lemon","lime","berry","bread","toast","sugar","honey","water","juice","smile",
    "laugh","happy","sad","angry","brave","calm","kind","fast","slow","warm",
    "cold","soft","hard","light","dark","clean","dirty","early","late","young",
    "old","big","small","short","tall","round","sweet","sour","red","blue",
    "green","black","white","brown","pink","gray","gold","silver","north","south",
    "east","west","beach","river","field","cloud","storm","frost","stone","brick",
    "steel","glass","paper","cloth","shirt","pants","skirt","dress","belt","glove",
    "scarf","brush","comb","soap","towel","plate","spoon","fork","knife","bowl",
    "clock","watch","train","truck","plane","store","bank","park","zoo","cafe",
    "hotel","school","class","grade","study","learn","teach","write","read","draw",
    "paint","sing","dance","jump","walk","run","sleep","dream","think","know",
    "guess","build","fix","drive","ride","swim","climb","laugh","smile","share",
    "bring","carry","throw","catch","open","close","start","stop","begin","enter",
    "leave"
  ],
  med: [
    "planet","forest","garden","silver","golden","shadow","bright","candle","pillow","window",
    "mirror","bridge","castle","island","desert","jungle","valley","stream","ocean","harbor",
    "market","square","center","circle","corner","border","battle","charge","attack","defend",
    "sudden","silent","ancient","modern","future","memory","letter","number","figure","object",
    "travel","flight","ticket","engine","driver","screen","button","switch","signal","rocket",
    "helmet","armor","shield","sword","arrow","hunter","farmer","artist","writer","reader",
    "player","runner","walker","baker","maker","seller","buyer","leader","helper","friend",
    "enemy","danger","safety","health","wealth","energy","spirit","chance","choice","result",
    "reason","effect","method","system","policy","nation","region","county","village","street",
    "avenue","garage","garden","office","studio","theory","action","motion","vision","detail",
    "effort","report","record","secret","advice","answer","speech","debate","prince","dragon",
    "wizard","knight","giant","fairy","ghost","zombie","robot","alien","puzzle","riddle",
    "cipher","symbol","canvas","guitar","violin","piano","drums","trumpet","flower","thorns",
    "petal","branch","forest","meadow","prairie","desert","tunnel","subway","rescue","search",
    "resist","accept","reject","repair","replace","expand","reduce","create","design","invent",
    "explore","observe","compare","connect","balance","measure","weigh","stretch","bounce","glance",
    "notice","admire","prefer","demand","supply","import","export","profit","budget","credit",
    "debit","charge","review","update","upgrade","install","remove","assist","support","manage",
    "direct","control","secure","protect","develop","improve","achieve","collect","deliver","prepare",
    "arrive","depart","escape","return","remain","settle","decide"
  ],
  hard: [
    "awkward","zephyr","jigsaw","buzzard","quartz","oxygen","rhythm","mystic","voyage","hazard",
    "cipher","matrix","vertex","galaxy","nebula","cosmos","plasma","fusion","rocket","saturn",
    "mercury","uranus","meteor","comet","lunar","solar","eclipse","shadow","phantom","specter",
    "wraith","sphinx","oracle","legend","mythic","arcane","sacred","ritual","temple","shrine",
    "monk","bishop","cleric","prophet","sermon","gospel","virtue","mortal","divine","ethics",
    "manner","custom","origin","native","empire","dynasty","kingdom","throne","crown","castle",
    "fortress","citadel","barrack","arsenal","cannon","dagger","rapier","lancer","archer","sniper",
    "pistol","rifle","bullet","powder","target","impact","damage","repair","module","circuit",
    "sensor","device","gadget","widget","binary","coding","script","kernel","server","client",
    "router","switch","packet","buffer","memory","thread","socket","driver","format","render",
    "vector","pixel","canvas","layout","margin","border","radius","shadow","filter","backup",
    "upload","portal","domain","cipher","encode","decode","random","unique","rarely","barely",
    "nearly","deeply","highly","mostly","purely","simply","tricky","smooth","rugged","fragile",
    "sturdy","robust","stable","mobile","liquid","solid","gaseous","plenty","scarce","absent",
    "present","future","past","timely","urgent","formal","casual","linear","global","local",
    "public","secret","hidden","silent","loudly","bright","dimmed","golden","silver","bronze",
    "copper","nickel","carbon","oxygen","helium","plasma","energy","matter","force","motion",
    "gravity","friction","magnet","charge","voltage","current","resist","signal","vector","scalar",
    "tensor","quantum","theory","logic","reason","belief","wisdom","virtue","honor","valor",
    "spirit","legacy","destiny","fortune","chance","chaos","order"
  ]
};

function getRandomLine(type) {
    const list = wordLists[type] || wordLists.easy;
    const idx = Math.floor(Math.random() * list.length);
    return Promise.resolve(list[idx]);
};
function startGame(wordString) {
    word = wordString.toLowerCase().split("");
    display = word.map(letter => [letter, false]);
    amountwrong = 0;
    amountcorrect = 0;
    form.style.display = "none";
    input.value = "";
    text.textContent = "Guess a letter.";
    gametext.textContent = renderWord();
    buildKeyboard();
}

const text = document.getElementById("hmtxt");
const gametext = document.getElementById("hmgametxt");
const form = document.getElementById("guessForm");
const input = document.getElementById("guess");
const hmstate = document.getElementById("hmstate");
const guessedletters = document.getElementById("guessedletters");
const keyboardEl = document.getElementById("keyboard");
const easybot = document.getElementById("easybot");
const medbot = document.getElementById("medbot");
const hardbot = document.getElementById("hardbot");
const winscreen = document.getElementById("winscreen");
const winword = document.getElementById("winword");
const winscore = document.getElementById("winscore");
const playagain = document.getElementById("playagain");
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
};

easybot.addEventListener("click", (e) => {
    e.preventDefault();
    getRandomLine("easy").then(result => {
        resetGame();
        startGame(result);
    });
});

medbot.addEventListener("click", (e) => {
    e.preventDefault();
    getRandomLine("med").then(result => {
        resetGame();
        startGame(result);
    });
});

hardbot.addEventListener("click", (e) => {
    e.preventDefault();
    getRandomLine("hard").then(result => {
        resetGame();
        startGame(result);
    });
});



form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim().toLowerCase();
  if (!value) return;
  if (!word) {
    startGame(value);
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

        if (display.every(([letter, revealed]) => revealed)) {
            showWinScreen(1);
        }
        if (amountwrong >= 11) {
            showWinScreen(0);
        }
    });
};
document.getElementById("playagain").addEventListener("click", resetGame);

function showWinScreen(isWin) {
    
    form.style.display = "none";
    keyboardEl.innerHTML = "";
    winscreen.classList.remove("win", "lose");
    playagain.classList.remove("win", "lose");
    if (isWin) {
        winscreen.classList.add("win");
        playagain.classList.add("win");
    } else {
        winscreen.classList.add("lose");
        playagain.classList.add("lose");
    }
    winscreen.classList.remove("hidden");
    
    winword.textContent = `The word was: ${word.join("")}`;
    winscore.textContent = `Your score was: ${Math.max(amountcorrect * 10 - amountwrong * 5, 0)}`;

};
function resetGame() {
    word = null;
    guessing = false;
    display = [];
    amountused = 0;
    amountwrong = 0;
    amountcorrect = 0;
    keyboardEl.innerHTML = "";


    form.style.display = "block";
    
    document.getElementById("winscreen").classList.add("hidden");
    input.value = "";
    text.textContent = "Enter the word to guess.";
    gametext.textContent = "";
    hmstate.src = "hangman-states/Penjat_-_1.svg";
};