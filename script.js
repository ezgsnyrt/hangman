// Create a word array +
// Create line under each letter considering the number of letters in the word +
// If the user's guess has already been existed in the word, show the letter in its correct place +
// For each wrong guess of the user, show  hangman's body parts respectively
// Disable letters in the wrong guess in the keyboard
// Show the result if the user (knows the word, show result text "Congrats! You succesfully found the word" with new game buton and end game)
//                             (doesn't know the word, show result text "Don't give up! Let's try again" with new game buton and end game)

// STEP 1
// Create a word array
let wordArr = ["Watermelon", "Elephant", "Hippopotamus", "Cascade", "Pseudonym",  "Kaleidoscope", "Quantum", "Serendipity", "Umbrella", "Ephemeral", "Photosynthesis",
"Algorithm", "Nostalgia", "Perpendicular", "Giraffe", "Nebula"];

// Select a random word from wordArr
const randomWord = () => {
  return(wordArr[Math.floor(Math.random() * wordArr.length)]);
}
const selectedWord = randomWord().toLowerCase(); // Assign the randomWord as selectedWord
console.log(selectedWord);

// STEP 2
// Create span element for each letter and append it to user-input-section
for (let i = 0; i < selectedWord.length; i++) {
  let spanElement = document.createElement("span");
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
      console.log(event.key); // Since the letter is written as a value for key property of the event, include it
    }

    // Check if selectedWord includes event.key
    if(selectedWord.includes(event.key)) {
      [...selectedWord].forEach((letter, index) => { //Show correct letters in the word
        if(letter === event.key) {
          correctLetters.push(letter);
          document.querySelector("#user-input-section").querySelectorAll("span")[index].innerText = letter; // Another option is to create const displayWord = document.querySelector("#user-input-section")
        }
      });
    } else { // Show wrong letter trials if the clicked letter does not exist in the word
      wrongGuessCount++;

      addWrongLetter(event.key.toLowerCase()); // Take and update the wrong letters/inputs by means of keydown event (use it as a parameter)

      // Keep the wrong guesses of the user in wrongLettersArr[]
      function addWrongLetter(letter) {
        if (!wrongLettersArr.includes(letter)) { // If the letter is not existed in the array, add it to the array
          wrongLettersArr.push(letter);
        }
        updateWrongLetters(); // Update the wrong letters
      }

      function updateWrongLetters() {
        let wrongLettersHTML = '';

        if (wrongLettersArr.length > 0) {
          wrongLettersHTML += '<h4>Wrong Letter Trials</h4>'; // If there are wrong letters in the guess, add the heading element to html
        }

        for (let i = 0; i < wrongLettersArr.length; i++) { // Add each wrong letter to html
          wrongLettersHTML += `<span> ${wrongLettersArr[i]} </span>`;
        }

        document.getElementById("wrong-guess").innerHTML = wrongLettersHTML; // Upadate the innter html
      }

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