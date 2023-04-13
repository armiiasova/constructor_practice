console.log('is connected, good to go');
// const myApiUrl =
// 	'https://crudcrud.com/api/39217771911e49d1aa4acf1da60dabb7/students';
const myApiUrl = 'placeYourUrlFromCrudCrud.com';
// constructor functions

function Student(name, lastName, email, id) {
	this.id = id ? id : null;
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
	this.delete = async function () {
		console.log('delete from inside constructor', this.id);
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		};
		const postPromise = fetch(`${myApiUrl}/${this.id}`, options);
		const result = await postPromise.then((res) => res.json());
		console.log(result);
	};
	this.create = async function () {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(this),
		};
		const postPromise = fetch(myApiUrl, options);
		const result = await postPromise.then((res) => res.json());
		return result;
	};
}

// Get all students.
const getStudents = async () => {
	const studentsDataRow = document.getElementById('students-data');
	studentsDataRow.innerHTML = '';
	const promise = fetch(myApiUrl);
	const students = await promise.then((res) => res.json());

	students.forEach((student) => {
		const row = document.createElement('tr');
		studentsDataRow.appendChild(row);
		// td - cell
		// STUDENT ID
		const idTd = document.createElement('td');
		idTd.innerHTML = student._id;
		row.appendChild(idTd);

		const nameTd = document.createElement('td');
		nameTd.innerHTML = student.name;
		row.appendChild(nameTd);

		const lastNameTD = document.createElement('td');
		lastNameTD.innerHTML = student.lastName;
		row.appendChild(lastNameTD);

		const emailTD = document.createElement('td');
		emailTD.innerHTML = student.email;
		row.appendChild(emailTD);

		const user = new Student(
			student.name,
			student.lastName,
			student.email,
			student._id
		);

		const editButtonTd = document.createElement('td');
		row.appendChild(editButtonTd);
		const editButton = document.createElement('button');
		editButton.innerText = 'Edit';
		editButtonTd.appendChild(editButton);
		editButton.addEventListener('click', function () {
			console.log('edit user', user);
			user.edit();
		});
		const deleteButtonTd = document.createElement('td');
		row.appendChild(deleteButtonTd);

		const deleteButton = document.createElement('button');
		deleteButton.innerText = 'Delete';
		deleteButtonTd.appendChild(deleteButton);
		deleteButton.addEventListener('click', function () {
			console.log('delete user', user);
			user.delete(user._id);
			getStudents();
		});
	});
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
	await student.create();
	getStudents();
});
