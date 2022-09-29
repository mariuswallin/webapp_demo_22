const api = async () => {
  return await promise("Value", false);
};

const obj = {
  name: "Name",
  async options() {
    return [
      {
        id: 1,
        value: "My value",
      },
      {
        id: 1,
        value: await promise('Value from option'),
      },
    ];
  },
};

const objTwo = {
  name: "Name",
  async options() {
    try {
      return [
        {
          id: 1,
          value: "My value",
        },
        {
          id: 1,
          value: await api(),
        },
      ];
    } catch (error) {
      console.log("ERR", error);
      throw new Error(error);
    }
  },
};

const promise = (value, resolved = true) =>
  new Promise((resolve, reject) => {
    if (resolved) {
      resolve([value]);
    } else {
      reject("REJECTED");
    }
  });

const anotherPromise = (value, resolved = true) =>
  new Promise((resolve, reject) => {
    if (resolved) {
      resolve([value]);
    } else {
      reject("REJECTED");
    }
  });

const promises = [promise(obj), anotherPromise(objTwo)];

const handler = async () => {
  const result = await Promise.all(
    promises.map((promise) =>
      promise.then((x) =>
        Promise.all(
          x.map(async (e) => {
            return {
              name: typeof e.name === "function" ? await e.name() : e.name,
              options:
                typeof e.options === "function"
                  ? await e.options()
                  : e.options,
            };
          })
        )
      )
    )
  );
  console.log(result);
};

handler();
