console.log('is connected, good to go');
const object = {}; // object literal
// two types of functions
// factory functions.
function createPerson() {
    return {
        name: 'janatbek',
        lastName: 'orozaly'
    }
}
const person = createPerson();
console.log(person);
// constructor functions

function Student(name, lastName, email) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.goal = 'Front-end Engineer';
    this.prerequisites = ['eligible to work', 'have access to internet', 'have a computer'];
    this.language = 'English';
    this.grade = 0;
    this.githubUrl = '';
    this.linkedinUrl = '';
}
const adilet = new Student('Adilet', 'Atambaev', 'adilet@gmail.com');
const aida = new Student('Aida', 'Aitenova', 'aida@gmail.com');
console.log(adilet);
console.log(aida);