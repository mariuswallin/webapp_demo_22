const fakePromise = (valid) =>
  new Promise((resolve, reject) => {
    if (valid) {
      console.log("Before timeout");
      setTimeout(() => {
        console.log("In timeout");
        resolve("success");
      }, 0);
    } else {
      reject("fail");
    }
  });

console.log("Start");

const handleThis = async () => {
  console.log("Before await");
  const resolved = await fakePromise(true);
  console.log("After await");
  console.log("Resolved:", resolved);
};

// handleThis();
// console.log("End");

// Ved å ha koden slik blir den synkron. 
// Alt inne i main blir kjørt i rekkefølge

// const main = async () => {
//   await handleThis();
//   console.log("End");
// }

// main()

/**

  Rekkefølgen blir
  - Start
  - Before await
  - Before timeout
  - End
  - In timeout
  - After await
  - Resolved: success

  Årsaken til dette er at vi kaller handleThis
  handleThis er en async funksjon som blir kalt umiddelbart
  Linjene i funksjonen leses 1 etter 1
  Når den kommer til linje 18 leses "fakePromise" funksjonen sitt innhold
  Deretter fanges det opp at dette er en funksjon vi må "await"
  All koden som må awaites legges til en ny "kø"
  Deretter leses annen kode som ikke er en del av denne funksjonen sitt "scope", altså "end"
  Vi får deretter resultatet av promisen
 */
