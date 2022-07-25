const taskTitle = document.querySelector(".title");

const taskdesc = document.querySelector(".description");

const taskDate = document.querySelector(".date");
const addButton = document.querySelector(".add-btn");

const taskBox = document.querySelector(".task-box");

const clearButton = document.querySelector(".clear-btn");
const filterPending = document.querySelector(".pending");

const task_title = document.querySelector(".task-title");

const filters = document.querySelectorAll(".filters span");

let tasks = JSON.parse(localStorage.getItem("task-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");

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

  taskBox.innerHTML = li;
}


function updateTask(updateId){





  let tasks = JSON.parse(localStorage.getItem("task-list"));



  if(taskTitle.value && taskdesc && taskDate){


  tasks[updateId].title = taskTitle.value;

  tasks[updateId].desc = taskdesc.value;

  tasks[updateId].date = taskDate.value;


  localStorage.setItem("task-list", JSON.stringify(tasks));


  taskTitle.value = "";

  taskDate.value= "";

  taskDate.value= "";



  



  }


  

  


}



showTasks("all");

function deleteTask(deleteId) {
  tasks.splice(deleteId, 1);

  localStorage.setItem("task-list", JSON.stringify(tasks));

  showTasks("all");
}

function updateStatus(selectedItem) {
  let taskName = selectedItem.parentElement.lastElementChild;

  const id = selectedItem.id.split("")[0];

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
      let tasks = JSON.parse(localStorage.getItem("task-list"));
    });

    if (!tasks) {
      tasks = [];
    }

    let newTask = {
      title: taskTitle.value,
      desc: taskdesc.value,
      date: taskDate.value,
      status: "pending",
    };

    tasks.push(newTask);

    localStorage.setItem("task-list", JSON.stringify(tasks));

    taskTitle.value:string = "";

    taskdesc.value = "";

    taskDate.value = "";

    showTasks("all");
  }
});

clearButton.addEventListener("click", () => {
  let tasks = JSON.parse(localStorage.getItem("task-list"));

  if (tasks) {
    tasks = [];

    localStorage.setItem("task-list", JSON.stringify(tasks));
  }

  showTasks("all");
});
