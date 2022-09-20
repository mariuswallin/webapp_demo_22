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

const main_no_error = async () => {
  const list = [..."abcde"];
  try {
    const data = list.map(async (l) => {
      const res1 = await demo2;
      const res2 = await demo3(res1);
      //const res3 = await demo()
      return res1, res2;
    });

    console.log("One data", data);
    const result = await Promise.all(data);
    console.log("One result", result);
  } catch (error) {
    console.log("Error", error);
  }
};

const main_error = async () => {
  const list = [..."abcde"];
  try {
    const data = list.map(async (l) => {
      const res1 = await demo2;
      const res2 = await demo3(res1);
      const res3 = await demo();
      return res1, res2, res3;

      // HVis vi returnerer array her [res1, res2] så får vi arrays med array
      // Skjer fordi vi får en liste med promises, som når vi resolver så er det lister i denne
      // Dette da vi har async i map over
    });
    console.log("Two data", data);
    // Hvis data kaster error og vi ikke resolver de så får vi ikke catchet feilen
    // Må da ha try catch inne i mappen
    // const result = await Promise.all(data);
    // console.log("Two result", result);
  } catch (error) {
    console.log("Error", error);
  }
};

const main_error_catch = async () => {
  const list = [..."abcde"];
  try {
    const data = list.map(async (l) => {
      try {
        const res1 = await demo2;
        const res2 = await demo3(res1);
        const res3 = await demo();
        return res1, res2, res3;
      } catch (error) {
        console.log("ERROR");
      }
      // HVis vi returnerer array her [res1, res2] så får vi arrays med array
      // Skjer fordi vi får en liste med promises, som når vi resolver så er det lister i denne
      // Dette da vi har async i map over
    });
    console.log("Two data", data);
    // Hvis data kaster error og vi ikke resolver de så får vi ikke catchet feilen
    // Må da ha try catch inne i mappen
    // const result = await Promise.all(data);
    // console.log("Two result", result);
  } catch (error) {
    console.log("Error", error);
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
      return res1, res2, res3;
    });

    // Her får en liste med arrays som igjen er promises
    // Som gjør at vi kan løse opp
    console.log("Three Data", data);
    const result = await Promise.all(data);
    console.log("Three result", result);
  } catch (error) {
    console.log("Error", error);
  }
};


const func = async () => {
  for (const value of [..."abc"]) {
    try {
      await demo();
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}

// func()
// main_no_error();
// main_error();
// main_error_catch();
// mainThree();

/**
 * 
 * Selv om vi bruker Promise.resolve() så vil den først faile når alle promiser kommer tilbake
 * Så om 5 api kall går igjennom, men 1 ikke går så catcher vi feilen, men det vil si at f.eks 5 artikler har blit laget
 * Må da alternativt ha en "opprydding" som sletter det vi laget om vi ønsker at alt skal gå igjennom
 * 
 */

/**
 * Obs. Når vi try/catch inne i en .map så må vi returnere feilen og ikke throw videre om resultatet av mappen ikke blir resolved seinere
 * 
 * 
 */

/**
 * https://hackernoon.com/changing-asyncawait-to-promisesall-to-speed-up-api-calls-in-nodejs
 * https://dev.to/raviojha/javascript-making-multiple-api-calls-the-right-way-2b29
 * 
 */