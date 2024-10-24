const badGuys = [];

const students = [];

// Render to DOM function
const renderToDOM = (divId, HTMLtoRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = HTMLtoRender;
};

const formOnDom = () => {
  let formHTML = `<div class="sortForm">
      <form id="selectForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input type="text" class="form-control" id="studentName" placeholder="Enter Student Name">
        </div>
        <button type="submit" class="btn btn-primary" id="sort">Sort</button>
      </form>
    </div>`
  renderToDOM("#sortForm", formHTML)
}

const cardsOnDom = (array) => {
  let stringDom = ""
  // TODO: Make this NOT using a for loop
  for (const item of array) {
    stringDom += `<div class="card students">
    <h5 class="card-title">${item.name}</h5>
    <div class="card-body">
      <p class="card-text ${item.house}">${item.house}</p>
      </div>
      <button type="button" class="btn btn-danger" id="expel--${item.id}">Expel</button>
    </div>`;
  }
  
    renderToDOM(".cards", stringDom);
    // renderToDOM(".cards-header", `<h5>Dumbledore's Army</h5>`)
}

// Adding functionality to registration button
const register = document.querySelector("#register");
register.addEventListener('click', formOnDom);





// Sort into random house function

const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']

const randomArrayElement = (arr) => {
  return arr[(Math.floor(Math.random() * arr.length))];
}

const sortIntoHouse = () => {
  return randomArrayElement(houses);
}


// Create event listener for form submit button
const form = document.querySelector("#sortForm");
const createStudent = (e) => {
  e.preventDefault();
  if (!document.querySelector("#studentName").value) {
    renderToDOM("#error-msg", `<h3 class="error-msg">Error, enter a name to to continue</h3>`)
  } else {
    renderToDOM("#error-msg", ``)
    const newStudentObj = {
      id: students.length + 1,
      name: document.querySelector("#studentName").value,
      house: sortIntoHouse()
    }
    students.push(newStudentObj);
    cardsOnDom(students);
    form.reset();
    const header = document.querySelector(".cards-header");
    header.innerHTML=`<p>First Years</p><p>Followers of Voldemort</p>`
  }
  
}

form.addEventListener("submit", createStudent);

// Add event listener for Expel button
// Delete the object for the button that was clicked from the students array
// Add the same object to the badGuys array
const app = document.querySelector(".cards");
const expelStudent = () => {
  app.addEventListener('click', (e) => {
    if (e.target.id.includes("expel")) {
      const [, id] = e.target.id.split("--");
      const index = students.findIndex(student => student.id === Number(id));
      const elementToMove = students.splice(index, 1)[0];
      badGuys.push(elementToMove);
      cardsOnDom(students);
      badsOnDom(badGuys);
      
    }
  })
}

expelStudent();


const badsOnDom = (array) => {
  let badDom = ""
  // TODO: Make this NOT using a for loop
  for (const item of array) {
    badDom += `<div class="card students">
    <h5 class="card-title">${item.name}</h5>
    <div class="card-body">
      <p class="card-text ${item.house}">${item.house}</p>
      </div>
      <button type="button" class="btn btn-danger reinstate" id="reinstate--${item.id}">Reinstate</button>
    </div>`;
  }
  
    renderToDOM(".badguys", badDom);
    // renderToDOM(".cards-header", `<h5>Dumbledore's Army</h5>`)
}

const allcards = document.querySelector(".badguys")
const reinstateStudent = () => {
  allcards.addEventListener('click', (e) => {
    if (e.target.id.includes("reinstate")) {
      const [, id] = e.target.id.split("--");
      const index = badGuys.findIndex(student => student.id === Number(id));
      const elementToMove = badGuys.splice(index, 1)[0];
      students.push(elementToMove);
      cardsOnDom(students);
      badsOnDom(badGuys);
      
    }
  })
}

reinstateStudent();
