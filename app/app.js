const d = document; 

// Theme
const iconThemeBtn = d.querySelector(".icon-theme_container");
const moonIcon = d.querySelector(".moon");
const sunIcon = d.querySelector(".sun");

// To do items
const todos = d.querySelector(".todos");
const deleteAllBtn = d.querySelector(".delete-all_btn");
const optionsTodo = d.querySelectorAll(".options");
const inputTodo = d.querySelector(".input");
const circleInput = d.querySelector(".circle-input");
const todoFooter = d.querySelector(".todo-container_footer");
const itemNumber = d.querySelector(".item-number");

let inputValue;
let count = 1;
let completedArray = [];
let activeArray = [];
let activeFilter = false;
let completedFilter = false;
let draggable;

let theme;

// Change theme
iconThemeBtn.addEventListener("click", e => {   
    const themeItems = d.querySelectorAll(".theme");
    const body = d.querySelector("body");

    if(body.classList.contains("light")) {
        moonIcon.classList.toggle("hide");
        sunIcon.classList.toggle("hide");
        localStorage.setItem("theme", "dark");
        //console.log(localStorage);
        for(let i = 0; i < themeItems.length; i++) {
            themeItems[i].classList.toggle("light");
            themeItems[i].classList.toggle("dark");
        }
        return
    } 
    if(body.classList.contains("dark")) {
        moonIcon.classList.toggle("hide");
        sunIcon.classList.toggle("hide");
        localStorage.setItem("theme", "light");
        //console.log(localStorage);

    for(let i = 0; i < themeItems.length; i++) {
        themeItems[i].classList.toggle("light");
        themeItems[i].classList.toggle("dark");
    }    
    }
});

// Input functionality
inputTodo.addEventListener("input", e => {
    if(e) {
        inputValue = e.target.value;
    }
})

d.addEventListener("keypress", e => {
    if(e.key === "Enter") {
        AddToDo(inputValue);
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
    
    const todoItem = d.createElement("div");
    todoItem.setAttribute("data-id", count);
    todoItem.setAttribute("data-order", count);
    todoItem.style.order = count;
    todoItem.setAttribute("draggable", true);
    
    // ToDo Info
    todoItem.classList.add("todo-item");
    const todoInfo = d.createElement("div");
    todoInfo.classList.add("todo-info");
    todoInfo.classList.add("theme");
    const circleCheckbox = d.createElement("button");
    circleCheckbox.classList.add("circle-checkbox");
    circleCheckbox.classList.add("active");
    circleCheckbox.classList.add("light");
    circleCheckbox.setAttribute("data-id", count);
    const completedCheckbox = d.createElement("button");
    completedCheckbox.classList.add("completed");
    completedCheckbox.classList.add("hide");
    completedCheckbox.setAttribute("data-id", count);
    const todoTitle = d.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = inputValue;
    todoTitle.setAttribute("data-id", count);
    todoTitle.setAttribute("data-order", count);
    todoTitle.classList.add("theme");

    const deleteBtn = d.createElement("button");
    deleteBtn.classList.add("delete-btn_container");
    deleteBtn.classList.add("hide");
    deleteBtn.setAttribute("data-id", count);
    const crossIcon = d.createElement("img");
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

    //Check active elements

    const title = d.querySelector(".todo-title");

     const activeBtn = d.querySelectorAll("button.active");

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
 
    if(activeFilter === true) {
        filterActive();
    }

    if(completedFilter === true) {
        filterCompleted();
    }

    //console.log(localStorage);
    addFunctionalityToDo();
    todoJSON(title);
}
//Create JSON for local Storage
function todoJSON(title) {
    //console.log(title);

    let titleTodo = title.textContent;
    let statusTodo = "active";
    let id = title.getAttribute("data-id");
    let order = title.getAttribute("data-order");

    const objectJSON = {
        title: titleTodo,
        status: statusTodo,
        id: id,
        order: order,
    }    

    localStorage.setItem(`${count-1}`, JSON.stringify(objectJSON));
    //console.log(localStorage);
}

// Buttons functionalities
function addFunctionalityToDo() {
    const numberTodos = d.querySelector(".item-number");
    const activeCheckbox = d.querySelectorAll(".active");
    const completedCheckbox = d.querySelectorAll(".completed");
    const activeBtn = d.querySelector(".active-btn");
    const allBtn = d.querySelector(".all-btn");
    const completedBtn = d.querySelector(".completed-btn");
    const todoItem = d.querySelectorAll(".todo-item");
    const deleteBtn = d.querySelectorAll(".delete-btn_container");

    completedCheckbox.forEach(checkbox =>  {
        checkbox.addEventListener("click", e => {
            if(e) {
                console.log("click2");
                let idCheckbox = e.target.getAttribute("data-id");
                activeStatus(idCheckbox);
                return;
            }
        })
    })

    activeCheckbox.forEach((checkbox, i) => {
        checkbox.addEventListener("click", e => {
            console.log("click1");
 
            let idTodo = e.target.getAttribute("data-id");

            updatedStatus(idTodo);
            return;
        })
    });

    activeBtn.addEventListener("click", e => {
        e.preventDefault();
        if(e) {
            filterActive();
            //console.log("click");
        }
    });

    completedBtn.addEventListener("click", e => filterCompleted());

    allBtn.addEventListener("click", e => {
        e.preventDefault();
        if(e) {
            showAll();
        }
    });


    todoItem.forEach(item => {
        item.addEventListener("mouseover", e => {
            if(e) {
                let idItem = e.currentTarget.getAttribute("data-id");

                showDeleteIcon(idItem);
            }   
        });

        item.addEventListener("mouseout", e => {
            let idItem = e.currentTarget.getAttribute("data-id");

            hideDeleteIcon(idItem);
        });

        // DESKTOP
        item.addEventListener("dragstart", e => {
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", (e) => {
            item.classList.remove("dragging");
        });

        item.addEventListener("dragover", e => {
            e.preventDefault();

            //console.log(e.clientY);

            const afterElement = getDragAfterElement(e.clientY);
            const draggingItem = d.querySelector(".dragging");

            //console.log(afterElement);

            if (!afterElement) {
              todos.appendChild(draggingItem);
            } else {
              todos.insertBefore(draggingItem, afterElement);
            }
          });
        });

    numberTodos.textContent = activeArray.length;
}

// DRAG AND DROP
function getDragAfterElement(y) {
    const draggableElements = d.querySelectorAll(".todo-item:not(.dragging)");
    let closestElement = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < draggableElements.length; i++) {
      const child = draggableElements[i];
      const box = child.getBoundingClientRect();
      //console.log(box);
      const offset = y - (box.top + box.height / 2);
  
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestElement = child;
      }
    }
  
    orderList();
    return closestElement;
  }

// Drag and drop changes
function orderList() {
    const todoItem = d.querySelectorAll(".todo-item");
    let order = todoItem.length;

    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;

    for(let i = 0; i < todoItem.length; i++) {
        let idItem = todoItem[i].getAttribute("data-id");
        // console.log(idItem);

        if(todoItem[i] !== undefined) {
        todoItem[i].style.order = order;

        entries.forEach((entry, i) => {
        if(entry[0] !== "theme") {
        valuesToDo = JSON.parse(entry[1]);
        
        if(valuesToDo.id === idItem) {
            const objectJSON = {
                title: valuesToDo.title,
                status: valuesToDo.status,
                id: valuesToDo.id,
                order: order,
            }    
        
            localStorage.setItem(`${valuesToDo.id}`, JSON.stringify(objectJSON));
                        }
                    }
                })
            order--;
            };
            const activeBtn = d.querySelectorAll("button.active");

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
};
}

// Show delete icon
function showDeleteIcon(idItem) {
    const deleteBtn = d.querySelectorAll(".delete-btn_container");

    deleteBtn.forEach(btn => {
        if(btn.getAttribute("data-id") === idItem) {
        btn.classList.remove("hide");

        btn.addEventListener("click", e => {
            if(e) {
                deleteItem(idItem);
            }
        })
        }        
    })

}
// Hide delete icon
function hideDeleteIcon(idItem) {
    const deleteBtn = d.querySelectorAll(".delete-btn_container");

    deleteBtn.forEach(btn => {
        if(btn.getAttribute("data-id") === idItem) {
        btn.classList.add("hide");
        //console.log(btn);
        }        
    })

}

function deleteItem(idItem) {
    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;
    const todoItem = d.querySelectorAll(".todo-item");

        todoItem.forEach(item => {
                if(item.getAttribute("data-id") === idItem) {
                todos.removeChild(item);                  
                }
            });

     entries.forEach((entry, i) => {
        if(entry[0] !== "theme") {
        valuesToDo = JSON.parse(entry[1]);

        if(valuesToDo.id === idItem) {
            completedArray = completedArray.filter(item => item !== idItem);
            activeArray = activeArray.filter(item => item !== idItem);
            
            localStorage.removeItem(entry[0]);
            //console.log(localStorage);
        }

        itemNumber.textContent = activeArray.length; 
    };
})
}

// Completed Status of To Do
function updatedStatus(idTodo) {
     if(completedArray.includes(idTodo)) {
        console.log(completedArray);
        return;
    }

    console.log(idTodo);

    const todoItem = d.querySelectorAll(".todo-item");
    const todoTitle = d.querySelectorAll(".todo-title");
    const numberTodos = d.querySelector(".item-number");
    const activeCheckbox = d.querySelectorAll(".circle-checkbox");
    const completedCheckbox = d.querySelectorAll("button.completed");
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

    //console.log(completedArray);
    //console.log(activeArray);

    // Update JSON
    let items = {...localStorage};
    //console.log(items);
    //console.log(toDos);

    let entries = Object.entries(items);
    //console.log(entries);
    let valuesToDo;

    entries.forEach((entry, i) => {
        if(entry[0] !== "theme") {
        let index = i+1;
        valuesToDo = JSON.parse(entry[1]);
        //console.log(typeof valuesToDo.id);

        if(valuesToDo.id === String(idTodo) || valuesToDo.id === Number(idTodo)) {
            //console.log(valuesToDo.id);

            const objectJSON = {
                title: valuesToDo.title,
                status: "completed",
                id: valuesToDo.id,
                order: valuesToDo.order,
            }    
        
            localStorage.setItem(`${valuesToDo.id}`, JSON.stringify(objectJSON));
            
            return;
           }
           }
        })

        //console.log(localStorage);
        numberTodos.textContent = activeArray.length;
        
        if(activeFilter === true) {
            filterActive();
        }

        if(completedFilter === true) {
            filterCompleted();
        }
        //console.log(localStorage);
} 

// Active Status of To Do
function activeStatus(idCheckbox) {     
    if(activeArray.includes(idCheckbox)) {    
        //console.log(activeArray);
            return;
    }
    console.log(idCheckbox);

    const todoItem = d.querySelectorAll(".todo-item");
    const todoTitle = d.querySelectorAll(".todo-title.completed");
    const numberTodos = d.querySelector(".item-number");
    const circleCheckbox = d.querySelectorAll(".circle-checkbox");
    const completedCheckbox = d.querySelectorAll("button.completed");
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

    activeArray.push(String(idCheckbox));
    console.log(activeArray);

        // Update JSON
        let items = {...localStorage};
        //console.log(items);
    
        let entries = Object.entries(items);
        //console.log(entries);
        let valuesToDo;
    
        entries.forEach((entry, i) => {
            if(entry[0] !== "theme") {
            let index = i+1;
            valuesToDo = JSON.parse(entry[1]);
            //onsole.log(valuesToDo.id === idCheckbox);
            //console.log(typeof valuesToDo.id);
    
            if(valuesToDo.id === Number(idCheckbox) || valuesToDo.id === String(idCheckbox)) {
                //console.log(valuesToDo.id);
    
                const objectJSON = {
                    title: valuesToDo.title,
                    status: "active",
                    id: valuesToDo.id,
                    order: valuesToDo.order,
                }    
            
                localStorage.setItem(`${index}`, JSON.stringify(objectJSON));
                //console.log(objectJSON);
                return;
               }
            }
            })
            console.log(localStorage);    
            numberTodos.textContent = activeArray.length; 

            if(activeFilter === true) {
                filterActive();
            }
    
            if(completedFilter === true) {
                filterCompleted();
            }
}

// FILTERS

// Active to do filter
function filterActive() {
    activeFilter = true;
    completedFilter = false;

    const todoItems = d.querySelectorAll(".todo-item");
    const allBtn = d.querySelector(".all-btn");
    const completedBtn = d.querySelector(".completed-btn");
    const activeBtn = d.querySelector(".active-btn");
    
    todoItems.forEach(item => {
        //console.log(completedArray);
        let idCont = item.getAttribute("data-id");

        if (completedArray.includes(idCont)) {
            item.classList.add("hide");
        } else {
            item.classList.remove("hide");
        }
        });

        allBtn.classList.remove("active");
        completedBtn.classList.remove("active");
        activeBtn.classList.add("active");
    return;
}

function filterCompleted() {
    activeFilter = false;
    completedFilter = true;

    const todoItems = d.querySelectorAll(".todo-item");
    const allBtn = d.querySelector(".all-btn");
    const completedBtn = d.querySelector(".completed-btn");
    const activeBtn = d.querySelector(".active-btn");
    
    todoItems.forEach(item => {
        //console.log(completedArray);
        let idCont = item.getAttribute("data-id");

        if (completedArray.includes(idCont)) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
        });

        activeBtn.classList.remove("active");
        allBtn.classList.remove("active");
        completedBtn.classList.add("active");
    return;
};

function showAll() {
    activeFilter = false;
    completedFilter = false;

    const todoItems = d.querySelectorAll(".todo-item");
    const allBtn = d.querySelector(".all-btn");
    const completedBtn = d.querySelector(".completed-btn");
    const activeBtn = d.querySelector(".active-btn");
    
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

// Render all To Dos saved on localStorage
async function getTodos() {
    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;
    let completedToDos = [];
    let activeToDos = [];

        await entries.forEach((entry, i) => {
        if(entry[0] !== "theme") {
        //console.log(entry);
        //console.log(entry[0]);

        valuesToDo = JSON.parse(entry[1]);
        //console.log(valuesToDo);
        count = Number(valuesToDo.id)+1;
   
        if(valuesToDo.status === "completed") {
            completedToDos.push(i);
            }
            if(valuesToDo.status === "active") {
            activeToDos.push[i];
            }

        const todoItem = d.createElement("div");
        todoItem.classList.add("theme");
        //todoItem.setAttribute("id", `todo-${valuesToDo.id}`);
        todoItem.setAttribute("data-id", valuesToDo.id);
        todoItem.setAttribute("data-order", valuesToDo.order);
        
        // ToDo Info
        todoItem.classList.add("todo-item");
        todoItem.setAttribute("draggable", true);
        const todoInfo = d.createElement("div");
        todoInfo.classList.add("todo-info");
        todoInfo.classList.add("theme");
        const circleCheckbox = d.createElement("button");
        circleCheckbox.classList.add("circle-checkbox");
        circleCheckbox.setAttribute("data-id", valuesToDo.id);
        circleCheckbox.classList.add("active");
        circleCheckbox.classList.add("theme");
        const completedCheckbox = d.createElement("button");
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

        //console.log(activeArray);
        //console.log(completedArray);

        const todoTitle = d.createElement("p");
        todoTitle.classList.add("todo-title");
        todoTitle.classList.add(valuesToDo.status);
        todoTitle.textContent = valuesToDo.title;
        todoTitle.setAttribute("data-id", valuesToDo.id);
        todoTitle.setAttribute("data-order", valuesToDo.order);
        todoTitle.classList.add("theme");

        const deleteBtn = d.createElement("button");
        deleteBtn.classList.add("delete-btn_container");
        deleteBtn.classList.add("hide");
        deleteBtn.setAttribute("data-id", valuesToDo.id);
        const crossIcon = d.createElement("img");
        crossIcon.classList.add("delete-btn");
        crossIcon.setAttribute("src", "./images/icon-cross.svg");
        todoItem.classList.add("light");
        todoInfo.classList.add("light");
        circleCheckbox.classList.add("light");
        todoTitle.classList.add("light");

        //circleCheckbox.appendChild(checkIcon);
        todoInfo.appendChild(completedCheckbox);
        todoInfo.appendChild(circleCheckbox);
        todoInfo.appendChild(todoTitle);
    
        deleteBtn.appendChild(crossIcon);
    
        todoItem.appendChild(todoInfo);
        todoItem.appendChild(deleteBtn);
    
        todos.prepend(todoItem);

        addFunctionalityToDo();
        addOrder();
        } 
        else {
            theme = entry[1];
            console.log(theme);
            
            const body = d.querySelector("body");
            body.classList.add(`${theme}`);
            addTheme();
        }
    });
}

// Theme 
function addTheme() {
    const themeItems = d.querySelectorAll(".theme");
    if(theme === "light"){
        themeItems.forEach((item, i) => {
        themeItems[i].classList.add("light");
        themeItems[i].classList.remove("dark");
        moonIcon.classList.remove("hide");
        sunIcon.classList.add("hide");             
        }) 
    }

    if(theme === "dark"){
        themeItems.forEach((item, i) => {
        themeItems[i].classList.add("dark");
        themeItems[i].classList.remove("light");
        sunIcon.classList.remove("hide");
        moonIcon.classList.add("hide");               
        }); 
    }
}

// Add Order 
function addOrder() {
    const todoItem = d.querySelectorAll(".todo-item");
    
    todoItem.forEach((item, i) => {
        let orderNum = item.getAttribute("data-order");
        //console.log(orderNum);
        
        todoItem[i].style.order = orderNum;
    })
}

// Clean To Dos container
deleteAllBtn.addEventListener("click", e => {
    let items = {...localStorage};
    let entries = Object.entries(items);
    let valuesToDo;
    const todoItem = d.querySelectorAll(".todo-item");

    //console.log(activeArray);
    if(e) {
        todoItem.forEach(item => {
    
            completedArray.forEach(element => {
                if(item.getAttribute("data-id") === element) {
                todos.removeChild(item);                    
                }
            });
    
        });
        }

     entries.forEach((entry, i) => {
        if(entry[0] !== "theme") {
        valuesToDo = JSON.parse(entry[1]);
        //console.log(typeof entry[0]);
        
        if (valuesToDo.status === "completed") {
            //console.log(entry[0]);
            completedArray = completedArray.filter(item => item !== entry[0]);            
            localStorage.removeItem(entry[0]);
            //console.log(completedArray);
    };
    }

        itemNumber.textContent = activeArray.length;
        //console.log(localStorage);
})
})

document.addEventListener("DOMContentLoaded", getTodos());