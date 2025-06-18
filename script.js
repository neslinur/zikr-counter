// Get the paragraph where we show what the user said
const output = document.getElementById("output");

// Get the spans where we'll show the zikr counts
const subhanallahCountEl = document.getElementById("subhanallah-count");
const alhamdulillahCountEl = document.getElementById("alhamdulillah-count");
const allahuakbarCountEl = document.getElementById("allahuakbar-count");
const astaghfirullahCountEl = document.getElementById("astaghfirullah-count");

// Create counters to store how many times each zikr has been said
let subhanallah = 0;
let alhamdulillah = 0;
let allahuakbar = 0;
let astaghfirullah = 0;

// Set up speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Set the language (you can try 'en-US' or 'ar-SA' or 'tr-TR' later!)
recognition.lang = 'tr-TR';
recognition.continuous = true;

// Function to start listening when button is clicked
function startListening() {
  recognition.start();
}

// This function runs every time the browser hears speech
recognition.onresult = function(event) {
  // Get the most recent thing the user said
  const transcript = event.results[event.results.length - 1][0].transcript.trim();

  // Show what was heard
  output.textContent = "Heard: " + transcript;

  // Convert everything to lowercase to make comparison easier
  const said = transcript.toLowerCase();

  // Check what was said and update the correct counter
  if (said.includes("subhanallah")
      || said.includes("sübhanallah") || // Common pronunciation
      said.includes("سبحان الله") ) {    // Arabic script
        subhanallah++;
        subhanallahCountEl.textContent = subhanallah;
  } else if (said.includes("alhamdulillah")
             || said.includes("elhamdülillah") || // Turkish pronunciation
             said.includes("الحمد لله") ) {    // Arabic script
        alhamdulillah++;
        alhamdulillahCountEl.textContent = alhamdulillah;
  } else if (said.includes("allahu akbar") || // Common pronunciation
             said.includes("allahu ekber") || // Turkish pronunciation
             said.includes("الله أكبر") ) {   // Arabic script{
        allahuakbar++;
        allahuakbarCountEl.textContent = allahuakbar;
  }
// Check all known versions that might be returned depending on language or pronunciation
    else if (
        said.includes("astaghfirullah") ||
        said.includes("estağfurullah") || // Turkish
        said.includes("أستغفر الله")     // Arabic script
    ) {
        astaghfirullah++;
        astaghfirullahCountEl.textContent = astaghfirullah;
    }

};

// This function resets all counts to 0 and updates the page
function resetCounts() {
  // Reset the variables
  subhanallah = 0;
  alhamdulillah = 0;
  allahuakbar = 0;
  astaghfirullah = 0;

  // Reset what’s shown on screen
  subhanallahCountEl.textContent = 0;
  alhamdulillahCountEl.textContent = 0;
  allahuakbarCountEl.textContent = 0;
  astaghfirullahCountEl.textContent = 0;

  // Optional: Clear the "Heard: ..." text
  output.textContent = "Waiting for voice...";
}


