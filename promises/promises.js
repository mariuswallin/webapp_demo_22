const getQuotes = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Quote");
    }, 500);
  });

const twoCharacters = [];
const myGlobal = "myGlobal"

const fetchQuotesAndCharacters = async () => {
  console.log("Fetch start");
  const recievedQuotes = await getQuotes();
  twoCharacters.push(...recievedQuotes.split(""));
  console.log("Fetch end");
};

let shuffleCharacters = (twoCharacters) => {
  console.log("Shuffle");
  console.log("twoCharacters", twoCharacters);
  for (let i = twoCharacters.length - 1; i > 0; i--) {
    console.log("For loop");
    const j = Math.floor(Math.random() * (i + 1));
    const temp = twoCharacters[i];
    twoCharacters[i] = twoCharacters[j];
    twoCharacters[j] = temp;
  }
  // OBS: Å returnere twoCharacters her vil si at steder du ref til funksjonen alltid vil ha
  // resultatet av twoCharacters. Ved å returnere myGlobal vil dette alltid være resultatet av funksjonen
  // return myGlobal
  return twoCharacters;
};

const main = async () => {
  console.log("Main");

  // Hvis du har koden her så blir ikke for-loop trigget da twoCharacters er []
  const shuffledCharactersBefore = shuffleCharacters(twoCharacters);
  console.log(shuffledCharactersBefore); // [] (eller myGlobal)

  await fetchQuotesAndCharacters();

  // Uten å awaite svaret så fortsetter applikasjonen og vi "mister" twoCharacters
  // fetchQuotesAndCharacters();
  // const shuffledCharacters = shuffleCharacters(twoCharacters); // []

  // Hvis du har koden her så har two twoCharacters fått verdier da vi "awaiter" koden over
  const shuffledCharacters = shuffleCharacters(twoCharacters);

  // OBS: Husk at det du setter til en variabel blir resultatet av hva funksjonen returnerer
  console.log(shuffledCharactersBefore); // ex. [ 'u', 'o', 't', 'Q', 'e' ] (eller "myGlobal")
  console.log(shuffledCharacters); // ex. [ 'u', 'o', 't', 'Q', 'e' ] (eller "myGlobal")
  console.log(twoCharacters); // ex. [ 'u', 'o', 't', 'Q', 'e' ]
  console.log("Final");
};

main()
