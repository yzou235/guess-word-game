// Options
const options = {
    aroma: "Pleasing smell",
    pepper: "Salt's partner",
    halt: "Put a stop to",
    labyrinth: "Maze",
    shuffle: "Mix cards up",
    chaos: "Total disorder"
};

// Initial References
const hintRef = document.querySelector(".hint-ref");
const userInpSection = document.getElementById("user-input-section");
const message = document.getElementById("message");
const letterContainer = document.getElementById("letter-container");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "", randomHint = "";
let winCount = 0, lossCount = 0;

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};

// Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

// Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};

// Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}<div>`;
    let displayItem = "";
    randomWord.split("").forEach(value => {
        displayItem += '<span class="inputSpace">_ </span>'
    });

    //display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;

};

// Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    //creating letter buttons
    for(let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //Character button onclick
        button.addEventListener("click", () => {
            message.innerText = `Correct Letter`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");

            //if array contains clicked value replace the matched dash with letter
            if(charArray.includes(button.innerText)){
                charArray.forEach((char, index) => {
                    //if character in array is same as clicked button
                    if(char === button.innerText){
                        button.classList.add("correct");
                        //replace dash with letter
                        inputSpace[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //if winCount equals word length
                        if(winCount == charArray.length){
                            resultText.innerHTML = "You Won!";
                            startBtn.innerText = "Restart";
                            //block all buttons
                            blocker();
                        }
                    }
                })
            } else {
                //lose count
                button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if(lossCount == 0) {
                    word.innerHTML = `The word was <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over";
                    blocker();
                }
            }

            //Disable clicked buttons
            button.disabled = true;
            
        });

        //Append generated buttons to the letters container
        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    init();
};




