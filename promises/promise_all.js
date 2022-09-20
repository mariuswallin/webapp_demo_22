const demo = () =>
  new Promise((resolve, reject) => {
    reject("Error Demo 1");
  });

const demo2 = new Promise((resolve, reject) => {
  resolve("Demo 2");
});

const demo3 = (id) =>
  new Promise((resolve, reject) => {
    if (id) {
      resolve(`${id} - Demo 3`);
    }
    resolve("Demo 3");
  });

const mainZero = async () => {
  const list = [..."abc"];
  try {
    const data = list.map(async (l) => {
      const res1 = await demo2;
      const res2 = await demo3(res1);
      //const res3 = await demo()
      return res1, res2;
    });

    console.log("Zero Data", data);
    const result = await Promise.all(data);
    console.log("Zero Result", result);
  } catch (error) {
    console.log("Zero Error", error);
  }
};

const mainOne = async () => {
  const list = [..."abc"];
  try {
    const data = list.map(async (l) => {
      const res1 = await demo2;
      const res2 = await demo3(res1);
      const res3 = await demo();
      return res1, res2, res3;
    });
    console.log("One Data", data);
    // Hvis noe i data kaster error og vi ikke resolver den med Promise.all får vi ikke catchet feilen
    // Må da ha try catch inne i .map()
    const result = await Promise.all(data);
    console.log("One Result", result);
  } catch (error) {
    console.log("One Error", error);
  }
};

const mainTwo = async () => {
  const list = [..."abcde"];
  try {
    const data = list.map(async (l) => {
      try {
        const res1 = await demo2;
        const res2 = await demo3(res1);
        const res3 = await demo();
        // Hvis vi returnerer array her [res1, res2] får vi arrays med array som resultat.
        // Dette fordi vi får en liste med promises tilbake fra map.
        // Når vi resolver verdiene i listen får vi tilgang til [res1, res2]
        // Dette skjer da vi har async i map over, som gjør at .map gir promises tilbake
        return res1, res2, res3;
      } catch (error) {
        console.log("Two Inner Error");
      }
    });
    console.log("Two Data", data);
    // Hvis noe i data kaster error og vi ikke resolver den med Promise.all får vi ikke catchet feilen
    // Må da ha try catch inne i .map()
    const result = await Promise.all(data);
    console.log("Two Result", result);
  } catch (error) {
    console.log("Two Error", error);
  }
};

const mainThree = async () => {
  const list = [..."abcde"];
  try {
    // Hvis vi ikke returnerer res3 som catcher så får vi ikke håndtert "error"
    const data = list.flatMap((l) => {
      const res1 = demo2;
      const res2 = demo3();
      const res3 = demo();
      // Her kunne vi hatt [res1, res2, res3] 
      // Da vi ikke bruker async får vi en liste med promises
      // Ikke en liste med promises som igjen inneholder arrays
      // Det gjør at vi kan løse opp verdiene
      return res1, res2, res3;
    });
    console.log("Three Data", data);
    const result = await Promise.all(data);
    console.log("Three Result", result);
  } catch (error) {
    console.log("Three Error", error);
  }
};


const mainFour = async () => {
  for (const value of [..."abc"]) {
    try {
      await demo();
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}

// mainZero();
// mainOne();
// mainTwo();
// mainThree();
// mainFour()

/**
 * 
 * Selv om vi bruker Promise.resolve() så vil den først faile når alle promiser kommer tilbake
 * Så om 5 api kall går igjennom, men 1 ikke går så catcher vi feilen, men det vil si at f.eks 5 har blitt laget
 * Må da ha en "opprydding" som sletter det vi laget om vi ønsker at alt eller ingen ting skal gå igjennom
 * 
 */

/**
 * Obs. Når vi bruker try/catch inne i en .map må vi returnere feilen og ikke kaste feilen videre. Dette gjelder om resultatet av mappen ikke blir resolved seinere med Promise.all().
 * 
 */

/**
 * 
 * Noen fine artikler
 * 
 * https://hackernoon.com/changing-asyncawait-to-promisesall-to-speed-up-api-calls-in-nodejs
 * https://dev.to/raviojha/javascript-making-multiple-api-calls-the-right-way-2b29
 * 
 */