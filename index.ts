
import {Task} from './Task';

const taskTitle: Element | any = document.querySelector(".title");

const taskdesc : Element | any = document.querySelector(".description");

const taskDate: Element | any = document.querySelector(".date");
const addButton: Element | any  = document.querySelector(".add-btn");

const taskBox: Element | any = document.querySelector(".task-box");

const clearButton: Element | any = document.querySelector(".clear-btn");
const filterPending: Element| any = document.querySelector(".pending");

const task_title: Element | any = document.querySelector(".task-title");

const filters: Element | any = document.querySelectorAll(".filters span");



let getLocalStorageData: Task[] | null | any = localStorage.getItem("task-list")

let tasks:Task[] | any= JSON.parse(getLocalStorageData);

let activeElement:Element | any = document.querySelector("span.active");





filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeElement.classList.remove("active");

    btn.classList.add("active");

    showTasks(btn.id);
  });
});



function showTasks(filter) {
  let li = "";

  if (tasks) {
    tasks.forEach((task, id) => {
      let isCompleted = task.status == "completed" ? "checked" : "";

      if (filter == task.status || filter == "all") {
        li += `


    

      <li class="task">

              <label for="${id}">


              
              
              <input onclick = "updateStatus( this)" type="checkbox" id="${id} class="input-checkbox">


           
              


           

              <p class="${isCompleted}">${task.title}</p>


              
              </label>


           

            
              <button class="update" onclick = "updateTask(${id})">Update</button>


             <button class="delete" onclick = "updateTask(${id})">Delete</button>

              

              

             
          </li>
 
      `;
      }
    });
  }

  taskBox.innerHTML  = li;
}


function updateTask(updateId){





  let tasks:Task[] = JSON.parse(getLocalStorageData);



  if(taskTitle.value && taskdesc && taskDate){


  tasks[updateId].title = taskTitle.value;

  tasks[updateId].desc = taskdesc.value;

  tasks[updateId].date = taskDate.value;


  localStorage.setItem("task-list", JSON.stringify(tasks));


  task_title.value = "";

  taskDate.value= "";

  taskDate.value= "";



  



  }


  

  


}



showTasks("all");

function deleteTask(deleteId:string) {
  tasks.splice(deleteId, 1);

  localStorage.setItem("task-list", JSON.stringify(tasks));

  showTasks("all");
}

function updateStatus(selectedItem) {
  let taskName = selectedItem.parentElement.lastElementChild;

  const id:string = selectedItem.id.split("")[0];

  if (selectedItem.checked) {
    taskName.classList.add("checked");

    tasks[id].status = "completed";
  } else {
    taskName.classList.remove("checked");

    tasks[id].status = "pending";
  }

  localStorage.setItem("task-list", JSON.stringify(tasks));
}

addButton.addEventListener("click", () => {
  if (taskTitle.value && taskDate.value && taskdesc.value) {
    filterPending.addEventListener("click", () => {
      let tasks:Task = JSON.parse(getLocalStorageData);
    });

    if (!tasks) {
      tasks = [];
    }

    let newTask:Task = {
      title: taskTitle.value,
      desc: taskdesc.value,
      date: taskDate.value,
      status: "pending",
    };

    tasks.push(newTask);

    localStorage.setItem("task-list", JSON.stringify(tasks));

    taskTitle.value = "";

    taskdesc.value = "";

    taskDate.value = "";

    showTasks("all");
  }
});

clearButton.addEventListener("click", () => {
  let tasks:Task[] = JSON.parse(getLocalStorageData);

  if (tasks) {
    tasks = [];

    localStorage.setItem("task-list", JSON.stringify(tasks));
  }

  showTasks("all");
});
