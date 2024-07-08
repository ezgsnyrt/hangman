// kelime listesi +
// kelimedeki harf sayısı kadar çizgi +
// tahmin edilen harf kelimede varsa, o harfi yerinde gösterme +
// yanlış yapılan her tahmin için sırasıyla kafa, gövde, bacaklar ve kolları gösterme
// tahmin edilen harfleri klavyede disabled yapma
// sonucu gösterme (kelime bilindiyse, result text yazısı Congrats! You succesfully found the word ve new game butonu gösterme)
//                 (kelime bilinemediyse, result text don't give up yazısı ve try again butonu)

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
let wrongGuessCount = 0; // Define a variable for wrong guess

function keyboardAction () { //events: keydown, keyup etc. //document.addEventListener(event, callback)
  document.addEventListener("keydown", event => {
    console.log(event.key); //Since the letter is written as a value for key property of the event, include it

    if(selectedWord.includes(event.key)) { // Check if selectedWord includes event.key
      [...selectedWord].forEach((letter, index) => { //Show correct letters in the word
        if(letter === event.key) {
          correctLetters.push(letter);
          document.querySelector("#user-input-section").querySelectorAll("span")[index].innerText = letter; // Another option is to create const displayWord = document.querySelector("#user-input-section")
        }
      });
    } else { //if the clicked letter does not exist in the word
      wrongGuessCount++;
      //hangman body part will be shown.
    }
  });
}
keyboardAction();










