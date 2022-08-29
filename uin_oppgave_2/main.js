const wordList = [
  "Huske",
  "Trene",
  "Danse",
  "Hoppe",
  "Sykle",
  "Gå",
  "Rulle",
  "Trille",
  "Kjøre",
  "Løpe",
  "Springe",
  "Hinke",
  "Sparke",
  "Sprinte",
  "Forflytte",
  "Trimme",
  "Løfte",
  "Snurre",
  "Svinge",
  "Svømme",
  "Flyte",
  "Fly",
  "Sveve",
  "Ake",
  "Dra",
];

// Setter didFinish til false til å begynne med 
// switches til true når vi har løst sorteringen

let didFinish = false;

// Henter alle elemente vi trenger
const spans = document.querySelectorAll("span");
const inputs = document.querySelectorAll("input");
const test = document.getElementById("test");

// Henter ut stilene fra stylesheets. Slik at vi kan hente ut :root {} fargene
const styles = getComputedStyle(document.documentElement);

// Funksjon som gir oss et random tall mellom 0 og lengden på ordlisten
const random = () => {
  return Math.floor(Math.random() * wordList.length);
};


const addWords = () => {
  // Går igjennom alle span-nodene. Til hver node sin tekst hentes det
  // ut et random ord fra ordlisten. 
  [...spans].forEach((span) => (span.innerHTML = wordList[random()]));
};

// Funksjon vi kan bruke for få rett sortering av ordene i span`ene
// Kan da denne sorterte listen for å sjekke at vi har sortert riktig
const sortWords = () => {
  const words = [...spans].map((span) => span.innerHTML);
  return words.sort();
};

// Funksjon brukt for å sjekke at verdiene i input oppfyller minimumskravene
// Sjekker at vi har en verdi, at det er et tall og tallet er større enn 0 og mindre enn 5
const canValidate = () => {
  const numbers = [...inputs].map((input) => input.value);
  const uniqueNumbers = [...new Set(numbers)];
  return (
    uniqueNumbers?.filter(
      (value) =>
        value && Number(value) && Number(value) > 0 && Number(value) < 5
    )?.length === 4
  );
};

// Funksjon brukt for å endre bakgrunnen på knappen
// Kan da bruke variablene som er på :root {} i CSSen
const updateBackgroundColor = (color, initialText, resolvedText) => {
  test.style.backgroundColor = styles.getPropertyValue(color);
  test.style.color = styles.getPropertyValue("--white");
  test.innerHTML = resolvedText;

  // Nullstiller fargendringen etter 1 sekund (1000ms)
  setTimeout(() => {
    test.style.backgroundColor = styles.getPropertyValue("--white");
    test.style.color = styles.getPropertyValue("--black");
    test.innerHTML = initialText;
  }, 1000);
};

// Starter ny runde med nye ord
const startNewRound = () => {
  test.style.backgroundColor = "#ffffff";
  test.innerHTML = "Test";
  Array.from(inputs).forEach((input) => (input.value = ""));
  addWords();
};

const validate = () => {
  // Sjekker om vi har klart sorteringen
  // Hvis tilfelle starter ny runde og didFinish blir false igjen
  if (didFinish) {
    startNewRound();
    didFinish = false;
    return;
  }
  const sortedWords = sortWords();
  // Sjekker om input-verdiene oppfyller kravene
  if (canValidate()) {
    // Henter ut verdiene i input og teksten for "nextElementSibling"
    // nextElementSibling er søsteren til <input /> altså <span></span>
    const guesses = [...inputs].map((input) => {
      return {
        value: input.value,
        word: input.nextElementSibling.innerHTML,
      };
    });
    // Sjekker om rekkefølgene på sorteringen er korrekt
    // Bruker den sorterte listen og sjekker om den sammenfaller med
    // det vi har skrevet input
    // For at sorteringen er riktig må filteret under gi en lengde på 4
    // som vil si at alle verdiene er sortert riktig
    if (
      guesses.filter(
        (guess) => sortedWords[Number(guess.value) - 1] === guess.word
      )?.length === 4
    ) {
      updateBackgroundColor("--green", "Ny runde", "Supert");
      // Hvis sorteringen er riktig flipp didFinish til true
      // Gjør at neste gang vi trykker knappen så starter ny runde (se i starten av denne funksjonen)
      didFinish = true;
    } else {
      updateBackgroundColor("--red", "Prøv igjen", "Feil");
    }
  } else {
    updateBackgroundColor("--purple", "Prøv igjen", "Mangler verdier");
  }
};

// Lytter til klikk på knappen
test.addEventListener("click", validate);

addWords();