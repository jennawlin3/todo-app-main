// Theme
const iconThemeBtn = document.querySelector(".icon-theme_container");
const moonIcon = document.querySelector(".moon");
const sunIcon = document.querySelector(".sun");
const darkItems = document.querySelectorAll(".dark");
const lightItems = document.querySelectorAll(".light");

const toDos = {};

// To do items
const todos = document.querySelector(".todos");
const deleteAllBtn = document.querySelector(".delete-all_btn");
const optionsTodo = document.querySelectorAll(".options");
const inputTodo = document.querySelector(".input");
const circleInput = document.querySelector(".circle-input");
const todoFooter = document.querySelector(".todo-container_footer");
const itemNumber = document.querySelector(".item-number");

let inputValue;
let count = 1;

// Change theme

iconThemeBtn.addEventListener("click", e => {
    console.log("click");
    if(lightItems) {
        moonIcon.classList.toggle("hide");
        sunIcon.classList.toggle("hide");

        for(let i = 0; i < lightItems.length; i++) {
            lightItems[i].classList.toggle("light");
            lightItems[i].classList.toggle("dark");
        }
        return
    } 
    if(darkItems) {
        moonIcon.classList.toggle("hide");
        sunIcon.classList.toggle("hide");

    for(let i = 0; i < darkItems.length; i++) {
        darkItems[i].classList.toggle("light");
        darkItems[i].classList.toggle("dark");
    }    
    }
});

inputTodo.addEventListener("input", e => {
    if(e) {
        inputValue = e.target.value;
    }
})

circleInput.addEventListener("click", e => {
    if(e) {
        AddToDo(inputValue);
    }
});

function AddToDo(inputValue) {
    if(inputTodo.value === "") {
        return;
    }
    
    const todoItem = document.createElement("div");
    todoItem.setAttribute("id", `todo-${count}`);
    // ToDo Info
    todoItem.classList.add("todo-item");
    const todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");
    const circleCheckbox = document.createElement("span");
    circleCheckbox.classList.add("circle-checkbox");
    circleCheckbox.setAttribute("data-id", count);
    const checkIcon = document.createElement("img");
    checkIcon.classList.add("check-icon");
    checkIcon.setAttribute("src", "./images/icon-check.svg");
    checkIcon.classList.add("hide");
    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = inputValue;
    todoTitle.setAttribute("data-id", count);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn_container");
    const crossIcon = document.createElement("img");
    crossIcon.classList.add("hide");
    crossIcon.classList.add("delete-btn");
    crossIcon.setAttribute("src", "./images/icon-cross.svg");
    
    if(inputTodo.classList.contains("light")) {
        todoItem.classList.add("light");
        todoInfo.classList.add("light");
        circleCheckbox.classList.add("light");
        todoTitle.classList.add("light");
    }

    if(inputTodo.classList.contains("dark")) {
        todoItem.classList.add("dark");
        todoInfo.classList.add("dark");
        circleCheckbox.classList.add("dark");
        todoTitle.classList.add("dark");       
    }

    circleCheckbox.appendChild(checkIcon);
    todoInfo.appendChild(circleCheckbox);
    todoInfo.appendChild(todoTitle);

    deleteBtn.appendChild(crossIcon);

    todoItem.appendChild(todoInfo);
    todoItem.appendChild(deleteBtn);

    todos.prepend(todoItem)

    count++;
    inputTodo.value = "";

    //Element
    const title = document.querySelector(".todo-title");
    console.log(title);

    addFunctionalityToDo();
    todoJSON(title);
}

function addFunctionalityToDo() {
    const todoItem = document.querySelectorAll(".todo-item");
    const todoTitle = document.querySelectorAll(".todo-title");
    const numberTodos = document.querySelector(".item-number");
    const circleCheckbox = document.querySelectorAll(".circle-checkbox");
    const checkIcon = document.querySelectorAll(".check-icon");

    circleCheckbox.forEach((checkbox, i) => {
        checkbox.addEventListener("click", e => {
            let idTodo = e.target.getAttribute("data-id");
            if(e) {
                updateStatus(idTodo);

                //console.log(idTodo);
                //console.log("click");
            }
        })
    });

    numberTodos.textContent = count-1;
}

function updateStatus(idTodo) {
    const todoItem = document.querySelectorAll(".todo-item");
    const todoTitle = document.querySelectorAll(".todo-title");
    const numberTodos = document.querySelector(".item-number");
    const circleCheckbox = document.querySelectorAll(".circle-checkbox");
    let id = Number(idTodo);
    let idCont; 

    todoItem.forEach((item, index) => {
        if(item.getAttribute("data-id") === String(id)) {
            idCont = Number(index);
            return;
        }
    });

    if(todoTitle[idCont].classList.contains("completed")) {
        todoTitle[Number(idCont)].classList.remove("completed");
        circleCheckbox[Number(idCont)].classList.remove("completed");
        return;             
    }    

    if(!todoTitle[idCont].classList.contains("completed")) {
    todoTitle[Number(idCont)].classList.add("completed");
    circleCheckbox[Number(idCont)].classList.add("completed");
        return;        
    }
}

function todoJSON(title) {
    console.log(title);

    let titleTodo = title.textContent;
    let statusTodo = "active";
    let id = title.getAttribute("data-id");

    const objectJSON = {
        title: titleTodo,
        status: statusTodo,
        id: id,
    }    

    toDos[count-1] = objectJSON;

    localStorage.setItem(`${count-1}`, JSON.stringify(objectJSON));
}

function getTodos() {
    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;

    entries.forEach((entry, i) => {
        valuesToDo = JSON.parse(entry[1]);
        //console.log(valuesToDo);
        count = Number(valuesToDo.id)+1;


        const todoItem = document.createElement("div");
        todoItem.setAttribute("id", `todo-${valuesToDo.id}`);
        todoItem.setAttribute("data-id", valuesToDo.id);
        // ToDo Info
        todoItem.classList.add("todo-item");
        const todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");
        const circleCheckbox = document.createElement("span");
        circleCheckbox.classList.add("circle-checkbox");
        circleCheckbox.setAttribute("data-id", valuesToDo.id);
        //const checkIcon = document.createElement("img");
        //checkIcon.classList.add("check-icon");
        //checkIcon.setAttribute("src", "./images/icon-check.svg");
        //checkIcon.classList.add("hide");
        const todoTitle = document.createElement("p");
        todoTitle.classList.add("todo-title");
        todoTitle.classList.add(valuesToDo.status);
        todoTitle.textContent = valuesToDo.title;
        todoTitle.setAttribute("data-id", valuesToDo.id);
    
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn_container");
        const crossIcon = document.createElement("img");
        crossIcon.classList.add("hide");
        crossIcon.classList.add("delete-btn");
        crossIcon.setAttribute("src", "./images/icon-cross.svg");
        
        if(inputTodo.classList.contains("light")) {
            todoItem.classList.add("light");
            todoInfo.classList.add("light");
            circleCheckbox.classList.add("light");
            todoTitle.classList.add("light");
        }
    
        if(inputTodo.classList.contains("dark")) {
            todoItem.classList.add("dark");
            todoInfo.classList.add("dark");
            circleCheckbox.classList.add("dark");
            todoTitle.classList.add("dark");       
        }
    
        //circleCheckbox.appendChild(checkIcon);
        todoInfo.appendChild(circleCheckbox);
        todoInfo.appendChild(todoTitle);
    
        deleteBtn.appendChild(crossIcon);
    
        todoItem.appendChild(todoInfo);
        todoItem.appendChild(deleteBtn);
    
        todos.prepend(todoItem)

        addFunctionalityToDo();
    });
}

deleteAllBtn.addEventListener("click", e => {
    if (e) {
        localStorage.clear();

        const todoItem = document.querySelectorAll(".todo-item");

        todoItem.forEach(item => {
            todos.removeChild(item);
        });

        count = 0;

        itemNumber.textContent = count;
        count++;
    }
})

document.addEventListener("DOMContentLoaded", getTodos());
/*
<div class="todo-item light">
<div class="todo-info light">
  <span class="circle-checkbox light"></span>
<p class="todo-title light completed">Jog around the park 3x</p>          
</div>
<button><img src="./images/icon-cross.svg" alt="delete-icon" srcset="" class="hide delete-btn"></button>
</div>
*/
/*

*/