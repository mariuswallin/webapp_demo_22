setTimeout(() => {
  console.log("Start")
}, 0)

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
    resolve(students.find(student => student.id === id));
  });
};

// Hva skjer når vi bruker denne?
// Hvis en fetch request tar lang tid så må vi vente
const findStudentByIdLong = (id, students) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Student long")
      resolve(students.find((student) => student.id === id));
    }, 3000)
  });
};

// Gir oss en Promise Promise { [ { id: 1, name: 'Lars' }, { id: 2, name: 'Marie' } ] }
// studentsInPromise[0] => undefined da promisen ikke er "løst"
// const studentsInPromise = getStudents();
// console.log(studentsInPromise[0]);


const mainPromises = () => {
  let resolvedStudents = [];
  const studentPromise = getStudents().then((data) => (resolvedStudents = data));
  const students = getStudents()
    .then((students) => findStudentById(1, students))
    .then(student => console.log("Chained promise",student));

  // resolvedStudents => [] dette fordi promisen over ikke er "løst" når denne linjen leses
  console.log("ResolvedStudents", resolvedStudents);
}

const mainAsync = async () => {
  const students = await getStudents();
  const lars = await findStudentByIdLong(1, students);
  // Gir oss listen med studenter
  console.log("Async students", students);
  // Gir oss studenten
  console.log("Async student", lars)
}

/*
  Rekkefølgen blir som under.
  Promises får en egen kø og "foretrekkes" fremfor setTimeout.
  Legg merke til at async funksjonene resolves først. Dette da vi stopper opp
  når vi finner en await for å håndtere denne. Deretter blir alt annet som ligger
  i køen kjørt.

  ResolvedStudents []
  End
  Async students [ { id: 1, name: 'Lars' }, { id: 2, name: 'Marie' } ]
  Async student { id: 1, name: 'Lars' }
  Chained promise { id: 1, name: 'Lars' }
  Start
*/

mainPromises()
mainAsync()

console.log("End")
