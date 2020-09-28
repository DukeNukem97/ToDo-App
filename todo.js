window.setInterval(theTime, 1000);
window.setInterval(theDate, 1000);
function theDate() {
  const today = document.querySelector(".date");

  const date = new Date();
  const day = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  today.innerText = day + ", " + month + " " + year;
}
function theTime() {
  const time = document.querySelector(".time");
  const date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  let suf;
  if (hours > 11) suf = "pm";
  else suf = "am";
  if (hours > 12) hours = Math.abs(hours - 12);
  if (mins < 10) mins = "0" + mins;
  if (hours < 10) hours = "0" + hours;
  if (secs < 10) secs = "0" + secs;
  time.innerText = hours + " : " + mins + " : " + secs + " " + suf;
}

function inputValid() {
  let input = document.querySelector("#todo");
  let btn = document.querySelector("#add-btn");
  let checkInput = input.value.trim();
  if (checkInput.length > 0) btn.style.pointerEvents = "auto";
  else btn.style.pointerEvents = "none";
}
document.addEventListener("DOMContentLoaded", getFromStorage);
const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", addTodo);

function addTodo(add) {
  add.preventDefault();
  const input = document.querySelector("#todo");
  const thetodo = document.querySelector("#todos");
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("the-todo");

  const todoList = document.createElement("li");
  todoList.classList.add("todo-name");
  todoList.innerText = input.value;
  todoContainer.appendChild(todoList);

  inputStorage(input.value);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.innerHTML = '<i class="fas fa-check fa-lg"></i>';
  todoContainer.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
  todoContainer.appendChild(deleteBtn);

  thetodo.appendChild(todoContainer);

  input.value = "";
  inputValid();
}

const theButton = document.querySelector("#todos");
theButton.addEventListener("click", doIt);

function doIt(event) {
  const complete = event.target;
  if (complete.classList[0] === "complete-btn") {
    const completed = complete.parentElement;
    completed.classList.toggle("completed");
    const toComplete = completed.childNodes[0].innerText;
    if (completed.classList.contains("completed")) {
      completeLocal(toComplete);
    } else {
      completeLocalDelete(toComplete);
    }
  }

  if (complete.classList[0] === "delete-btn") {
    const completed = complete.parentElement;
    const toDelete = completed.childNodes[0].innerText;
    completed.classList.add("deleted");
    deleteFromLocal(toDelete);
    completed.addEventListener("transitionend", function () {
      completed.remove();
    });
  }
}

const filters = document.querySelector("#filter");
filter.addEventListener("change", filtering);

function filtering(event) {
  const filter = event.target.value;
  const todoIterate = document.querySelector("#todos");
  todoIterate.childNodes.forEach(function (e) {
    switch (filter) {
      case "all":
        e.style.display = "flex";
        break;
      case "completed":
        if (e.classList.contains("completed")) e.style.display = "flex";
        else e.style.display = "none";
        break;
      case "uncompleted":
        if (!e.classList.contains("completed")) e.style.display = "flex";
        else e.style.display = "none";
        break;
    }
  });
}

function inputStorage(name) {
  let todo;
  if (localStorage.getItem("todo") == null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("todo"));
  }
  todo.push(name);
  localStorage.setItem("todo", JSON.stringify(todo));
}

function getFromStorage() {
  let todo;
  if (localStorage.getItem("todo") == null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("todo"));
  }
  todo.forEach(function (local) {
    const input = document.querySelector("#todo");
    const thetodo = document.querySelector("#todos");
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("the-todo");

    let complete;
    if (localStorage.getItem("complete") == null) {
      complete = [];
    } else {
      complete = JSON.parse(localStorage.getItem("complete"));
    }
    let flag = 0;
    complete.forEach(function (val) {
      if (val === local) {
        flag = 1;
      }
    });

    if (flag == 1) {
      todoContainer.classList.add("complete");
      todoContainer.classList.add("completed");
    } else {
      todoContainer.classList.remove("complete");
      todoContainer.classList.remove("completed");
    }

    const todoList = document.createElement("li");
    todoList.classList.add("todo-name");
    todoList.innerText = local;
    todoContainer.appendChild(todoList);

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = '<i class="fas fa-check fa-lg"></i>';
    todoContainer.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';
    todoContainer.appendChild(deleteBtn);

    thetodo.appendChild(todoContainer);
  });
}

function deleteFromLocal(name) {
  let todo;
  if (localStorage.getItem("todo") == null) {
    todo = [];
  } else {
    todo = JSON.parse(localStorage.getItem("todo"));
  }
  let index = todo.indexOf(name);
  todo.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo));

  let complete;
  if (localStorage.getItem("complete") == null) {
    complete = [];
  } else {
    complete = JSON.parse(localStorage.getItem("complete"));
  }
  let flag = 0;
  complete.forEach(function (e) {
    if (e === name) flag = 1;
  });
  if (flag == 1) {
    complete.splice(complete.indexOf(name), 1);
    localStorage.setItem("complete", JSON.stringify(complete));
  }
}

function completeLocal(name) {
  let complete;
  if (localStorage.getItem("complete") == null) {
    complete = [];
  } else {
    complete = JSON.parse(localStorage.getItem("complete"));
  }
  complete.push(name);
  localStorage.setItem("complete", JSON.stringify(complete));
}

function completeLocalDelete(name) {
  let complete;
  if (localStorage.getItem("complete") == null) {
    complete = [];
  } else {
    complete = JSON.parse(localStorage.getItem("complete"));
  }
  complete.splice(complete.indexOf(name), 1);
  localStorage.setItem("complete", JSON.stringify(complete));
}
