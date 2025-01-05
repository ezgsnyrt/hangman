let wordArr = [
    "Watermelon",
    "Elephant",
    "Hippopotamus",
    "Cascade",
    "Pseudonym",
    "Kaleidoscope",
    "Quantum",
    "Serendipity",
    "Umbrella",
    "Ephemeral",
    "Photosynthesis",
    "Algorithm",
    "Nostalgia",
    "Perpendicular",
    "Giraffe",
    "Nebula",
    "Antediluvian",
    "Sesquipedalian",
    "Effervescent",
    "Obfuscate",
    "Perspicacious",
    "Conflagration",
    "Transmogrify",
    "Perfidious",
    "Circumlocution",
    "Magnanimous",
];
// // Select a random word from wordArr
const randomWord = () => {
    return wordArr[Math.floor(Math.random() * wordArr.length)];
};

let selectedWord;
// const selectedWord = randomWord().toLowerCase(); // Assign the randomWord as selectedWord
// console.log(selectedWord);

// Create span element for each letter and append it to user-input-section
function createLetterSpans() {
    for (let i = 0; i < selectedWord.length; i++) {
        let spanElement = document.createElement("span");
        spanElement.innerHTML = "_";
        document.getElementById("user-input-section").appendChild(spanElement);
    }
}
// let userInputSection = document.getElementById("user-input-section");
function deletePreviousLetterSpans() {
    let userInputSection = document.getElementById("user-input-section");
    let childrenCount = userInputSection.children.length;
    for (let i = 0; i < childrenCount; i++) {
        // console.log(i);
        // console.log("length: ", userInputSection.children.length);
        userInputSection.removeChild(userInputSection.children[0]);
    }
}

// Generate koyboard buttons
function generateButton() {
    const keyboardDiv = document.getElementById("keyboard");
    keyboardDiv.innerHTML = "abcdefghijklmnopqrstuvwxyz"
        .split("")
        .map(
            (letter) =>
                `<button
          class="alphabet-button"
          id="${letter}"
          onclick="handleButtonClick(event)"
        >
        ${letter}
        </button>`
        )
        .join("");
    return keyboardDiv;
}
// generateButton();

function activateAllButtons() {
    let letterButtons = document.querySelectorAll(".alphabet-button");

    letterButtons.forEach((button) => {
        button.disabled = false;
    });
}

//Deactivate all buttons
const deactivateAllButtons = () => {
    let letterButtons = document.querySelectorAll(".alphabet-button");

    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    const popupContainer = document.getElementById("popup-container");
    popupContainer.classList.remove("hide");
};

// check if the choices finished, game over
function checkIfGameOver() {
    if (wrongGuessCount === 6) {
        let popup = document.getElementById("popup-container");
        let resultText = document.getElementById("result-text");

        popup.style.display = "flex";
        resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The correct word was <span>${selectedWord}</span></p>`;
        deactivateAllButtons();
    }
}

function updateWrongLetters() {
    let wrongLettersHTML = "";

    if (wrongLettersArr.length > 0) {
        wrongLettersHTML += "<h4>Wrong Letter Trials</h4>"; // If there are wrong letters in the guess, add the heading element to html
    }

    for (let i = 0; i < wrongLettersArr.length; i++) {
        // Add each wrong letter to html
        wrongLettersHTML += `<span> ${wrongLettersArr[i]} </span>`;
    }

    document.getElementById("wrong-guess").innerHTML = wrongLettersHTML; // Update the inner html
}

function resetWrongLetters() {
    document.getElementById("wrong-guess").innerHTML = ""; // Update the inner html
}

// Show hangman body parts considering each wrong guess
function showNextBodyPart() {
    // Define and select hangman body parts
    const hangmanBodyParts = document.querySelectorAll(".hangman-body-part");

    for (let i = 0; i < hangmanBodyParts.length; i++) {
        if (hangmanBodyParts[i].classList.contains("hide")) {
            hangmanBodyParts[i].classList.remove("hide");

            break;
        }
    }
}

function resetHangmanBodyParts() {
    const hangmanBodyParts = document.querySelectorAll(".hangman-body-part");

    hangmanBodyParts.forEach(function resetHangmanBodyParts(hangmanBodyPart) {
        if (!hangmanBodyPart.classList.contains("hide")) {
            hangmanBodyPart.classList.add("hide");
        }
    });
    console.log("All body parts are hided");
}

let correctLetters = []; // Define a variable for correct guess
let wrongGuessCount = 0; // Define a variable for the number of wrong guesses
let wrongLettersArr = []; // Define a variable for wrong letters

function resetBtnColors() {
    let selectedBtns = document.querySelectorAll(".selected");
    selectedBtns.forEach((btn) => {
        btn.className = "alphabet-button";
    });
}

function updateBtnColor(letter) {
    //Use the event target id (the element triggering the event) to find and return the actual DOM element
    const buttonId = document.getElementById(letter); // Use event.target.id within the event handler to get the id attribute of the element that triggered the event (e.g., a button clicked), and event.target.id retrieves the id of that element.
    buttonId.classList.add("selected");
}

// Keep the wrong guesses of the user in wrongLettersArr[]
function handleWrongLetterInput(letter) {
    if (!wrongLettersArr.includes(letter)) {
        wrongLettersArr.push(letter);
        wrongGuessCount++;
        updateWrongLetters(); // Update wrong letters in html if the virtual keyboard buttons are clicked
        showNextBodyPart(); // Add body parts if the user makes wrong guesses about letters
        checkIfGameOver();
    }
}

// Manage letter processes
function manageLetterProcesses(letter) {
    if (selectedWord.includes(letter)) {
        [...selectedWord].forEach((char, index) => {
            if (char === letter) {
                correctLetters.push(char);
                document
                    .querySelector("#user-input-section")
                    .querySelectorAll("span")[index].innerText = char;
            }
        });
    } else {
        handleWrongLetterInput(letter);
    }
    updateBtnColor(letter);
}

// Handle button click processes
function handleButtonClick(event) {
    const virtualButtonClicked = event.target.nodeName === "BUTTON"; // Check if the event.target element is a <button> element. event.target represents the DOM element triggering the event. The nodeName property returns the type of the element in uppercase (e.g., "BUTTON").
    // const reviseWrongLetters = updateWrongLetters();
    if (virtualButtonClicked) {
        manageLetterProcesses(event.target.id);
    }
}

function handleKeyboardAction(event) {
    // events: keydown, keyup etc. //document.addEventListener(event, callback)
    const inputToLowerCase = event.key.toLowerCase();
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        // Only consider letters, not other characters
        console.log("Valid key:", event.key); // Since the letter is written as a value for key property of the event, include it

        manageLetterProcesses(inputToLowerCase);
    } else {
        console.log("Invalid key:", inputToLowerCase);
    }
}

function handleNewGameBtnClick(event) {
    const popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "none";
    activateAllButtons();
    deletePreviousLetterSpans();
    resetBtnColors();

    // start fresh with variables
    correctLetters = [];
    wrongGuessCount = 0;
    wrongLettersArr = [];
    resetWrongLetters();
    resetHangmanBodyParts();
    selectedWord = randomWord().toLowerCase();
    console.log(selectedWord);
    createLetterSpans();
}

function main() {
    correctLetters = []; // Define a variable for correct guess
    wrongGuessCount = 0; // Define a variable for the number of wrong guesses
    wrongLettersArr = [];
    // const resultText = document.getElementById("result-text");
    // document.getElementById("new-game-button").innerHTML =
    //     "Let's start a new game!";
    selectedWord = randomWord().toLowerCase();
    console.log(selectedWord);
    createLetterSpans();
    generateButton();

    document.addEventListener("keydown", handleKeyboardAction);
}

main();