// get elements from the page to show counts
const output = document.getElementById("output");
const subhanallahCountEl = document.getElementById("subhanallah-count");
const alhamdulillahCountEl = document.getElementById("alhamdulillah-count");
const allahuakbarCountEl = document.getElementById("allahuakbar-count");
const astaghfirullahCountEl = document.getElementById("astaghfirullah-count");

// set starting counts for each zikr
let subhanallah = 0;
let alhamdulillah = 0;
let allahuakbar = 0;
let astaghfirullah = 0;

// set up voice recognition using browser api
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'tr-TR'; // use turkish or whatever works best for you
recognition.continuous = true;
recognition.interimResults = true;

// start listening when start button is clicked
function startListening() {
  recognition.start();
}

// this counts how many times a word appears in a sentence (latin letters)
function countOccurrences(sentence, word) {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = sentence.match(regex);
  return matches ? matches.length : 0;
}

// this counts exact arabic words (no word boundary because arabic doesn't split the same)
function countArabicExact(sentence, arabicWord) {
  return sentence.split(arabicWord).length - 1;
}

// this runs when the browser hears something
recognition.onresult = function(event) {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;

        if (event.results[i].isFinal) {
        processZikr(event.results[i][0].transcript.trim());
        }
    }
  output.textContent = "heard: " + transcript;
 
}

function processZikr(transcript) {
    const said = transcript.toLowerCase();

  // count how many times each zikr is said
    subhanallah += countOccurrences(said, "subhanallah") + countOccurrences(said, "sübhanallah");
    alhamdulillah += countOccurrences(said, "alhamdulillah") + countOccurrences(said, "elhamdülillah");
    allahuakbar += countOccurrences(said, "allahu akbar") + countOccurrences(said, "allahu ekber");
    astaghfirullah +=
    countOccurrences(said, "astaghfirullah") +
    countOccurrences(said, "estağfurullah") +
    countArabicExact(said, "أستغفر الله");


  // update numbers on the page
  subhanallahCountEl.textContent = subhanallah;
  alhamdulillahCountEl.textContent = alhamdulillah;
  allahuakbarCountEl.textContent = allahuakbar;
  astaghfirullahCountEl.textContent = astaghfirullah;
}

// this resets all counts to 0 when reset button is clicked
function resetCounts() {
  subhanallah = 0;
  alhamdulillah = 0;
  allahuakbar = 0;
  astaghfirullah = 0;

  subhanallahCountEl.textContent = 0;
  alhamdulillahCountEl.textContent = 0;
  allahuakbarCountEl.textContent = 0;
  astaghfirullahCountEl.textContent = 0;

  output.textContent = "waiting for voice...";
}
