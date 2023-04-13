console.log('is connected, good to go');
const APIUrl =
	'https://crudcrud.com/api/da905e205899497a85e0ef309e71bcf6/students';
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
	this.delete = async function() {
		console.log('delete from inside constructor', this.id);
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		};
		const postPromise = fetch(`${APIUrl}/${this.id}`, options);
		const result = await postPromise.then((res) => res.json());
		console.log(result);
	}
	this.create = function() {};
	this.edit = function() {};
}

function Mouse(brand, name, color) {
	this.brand = brand;
	this.model = name;
	this.color =  color;
	this.sw = 'round';
	this.rightButton = [];
	this.leftButton = [];

}

function Post(caption, user) {
	this.dp = 'date';
	this.discription = caption;
	this.dataType = 'string';
	this.postedBy = user;
	this.comments = [];
	this.studentId = null;
	this.categoryId = null;
	this.groupId = null;
}

const post = new Post('caption', 'Alenabel');
console.log(post);

const logitech = new Mouse('logitech', 'logitech', 'blue');
console.log(logitech);

const adilet = new Student('Adilet', 'Atambaev', 'adilet@gmail.com');
const aida = new Student('Aida', 'Aitenova', 'aida@gmail.com');
console.log(adilet);
console.log(aida);

// Get all students.
const getStudents = async () => {
	const studentsDataRow = document.getElementById('students-data');
	studentsDataRow.innerHTML = '';
	const promise = fetch(APIUrl);
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
		
		const user = new Student(student.name, student.lastName, student.email,  student._id);

		const editButtonTd = document.createElement('td');
		row.appendChild(editButtonTd);
		const editButton = document.createElement('button');
		editButton.innerText = 'Edit';
		editButtonTd.appendChild(editButton);
		editButton.addEventListener('click', function() {
			console.log('edit user', user)
		});
		const deleteButtonTd = document.createElement('td');
		row.appendChild(deleteButtonTd);

		const deleteButton = document.createElement('button');
		deleteButton.innerText = 'Delete';
		deleteButtonTd.appendChild(deleteButton);
		deleteButton.addEventListener('click', function() {
			console.log('delete user', user);
			user.delete(user._id);
			getStudents();
		})
	})

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
	console.log(inputValues);
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
	getStudents();
	
});

