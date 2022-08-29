const prompt = require('prompt-sync')()

const rates = {
  dkk: 1.34,
  eur: 10,
  usd: 8,
};

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

function getWelcomeMessage(translations) {
  let message = "";
  for (const language of Object.values(translations)) {
    message += `${language["welcomeMessage"]} `;
  }
  return message;
}

function getValueMessage(translation) {
  return translation["valueMessage"];
}

function handleConvertion(rate, value, decimals = 2) {
  return Number(Number(value) / Number(rate)).toFixed(decimals);
}

function getCurrencyMessage(currencies) {
  let message = "";

  for (const entry of Object.entries(currencies)) {
    const [short, long] = entry;
    message += `${long}(${short}) `;
  }

  return message;
}

function start(translations, rates) {
  const language = prompt(getWelcomeMessage(translations));
  const translation = translations[language];
  const currencies = translation["currencies"];
  const valueMessage = getValueMessage(translation);
  const value = prompt(valueMessage);
  const currencyMessage = getCurrencyMessage(currencies);
  const currency = prompt(currencyMessage);
  return handleConvertion(rates[currency], value);
}

const result = start(translations, rates);

console.log(result);
