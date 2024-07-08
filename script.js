// Create a word array +
// Create line under each letter considering the number of letters in the word +
// If the user's guess has already been existed in the word, show the letter in its correct place +
// For each wrong guess of the user, show  hangman's body parts respectively
// Disable letters in the wrong guess in the keyboard
// Show the result if the user (knows the word, show result text "Congrats! You succesfully found the word" with new game buton and end game)
//                             (doesn't know the word, show result text "Don't give up! Let's try again" with new game buton and end game)

// STEP 1
let wordArr = ["Watermelon", "Elephant", "Hippopotamus", "Cascade", "Pseudonym",  "Kaleidoscope", "Quantum", "Serendipity", "Umbrella", "Ephemeral", "Photosynthesis",
"Algorithm", "Nostalgia", "Perpendicular", "Giraffe", "Nebula"]; // Create a word array

const randomWord = () => {  // Select a random word from wordArr
  return(wordArr[Math.floor(Math.random() * wordArr.length)]);
}
const selectedWord = randomWord().toLowerCase(); // Assign the randomWord as selectedWord
console.log(selectedWord);

// STEP 2
for (let i = 0; i < selectedWord.length; i++) {
  let spanElement = document.createElement("span"); // Create span element for each letter and append it to user-input-section
  spanElement.innerHTML = "_";
  document.getElementById("user-input-section").appendChild(spanElement);
}

// STEP 3
let correctLetters = []; // Define a variable for correct guess
let wrongGuessCount = 0; // Define a variable for the number of wrong guesses
const wrongLettersArr = []; // Define a variable for wrong letters

function keyboardAction () { //events: keydown, keyup etc. //document.addEventListener(event, callback)
  document.addEventListener("keydown", event => {
    if (event.keyCode >= 65 && event.keyCode <= 90) { // Only consider letters, not other characters
      console.log(event.key); //Since the letter is written as a value for key property of the event, include it
    }

    if(selectedWord.includes(event.key)) { // Check if selectedWord includes event.key
      [...selectedWord].forEach((letter, index) => { //Show correct letters in the word
        if(letter === event.key) {
          correctLetters.push(letter);
          document.querySelector("#user-input-section").querySelectorAll("span")[index].innerText = letter; // Another option is to create const displayWord = document.querySelector("#user-input-section")
        }
      });
    } else { // Show wrong letter trials if the clicked letter does not exist in the word
      wrongGuessCount++;
      wrongLettersArr.push(event.key);

      const wrongLetters = document.getElementById("wrong-guess");

      function updateWrongLetters() {
        let wrongLettersHTML = '';

        if (wrongLettersArr.length > 0) {
          wrongLettersHTML += '<h4>Wrong Letter Trials</h4>';
        }

        for (let i = 0; i < wrongLettersArr.length; i++) {
          wrongLettersHTML += `<span> ${wrongLettersArr[i]} </span>`;
        }

        wrongLetters.innerHTML = wrongLettersHTML;
      }
      updateWrongLetters();

      // Alternative function
      // function updateWrongLetters () {
      //   wrongLetters.innerHTML = `
      //     ${wrongLettersArr.length > 0 ? '<h4>Wrong Letter Trials</h4>' : ''}
      //     ${wrongLettersArr.map(letter => `<span> ${letter} </span>`)}
      //   `;
      // }
      // updateWrongLetters();
      // if (wrongGuessCount === 0) { }
    }
  });
}
keyboardAction();

// Restrict wrong letter trials for the same letters not to repeat itself









