// Select a random word from wordArr
const randomWord = () => {
    return wordArr[Math.floor(Math.random() * wordArr.length)];
};
const selectedWord = randomWord().toLowerCase(); // Assign the randomWord as selectedWord
console.log(selectedWord);

// Create span element for each letter and append it to user-input-section
for (let i = 0; i < selectedWord.length; i++) {
    let spanElement = document.createElement("span");
    spanElement.innerHTML = "_";
    document.getElementById("user-input-section").appendChild(spanElement);
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
          onclick="handleClick(event)"
        >
        ${letter}
        </button>`
        )
        .join("");
    return keyboardDiv;
}
generateButton();

// Handle button click processes
function handleClick(event) {
    const virtualButtonClicked = event.target.nodeName === "BUTTON"; // Check if the event.target element is a <button> element. event.target represents the DOM element triggering the event. The nodeName property returns the type of the element in uppercase (e.g., "BUTTON").
    // const reviseWrongLetters = updateWrongLetters();
    if (virtualButtonClicked) {
        // || reviseWrongLetters
        //Use the event target id (the element triggering the event) to find and return the actual DOM element
        const buttonId = document.getElementById(event.target.id); // Use event.target.id within the event handler to get the id attribute of the element that triggered the event (e.g., a button clicked), and event.target.id retrieves the id of that element.
        buttonId.classList.add("selected");
        const letter = event.target.id;
        manageLetterProcesses(letter);
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
        if (!wrongLettersArr.includes(letter)) {
            wrongLettersArr.push(letter);
            wrongGuessCount++;
            updateWrongLetters(); // Update wrong letters in html if the virtual keyboard buttons are clicked
            showNextBodyPart(); // Add body parts if the user makes wrong guesses about letters
            if (wrongGuessCount === 6) {
                let popup = document.getElementById("popup-container");
                let resultText = document.getElementById("result-text");

                popup.style.display = "flex";
                resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The correct word was <span>${selectedWord}</span></p>`;
                deactivateAllButtons();
            }
        }
    }
}

// Keep the wrong guesses of the user in wrongLettersArr[]
function addWrongLetter(letter) {
    if (!wrongLettersArr.includes(letter)) {
        // If the letter is not existed in the array, add it to the array
        wrongLettersArr.push(letter);
        showNextBodyPart(); // Show the body parts
    }
    updateWrongLetters(); // Update the wrong letters
    // updateWrongLettersAlternative (); as an alternative function call
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

// Alternative function about updating wrong letters
// function updateWrongLettersAlternative () {
//   wrongLetters.innerHTML = `
//     ${wrongLettersArr.length > 0 ? '<h4>Wrong Letter Trials</h4>' : ''}
//     ${wrongLettersArr.map(letter => `<span> ${letter} </span>`)}
//   `;
// }
// updateWrongLetters();
// if (wrongGuessCount === 0) { }

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

let correctLetters = []; // Define a variable for correct guess
let wrongGuessCount = 0; // Define a variable for the number of wrong guesses
const wrongLettersArr = []; // Define a variable for wrong letters

function keyboardAction() {
    // events: keydown, keyup etc. //document.addEventListener(event, callback)
    document.addEventListener("keydown", (event) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // Only consider letters, not other characters
            console.log("Valid key:", event.key); // Since the letter is written as a value for key property of the event, include it

            const inputToLowerCase = event.key.toLowerCase();

            // Check if selectedWord includes event.key updated as inputToLowerCase
            if (selectedWord.includes(inputToLowerCase)) {
                [...selectedWord].forEach((letter, index) => {
                    // Show correct letters in the word
                    if (letter === inputToLowerCase) {
                        correctLetters.push(letter);
                        document
                            .querySelector("#user-input-section")
                            .querySelectorAll("span")[index].innerText = letter; // Another option is to create const displayWord = document.querySelector("#user-input-section")
                    }
                });
            } else {
                // Show wrong letter trials if the clicked letter does not exist in the word
                wrongGuessCount++;

                // Call function addWrongLetter(letter)
                addWrongLetter(inputToLowerCase); // Take and update the wrong letters/inputs by means of keydown event (use it as a parameter)

                // updateWrongLetters() has already been called in addWrongLetters function
            }

            // Use getElementById to select element with id. E.g., if 'a' is the clicked letter, buttonElement becomes <button id="a">...</button>
            const buttonElement = document.getElementById(inputToLowerCase); // letter refers to letters clicked in keyboard or virtual keyboard.
            // If buttonElement exists (buttonElement !== null olduğunda) and it doesn't have a 'selected' class already, add 'selected' class
            if (
                buttonElement &&
                !buttonElement.classList.contains("selected")
            ) {
                // Control buttonElement
                buttonElement.classList.add("selected");
            }
            if (wrongGuessCount === 6) {
                let popup = document.getElementById("popup-container");
                let resultText = document.getElementById("result-text");

                popup.style.display = "flex";
                resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The correct word was <span>${selectedWord}</span></p>`;
                deactivateAllButtons();
            }
        } else {
            console.log("Invalid key:", inputToLowerCase);
        }
    });
}
keyboardAction();

//Deactivate all buttons
const deactivateAllButtons = () => {
    let letterButtons = document.querySelectorAll(".alphabet-button");

    // Tüm harf butonlarını devre dışı bırak
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    const popupContainer = document.getElementById("popup-container");
    popupContainer.classList.remove("hide");
};

const popup = document.getElementById("popup-container");

function startNewGame() {
    // const resultText = document.getElementById("result-text");
    document.getElementById("new-game-button").innerHTML =
        "Let's start a new game!";
}

// function endGame() {
//   // const resultText = document.getElementById("result-text");
//   document.getElementById('end-game-button').innerHTML = "This is the end of game!"
// }