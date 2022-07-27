
const taskTitle  = document.querySelector(".title") as HTMLInputElement;

const taskdesc = document.querySelector(".description") as HTMLInputElement;

const taskDate = document.querySelector(".date") as HTMLDataElement;
const addButton  = document.querySelector(".add-btn") as HTMLButtonElement;

const taskBox = document.querySelector(".task-box") as HTMLElement;

const clearButton = document.querySelector(".clear-btn") as HTMLButtonElement;


const filterPending = document.querySelector(".pending") as HTMLElement;

const task_title = document.querySelector(".task-title") as HTMLInputElement;

const filters = document.querySelectorAll(".filters span") as NodeListOf<Element>;


interface Task{



   

    title: string;

    date: Date; 

   
    desc:string;

    status:string

    
}


let tasks:Task[] = JSON.parse(localStorage.getItem("task-list") as string);

let activeElement  = document.querySelector("span.active") as HTMLElement;





class PendingTask{


   


    constructor( private tasks:Task[]){

        this.tasks = tasks;


    }



    showTasks(filter) {
        let li = "";
      
        if (tasks) {
          tasks.forEach((task, id) => {
            let isCompleted = task.status == "completed" ? "checked" : "";
      
            if (filter == task.status || filter == "all") {
    
    
              li += `
      
      
          
      
            <li class="task">
      
                    <label for="${id}">
      
      
                    
                    
                    <input onclick = "this.updateStatus( this)" type="checkbox" id="${id} class="input-checkbox">
      
      
                 
                    
      
      
                 
      
                    <p class="${isCompleted}">${task.title}</p>
      
      
                    
                    </label>
      
      
                 
      
                  
                    <button class="update" onclick = "this.updateTask(${id})">Update</button>
      
      
                   <button class="delete" onclick = "this.deleteTask(${id})">Delete</button>
      
                    
      
                    
      
                   
                </li>
       
            `;
            }
          });
        }
      
        taskBox.innerHTML  = li;
      }




      updateTask(updateId){


        let tasks:Task[] = JSON.parse(JSON.parse(localStorage.getItem("task-list") as string));
      
      
      
        if(taskTitle.value && taskdesc && taskDate){
      
      
        tasks[updateId].title = taskTitle.value;
      
        tasks[updateId].desc = taskdesc.value;
      
        tasks[updateId].date = taskDate.value as string | any;
      
      
        localStorage.setItem("task-list", JSON.stringify(tasks));
      
      
        task_title.value = "";
      
        taskDate.value= "";
      
        taskDate.value= "";
      
      
    }

    this.showTasks("all");
      
     }



     deleteTask(deleteId:any) {
        tasks.splice(deleteId, 1);
      
        localStorage.setItem("task-list", JSON.stringify(tasks));
      
        this.showTasks("all");
      }



      updateStatus(selectedItem) {
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
    
    
    
      
    




}


class finishedTask extends PendingTask{


    constructor(){
    
            super(tasks)

    }





}



const completedTask = new finishedTask();


  //filters.forEach((btn) => {
    //btn.addEventListener("click", () => {
    //  activeElement.classList.remove("active");
  
      //btn.classList.add("active");
  
      //showTasks(btn.id);
   // });
 // });

  

  const unfinishedTask = new PendingTask(tasks);




  
  addButton.addEventListener("click", () => {
    if (taskTitle.value && taskDate.value && taskdesc.value) {
      filterPending.addEventListener("click", () => {
        let tasks:Task[] = JSON.parse(localStorage.getItem("task-list") as string);
      });
  
      if (!tasks) {
        tasks = [];
      }
  
      let newTask:Task = {
        title: taskTitle.value,
        desc: taskdesc.value,
        date: taskDate.value as any,
        status: "pending",
      };
  
  
    
      tasks.push(newTask);
  
      localStorage.setItem("task-list", JSON.stringify(tasks));
  
      taskTitle.value = "";
  
      taskdesc.value = "";
  
      taskDate.value = "";
  
      unfinishedTask.showTasks("pending");

      completedTask.showTasks("completed");
    }
  });
  
  clearButton.addEventListener("click", () => {
    let tasks:Task[] = JSON.parse(localStorage.getItem("task-list") as string);
  
    if (tasks) {
      tasks = [];
  
      localStorage.setItem("task-list", JSON.stringify(tasks));
    }
  
    unfinishedTask.showTasks("pending");
    completedTask.showTasks("completed");

    
  });