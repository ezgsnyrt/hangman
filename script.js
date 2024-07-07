// kelime listesi +
// kelimedeki harf sayısı kadar çizgi +
// tahmin edilen harf kelimede varsa, o harfi yerinde gösterme
// yanlış yapılan her tahmin için sırasıyla kafa, gövde, bacaklar ve kolları gösterme
// tahmin edilen harfleri klavyede disabled yapma
// sonucu gösterme (kelime bilindiyse, result text congratulations yazısı ve new game butonu gösterme)
//                 (kelime bilinemediyse, result text don't give up yazısı ve try again butonu)

let wordArr = ["Watermelon", "Elephant", "Hippopotamus", "Cascade", "Pseudonym",  "Kaleidoscope", "Quantum", "Serendipity", "Umbrella", "Ephemeral", "Photosynthesis",
"Algorithm", "Nostalgia", "Perpendicular", "Giraffe", "Nebula"];

const randomWord = () => {
  return(wordArr[Math.floor(Math.random() * wordArr.length)]);
}
console.log(randomWord());

//assign the random word as input word
const inputWord = randomWord();
for (let i = 0; i < inputWord.length; i++) {

  //create span element for each letter and append it to user-input-section
  let spanElement = document.createElement("span");
  spanElement.innerHTML = "_";
  document.getElementById("user-input-section").appendChild(spanElement);
}

//
function keyboardAction () {

}





