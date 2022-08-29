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

// Hente ut alle elementer jeg trenger

// Koble til lytter på test knapp
// Lage funksjon som henter ut tilfeldig ord


let didFinish = false;
const spans = document.querySelectorAll("span");
const inputs = document.querySelectorAll("input");
const test = document.getElementById("test");
const styles = getComputedStyle(document.documentElement);

const random = () => {
  return Math.floor(Math.random() * wordList.length);
};

const addWords = () => {
  [...spans].forEach((span) => (span.innerHTML = wordList[random()]));
};

const sortWords = () => {
  const words = [...spans].map((span) => span.innerHTML);
  return words.sort();
};

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

const updateBackgroundColor = (color, initialText, resolvedText) => {
  test.style.backgroundColor = styles.getPropertyValue(color);
  test.style.color = styles.getPropertyValue("--white");
  test.innerHTML = resolvedText;

  setTimeout(() => {
    test.style.backgroundColor = styles.getPropertyValue("--white");
    test.style.color = styles.getPropertyValue("--black");
    test.innerHTML = initialText;
  }, 1000);
};

const startNewRound = () => {
  test.style.backgroundColor = "#ffffff";
  test.innerHTML = "Test";
  Array.from(inputs).forEach((input) => (input.value = ""));
  addWords();
};

const validate = () => {
  if (didFinish) {
    startNewRound();
    didFinish = false;
    return;
  }
  const sortedWords = sortWords();
  if (canValidate()) {
    const guesses = [...inputs].map((input) => {
      return {
        value: input.value,
        word: input.nextElementSibling.innerHTML,
      };
    });
    if (
      guesses.filter(
        (guess) => sortedWords[Number(guess.value) - 1] === guess.word
      )?.length === 4
    ) {
      updateBackgroundColor("--green", "Ny runde", "Supert");
      didFinish = true;
    } else {
      updateBackgroundColor("--red", "Prøv igjen", "Feil");
    }
  } else {
    updateBackgroundColor("--purple", "Prøv igjen", "Mangler verdier");
  }
};

test.addEventListener("click", validate);

addWords();