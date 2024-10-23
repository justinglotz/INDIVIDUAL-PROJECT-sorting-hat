const students = [
  // {
  //   id: 1,
  //   name: "Ron Weasley", 
  //   house: "Slytherin",
  // },
  // {
  //   id: 2,
  //   name: "Harry Potter",
  //   house: "Gryffindor",
  // },
  // {
  //   id: 3,
  //   name: "Hermione Grainger",
  //   house: "Gryffindor",
  // },
  // {
  //   id: 4,
  //   name: "Draco Malfoy",
  //   house: "Slytherin",
  // },
  // {
  //   id: 5,
  //   name: "Ron Weasley", 
  //   house: "Slytherin",
  // },
  // {
  //   id: 6,
  //   name: "Harry Potter",
  //   house: "Gryffindor",
  // },
  // {
  //   id: 7,
  //   name: "Hermione Grainger",
  //   house: "Gryffindor",
  // },
  // {
  //   id: 8,
  //   name: "Draco Malfoy",
  //   house: "Slytherin",
  // }

];

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
      <button type="button" class="btn btn-danger" id="delete--${item.id}">Expel</button>
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
    renderToDOM(".header", `<h3>Error, enter a name to to continue</h3>`)
  } else {
    const newStudentObj = {
      id: students.length + 1,
      name: document.querySelector("#studentName").value,
      house: sortIntoHouse()
    }
    students.push(newStudentObj);
    cardsOnDom(students);
    form.reset();
  }
  
}

form.addEventListener("submit", createStudent);
