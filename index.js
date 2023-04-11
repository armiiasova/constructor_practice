console.log('is connected, good to go');
const object = {}; // object literal
// two types of functions
// factory functions.
function createPerson() {
	return {
		name: 'janatbek',
		lastName: 'orozaly',
	};
}
const person = createPerson();
console.log(person);
// constructor functions
//OOP.
function Student(name, lastName, email) {
	this.name = name;
	this.lastName = lastName;
	this.email = email;
	this.goal = 'Front-end Engineer';
	this.prerequisites = [
		'eligible to work',
		'have access to internet',
		'have a computer',
	];
	this.language = 'English';
	this.grade = 0;
	this.githubUrl = '';
	this.linkedinUrl = '';
}
const student = new Student('adilet', '', '');
const anotherStudent = new Student('aida', '', '');
const APIUrl =
	'https://crudcrud.com/api/8b18c355a7894f45b6e87b7b234c31c4/students';
// Get all students.
const getStudents = async () => {
	const studentsListDiv = document.getElementById('students-list');
	const promise = fetch(APIUrl);
	const students = await promise.then((res) => res.json());
	console.log(students);
	// I want to loop my students and create a table to display here. HOMEWORK.
};

// create student.
const createStudentForm = document.getElementById('create-user');
createStudentForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const inputValues = {};
	const formInputs = Array.from(event.target.elements);
	formInputs
		.filter((element) => element.name) // []
		.forEach((element) => {
			// input that has name and value.
			inputValues[element.name] = element.value;
		});
	const student = new Student(
		inputValues.name,
		inputValues.lastName,
		inputValues.email
	);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(student),
	};
	const postPromise = fetch(APIUrl, options);
	const result = await postPromise.then((res) => res.json());
});
