const getStudents = () => {
  return new Promise((resolve, reject) => {
    resolve([
      { id: 1, name: "Lars" },
      { id: 2, name: "Marie" },
    ]);
  })
}

const findStudentById = (id, students) => {
  return new Promise((resolve, reject) => {
    const student = students.find((student) => student.id === id);
    if (!student) reject("Error: Student not found");
    resolve(student);
  });
};

// Hva hvis noe går feil?
const mainPromisesRejectNothandled = () => {
  const student = getStudents()
    .then((students) => findStudentById(3, students))
    .then(student => student)

  console.log(student)
  return student
};

const mainPromisesReject = () => {
  const students = getStudents()
    .then((students) => findStudentById(3, students))
    .catch((err) => console.log("Student Reject", err));
};


// Må håndtere UnhandledPromiseRejection
const mainAsyncRejectNotHandled = async () => {
  const students = await getStudents();
  const student = await findStudentById(3, students);
  return student
}

// Bruker try / catch
const mainAsyncRejectHandled = async () => {
  try {
    const students = await getStudents();
    const student = await findStudentById(3, students);
    return student;
  } catch (error) {
    // Enten må vi kaste feilen videre så den håndteres høyere opp
    // Eller løse den her (da vet ikke andre om at den "feilet")
    // throw error
    return error
  }
}

// Må håndtere rejection
const mainAsyncRejectPromiseNotHandled = async () => {
  // Student kan være en feil eller en student avhengig av hva vi gjør mainAsyncRejectHandled
  const student = await mainAsyncRejectHandled();
  console.log(student);
}

mainPromisesRejectNothandled()
mainPromisesReject()
mainAsyncRejectNotHandled();
mainAsyncRejectPromiseNotHandled()