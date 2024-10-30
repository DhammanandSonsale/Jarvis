const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    if ('speechSynthesis' in window) {
        const textSpeak = new SpeechSynthesisUtterance(text);
        textSpeak.rate = 1;
        textSpeak.volume = 1;
        textSpeak.pitch = 1;
        window.speechSynthesis.speak(textSpeak);
    } else {
        console.error("Speech synthesis not supported on this browser.");
    }
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener('click', () => {
        content.textContent = "Listening....";
        recognition.start();
    });
} else {
    console.error("Speech recognition not supported on this browser.");
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = message.replace(" ", "+");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        speak("Here is what I found on the internet for " + message);
    } else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        speak("Here is what I found on Wikipedia for " + query);
    } else if (message.includes('time')) {
        speak(new Date().toLocaleTimeString());
    } else if (message.includes('date')) {
        speak(new Date().toLocaleDateString());
    } else if (message.includes('ajay')) {
        speak("ajay's maoney transfer");
    } else if (message.includes('bhikari')) {
        speak("tuiil");
    } else {
        const query = message.replace(" ", "+");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}


