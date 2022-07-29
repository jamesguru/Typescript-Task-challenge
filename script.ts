const taskTitle = document.querySelector(".title") as HTMLInputElement;

const taskdesc = document.querySelector(".description") as HTMLInputElement;

const taskDate = document.querySelector(".date") as HTMLDataElement;

const taskDate1 = document.querySelector(".date1") as HTMLDataElement;

const addButton = document.querySelector(".add-btn") as HTMLButtonElement;

const taskBox = document.querySelector(".task-box") as HTMLElement;

const clearButton = document.querySelector(".clear-btn") as HTMLButtonElement;

const filterPending = document.querySelector(".pending") as HTMLElement;

const task_title = document.querySelector(".task-title") as HTMLInputElement;

const filters = document.querySelectorAll(
  ".filters span"
) as NodeListOf<Element>;

interface Task {
  title: string;

  date: any;

  deadline: any;

  desc: string;

  status: string;

  diff: any;
}

let tasks: Task[] = JSON.parse(localStorage.getItem("task-list") as string);

let activeElement = document.querySelector("span.active") as HTMLElement;

class PendingTasks {
  constructor(private tasks: Task[]) {
    this.tasks = tasks;
  }

  updateTask(updateId: string) {
    let tasks: Task[] = JSON.parse(
      JSON.parse(localStorage.getItem("task-list") as string)
    );

    if (taskTitle.value && taskdesc && taskDate) {
      tasks[updateId as any].title = taskTitle.value;

      tasks[updateId as any].desc = taskdesc.value;

      tasks[updateId as any].date = taskDate.value;

      localStorage.setItem("task-list", JSON.stringify(tasks));

      task_title.value = "";

      taskDate.value = "";

      taskDate.value = "";

      taskDate1.value = "";
    }

    this.showTasks("all");
  }

  deleteTask(deleteId: any) {
    tasks.splice(deleteId, 1);

    localStorage.setItem("task-list", JSON.stringify(tasks));

    this.showTasks("all");

    console.log("item deleted");

    this.showTasks("all");
  }

  updateStatus(selectedItem:any) {
    console.log("updating thiis");

    let taskName = selectedItem.parentElement.lastElementChild;

    const id: string = selectedItem.id.split("")[0];

    if (selectedItem.checked) {
      taskName.classList.add("checked");

      this.tasks[id as any].status = "completed";
    } else {
      taskName.classList.remove("checked");

      this.tasks[id as any].status = "pending";
    }

    localStorage.setItem("task-list", JSON.stringify(tasks));

    console.log("status updated");

    this.showTasks("all");
  }

  showTasks(filter:string) {
    let li = "";

    if (tasks) {
      tasks.forEach((task, id) => {
        let isCompleted = task.status == "completed" ? "checked" : "";

        if (filter == "pending" || filter == "all") {
          li += `
      
    
          
      
            <li class="task">
      
                    <label for="${id}">
      
      
                    
                    
                    <input onclick = "() => this.updateStatus(this)" type="checkbox" id="${id} class="input-checkbox">
      
                     <p class="${isCompleted}">${task.title}</p>
      
      
                    
                    </label>
      
      
                 
      
                  
                    <button class="update" onclick = "() => this.updateTask(${id})" >Update</button>
      
      
                   <button class="delete" onclick = "() => this.deleteTask(${id})">Delete</button>
      
                    
      
                    
      
                   
                </li>
       
            `;
        }
      });
    }

    taskBox.innerHTML = li;
  }
}





class completedTask extends PendingTasks {
  constructor() {
    super(tasks);
  }

  showTasks(completed: string) {
    let li = "";

    if (tasks) {
      tasks.forEach((task, id) => {
        let isCompleted = task.status == "completed" ? "checked" : "";

        if (completed == "completed" || completed == "all") {
          li += `
    
  
        
    
          <li class="task">
    
                  <label for="${id}">
    
    
                  
                  
                  <input type="checkbox" id="${id} class="input-checkbox">
    
                   <p class="${isCompleted}">${task.title}</p>
    
    
                  
                  </label>
    
    
                 <button class="delete" onclick = "this.deleteTask(${id})">Delete</button>
    
                  
    
                  
    
                 
              </li>
     
          `;
        }
      });
    } else {
      taskBox.innerHTML = `<li class="warning">No task is added.</li>`;
    }

    taskBox.innerHTML = li;
  }

  deleteTask(deleteId: any) {
    tasks.splice(deleteId, 1);

    localStorage.setItem("task-list", JSON.stringify(tasks));

    this.showTasks("all");
  }
}

const unfinishedTask = new PendingTasks(tasks);

const finishedTask = new completedTask();

addButton.addEventListener("click", () => {
  if (taskTitle.value && taskDate.value && taskdesc.value) {
    filterPending.addEventListener("click", () => {
      let tasks: Task[] = JSON.parse(
        localStorage.getItem("task-list") as string
      );
    });

    if (!tasks) {
      tasks = [];
    }

    const differenceinTime = differenceInTime(taskDate.value, taskDate1.value);

    let newTask: Task = {
      title: taskTitle.value,
      desc: taskdesc.value,
      date: taskDate.value as any,
      deadline: taskDate1.value as any,
      status: "pending",

      diff: differenceInTime,
    };

    tasks.push(newTask);

    localStorage.setItem("task-list", JSON.stringify(tasks));

    taskTitle.value = "";

    taskdesc.value = "";

    taskDate.value = "";

    taskDate1.value = "";

    unfinishedTask.showTasks("all");
  } else {
    taskBox.innerHTML = `<li class="warning">Please make sure you have entered values to proceed.</li>`;
  }
});

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeElement.classList.remove("active");

    btn.classList.add("active");

    unfinishedTask.showTasks(btn.id);
  });
});

clearButton.addEventListener("click", () => {
  let tasks: Task[] = JSON.parse(localStorage.getItem("task-list") as string);

  if (tasks) {
    tasks = [];

    localStorage.setItem("task-list", JSON.stringify(tasks));
  }

  unfinishedTask.showTasks("all");
  finishedTask.showTasks("all");
});

const differenceInTime = (date: any, deadline: any) => {
  let date1 = new Date(`${date}`);
  let date2 = new Date(`${deadline}`);

  // To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days;
};
