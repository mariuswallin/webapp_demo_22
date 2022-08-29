const prompt = require('prompt-sync')()

// Lager et objekt for å holde på konverteringsratene
const rates = {
  dkk: 1.34,
  eur: 10,
  usd: 8,
};

// Lager et objekt for å holde på oversettelsene
// Gjør det mulig å "slå opp" i denne når vi har valgt et språk
const translations = {
  no: {
    welcomeMessage: "Norsk (no)",
    valueMessage: "Hvilken verdi skal du skal konvertere? ",
    currencies: {
      usd: "Amerikanske dollar",
      eur: "Euro",
      dkk: "Danske kroner",
    },
  },
  en: {
    welcomeMessage: "English (en)",
    valueMessage: "What value to convert? ",
    currencies: {
      usd: "American dollar",
      eur: "Euro",
      dkk: "Danish krone",
    },
  },
};

// Bruker translations objektet til å lage en velkomstbeskjed
function getWelcomeMessage(translations) {
  let message = "";
  for (const language of Object.values(translations)) {
    message += `${language["welcomeMessage"]} `;
  }
  return message;
}

// Henter ut meldingen som skal vises når vi skal skrive inn en verdi (no eller en)
function getValueMessage(translation) {
  return translation["valueMessage"];
}

// Gjennomførerer konverteringen og runder av til 2 desimaler
function handleConvertion(rate, value, decimals = 2) {
  return Number(Number(value) / Number(rate)).toFixed(decimals);
}

// Lager beskjeden som omhandler valg av valuta
function getCurrencyMessage(currencies) {
  let message = "";

  // Henter ut nøkkelen og verdiene til i translations[language].currencies
  // Bruker det til å lage "Velg valuta tekststrengen"
  for (const entry of Object.entries(currencies)) {
    // For hver iterasjon får vi eks. ['dkk', 'Danish krone']
    // Deconstructer ut verdiene slik at short blir 'dkk' og long blir 'Danish krone'
    const [short, long] = entry;
    message += `${long}(${short}) `;
  }

  return message;
}

// Kobler alt sammen
function start(translations, rates) {
  // Setter språk
  const language = prompt(getWelcomeMessage(translations));
  // Henter ut oversettelsene til språket som ble valgt
  const translation = translations[language];
  // Henter ut oversettelsene for currencies for gitt språk
  const currencies = translation["currencies"];
  // Henter ut valueMessage for gitt språk
  const valueMessage = getValueMessage(translation);
  // Promter om å sette en verdi
  const value = prompt(valueMessage);
  // Lager currencyMessage for et gitt språk
  const currencyMessage = getCurrencyMessage(currencies);
  const currency = prompt(currencyMessage);
  // Returnerer resultatet av konverteringen
  return handleConvertion(rates[currency], value);
}

const result = start(translations, rates);

console.log(result);
