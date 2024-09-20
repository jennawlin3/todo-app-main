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
let completedArray = [];
let activeArray = [];

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

// Input functionality
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

// Create new To Do
function AddToDo(inputValue) {
    if(inputTodo.value === "") {
        return;
    }
    
    const todoItem = document.createElement("div");
    todoItem.setAttribute("id", `todo-${count}`);
    todoItem.setAttribute("data-id", count);
    // ToDo Info
    todoItem.classList.add("todo-item");
    const todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");
    const circleCheckbox = document.createElement("button");
    circleCheckbox.classList.add("circle-checkbox");
    circleCheckbox.classList.add("active");
    circleCheckbox.setAttribute("data-id", count);
    const completedCheckbox = document.createElement("button");
    completedCheckbox.classList.add("completed");
    completedCheckbox.classList.add("hide");
    completedCheckbox.setAttribute("data-id", count);
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

    todoInfo.appendChild(circleCheckbox);
    todoInfo.appendChild(completedCheckbox);
    todoInfo.appendChild(todoTitle);

    deleteBtn.appendChild(crossIcon);

    todoItem.appendChild(todoInfo);
    todoItem.appendChild(deleteBtn);

    todos.prepend(todoItem)

    count++;
    inputTodo.value = "";

    //Element
    const title = document.querySelector(".todo-title");

     const activeBtn = document.querySelectorAll("button.active");
     const completedBtn = document.querySelectorAll("button.completed");
     activeArray = [];
     completedArray = [];

    activeBtn.forEach(item => {
        if(!item.classList.contains("hide")) {
            let contID = item.getAttribute("data-id");
            activeArray.push(contID);
            //console.log(activeArray);
        } else {
            let contID = item.getAttribute("data-id");
            completedArray.push(contID);
            //console.log(completedArray);
        }
    });

    addFunctionalityToDo();
    todoJSON(title);
}

// Buttons functionalities
function addFunctionalityToDo() {
    const numberTodos = document.querySelector(".item-number");
    const activeCheckbox = document.querySelectorAll(".active");
    const completedCheckbox = document.querySelectorAll(".completed");
    const activeBtn = document.querySelector(".active-btn");
    const allBtn = document.querySelector(".all-btn");
    const completedBtn = document.querySelector(".completed-btn");

    completedCheckbox.forEach(checkbox =>  {
        checkbox.addEventListener("click", e => {
            if(e) {
                let idCheckbox = e.target.getAttribute("data-id");
                activeStatus(idCheckbox);
                //console.log("click1");
                return;
            }
        })
    })

    activeCheckbox.forEach((checkbox, i) => {
        checkbox.addEventListener("click", e => {
            //console.log(checkbox);
 
                    e.preventDefault();                let idTodo = e.target.getAttribute("data-id");

                    console.log(idTodo);

                    updatedStatus(idTodo);
                    return;
        })
    });

    activeBtn.addEventListener("click", e => {
        e.preventDefault();
        if(e) {
            filterActive();
            console.log("click");
        }
    });

    completedBtn.addEventListener("click", e => filterCompleted());

    allBtn.addEventListener("click", e => {
        e.preventDefault();
        if(e) {
            showAll();
        }
    });



    numberTodos.textContent = activeArray.length;
}

// Filter To Dos

// Active to do filter
function filterActive() {
    activeFilter = true;
    completedFilter = false;

    const todoItems = document.querySelectorAll(".todo-item");
    const allBtn = document.querySelector(".all-btn");
    const completedBtn = document.querySelector(".completed-btn");
    const activeBtn = document.querySelector(".active-btn");
    
    todoItems.forEach(item => {
        completedArray.forEach(element => {
            if(item.getAttribute("data-id") === element) {
                item.classList.add("hide");
            } else {
                item.classList.remove("hide");
            }
        });

        allBtn.classList.remove("active");
        completedBtn.classList.remove("active");
        activeBtn.classList.add("active");
    })
    return;
};
function filterCompleted() {
    activeFilter = false;
    completedFilter = true;

    const todoItems = document.querySelectorAll(".todo-item");
    const allBtn = document.querySelector(".all-btn");
    const completedBtn = document.querySelector(".completed-btn");
    const activeBtn = document.querySelector(".active-btn");
    
    todoItems.forEach(item => {
        completedArray.forEach(element => {
            if(item.getAttribute("data-id") === element) {
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
            }
        });

        activeBtn.classList.remove("active");
        allBtn.classList.remove("active");
        completedBtn.classList.add("active");
    })
    return;
};

function showAll() {
    activeFilter = false;
    completedFilter = false;

    const todoItems = document.querySelectorAll(".todo-item");
    const allBtn = document.querySelector(".all-btn");
    const completedBtn = document.querySelector(".completed-btn");
    const activeBtn = document.querySelector(".active-btn");
    
    for(let i = 0; i < todoItems.length; i++) {
     todoItems[i].classList.remove("hide");   
    }
    todoItems.forEach((item,i) => {
    
        });

        allBtn.classList.add("active");
        completedBtn.classList.remove("active");
        activeBtn.classList.remove("active");
        return;
};

// Completed Status of To Do
function updatedStatus(idTodo) {
     if(completedArray.includes(idTodo)) {
        //console.log(completedArray);
        return;
    }

    const todoItem = document.querySelectorAll(".todo-item");
    const todoTitle = document.querySelectorAll(".todo-title");
    const numberTodos = document.querySelector(".item-number");
    const activeCheckbox = document.querySelectorAll(".circle-checkbox");
    const completedCheckbox = document.querySelectorAll("button.completed");
    let idCont; 

    todoItem.forEach((item, index) => {
        if(item.getAttribute("data-id") === idTodo) {
            idCont = Number(index);
            console.log(idCont);
        } else {
            return;
        }
    });

    todoTitle[Number(idCont)].classList.add("completed");
    activeCheckbox[Number(idCont)].classList.add("hide");
    completedCheckbox[Number(idCont)].classList.remove("hide");
    
    completedArray.push(String(idTodo));
    activeArray = activeArray.filter(item => item !== String(idTodo));


    //onsole.log(completedArray);
    //console.log(activeArray);


    // Update JSON
    let items = {...localStorage};
    //console.log(items);
    //console.log(toDos);

    let entries = Object.entries(items);
    //console.log(entries);
    let valuesToDo;

    entries.forEach((entry, i) => {
        let index = i+1;
        valuesToDo = JSON.parse(entry[1]);
        //console.log(typeof valuesToDo.id);

        if(valuesToDo.id === String(idTodo) || valuesToDo.id === Number(idTodo)) {
            //console.log(valuesToDo.id);

            const objectJSON = {
                title: valuesToDo.title,
                status: "completed",
                id: String(index),
            }    
        
            localStorage.setItem(`${index}`, JSON.stringify(objectJSON));
            
            return;
           }
        })
        //console.log(localStorage);
        numberTodos.textContent = activeArray.length;
        //console.log(activeArray);
} 

// Active Status of To Do
function activeStatus(idCheckbox) {     
    if(activeArray.includes(idCheckbox)) {    
        //console.log(activeArray);
            return;
    }

    const todoItem = document.querySelectorAll(".todo-item");
    const todoTitle = document.querySelectorAll(".todo-title.completed");
    const numberTodos = document.querySelector(".item-number");
    const circleCheckbox = document.querySelectorAll(".circle-checkbox");
    const completedCheckbox = document.querySelectorAll("button.completed");
    let idCont; 

    todoItem.forEach((item, index) => {
        if(item.getAttribute("data-id") === idCheckbox) {
            idCont = Number(index);
        } else {
            return;
        }
    });

    todoTitle.forEach((title,i) => {
        if(title.getAttribute("data-id") === idCheckbox) {
            todoTitle[i].classList.remove("completed");
        }        
    });
    
    circleCheckbox[Number(idCont)].classList.remove("hide");
    completedCheckbox[Number(idCont)].classList.add("hide");

    completedArray = completedArray.filter(item => item !== String(idCheckbox));    

    if(activeArray.includes(idCheckbox)) {
        return;
    } else {
        activeArray.push(String(idCheckbox));
    }  

        // Update JSON
        let items = {...localStorage};
        //console.log(items);
    
        let entries = Object.entries(items);
        //console.log(entries);
        let valuesToDo;
    
        entries.forEach((entry, i) => {
            let index = i+1;
            valuesToDo = JSON.parse(entry[1]);
            //onsole.log(valuesToDo.id === idCheckbox);
            //console.log(typeof valuesToDo.id);
    
            if(valuesToDo.id === Number(idCheckbox) || valuesToDo.id === String(idCheckbox)) {
                //console.log(valuesToDo.id);
    
                const objectJSON = {
                    title: valuesToDo.title,
                    status: "active",
                    id:  String(index),
                }    
            
                localStorage.setItem(`${index}`, JSON.stringify(objectJSON));
                //console.log(objectJSON);
                return;
               }
            })
            //console.log(localStorage);    
            numberTodos.textContent = activeArray.length; 
}

//Create JSON for local Storage
function todoJSON(title) {
    //console.log(title);

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

// Render all To Dos saved on localStorage
async function getTodos() {
    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;
    let completedToDos = [];
    let activeToDos = [];

        await entries.forEach((entry, i) => {
        valuesToDo = JSON.parse(entry[1]);
        //console.log(valuesToDo);
        count = Number(valuesToDo.id)+1;
   
        if(valuesToDo.status === "completed") {
            completedToDos.push(i);
            }
            if(valuesToDo.status === "active") {
            activeToDos.push[i];
            }

        const todoItem = document.createElement("div");
        todoItem.setAttribute("id", `todo-${valuesToDo.id}`);
        todoItem.setAttribute("data-id", valuesToDo.id);
        // ToDo Info
        todoItem.classList.add("todo-item");
        const todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");
        const circleCheckbox = document.createElement("button");
        circleCheckbox.classList.add("circle-checkbox");
        circleCheckbox.setAttribute("data-id", valuesToDo.id);
        circleCheckbox.classList.add("active");
        const completedCheckbox = document.createElement("button");
        completedCheckbox.classList.add("completed");
        completedCheckbox.setAttribute("data-id", valuesToDo.id);

        if(valuesToDo.status === "completed") {
        circleCheckbox.classList.add("hide");
        completedArray.push(String(valuesToDo.id));
        } 
        if(valuesToDo.status === "active") {
        completedCheckbox.classList.add("hide");
        activeArray.push(String(valuesToDo.id));
        }

        console.log(activeArray);
        console.log(completedArray);

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
        todoInfo.appendChild(completedCheckbox);
        todoInfo.appendChild(circleCheckbox);
        todoInfo.appendChild(todoTitle);
    
        deleteBtn.appendChild(crossIcon);
    
        todoItem.appendChild(todoInfo);
        todoItem.appendChild(deleteBtn);
    
        todos.prepend(todoItem);

        //console.log(activeArray);

        //console.log(completedArray);
        //console.log(activeArray);
        addFunctionalityToDo();
    });
}

// Clean To Dos container
deleteAllBtn.addEventListener("click", e => {
    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;
    const todoItem = document.querySelectorAll(".todo-item");

    console.log(completedArray);
    //console.log(activeArray);

     entries.forEach((entry, i) => {
        valuesToDo = JSON.parse(entry[1]);
        
        console.log(valuesToDo);
        console.log(completedArray);
        completedArray.forEach(element => {
            if(valuesToDo.id === String(element) || valuesToDo.id === Number(element)) {
            let index = element;
            console.log(index);
            localStorage.removeItem(element);
            console.log(localStorage);           
            }
        });   
    });

    if(e) {
        todoItem.forEach(item => {
    
            completedArray.forEach(element => {
                if(item.getAttribute("data-id") === element) {
                todos.removeChild(item);                    
                }
            });
    
        });
        }

        itemNumber.textContent = activeArray.length;
        console.log(localStorage);
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