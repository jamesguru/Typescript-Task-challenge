var taskTitle = document.querySelector(".title");
var taskdesc = document.querySelector(".description");
var taskDate = document.querySelector(".date");
var addButton = document.querySelector(".add-btn");
var taskBox = document.querySelector(".task-box");
var clearButton = document.querySelector(".clear-btn");
var filterPending = document.querySelector(".pending");
var task_title = document.querySelector(".task-title");
var filters = document.querySelectorAll(".filters span");
var tasks = JSON.parse(localStorage.getItem("task-list"));
var activeElement = document.querySelector("span.active");
var PendingTask = /** @class */ (function () {
    function PendingTask(tasks) {
        this.tasks = tasks;
        this.tasks = tasks;
    }
    PendingTask.prototype.showTasks = function (filter) {
        var li = "";
        if (tasks) {
            tasks.forEach(function (task, id) {
                var isCompleted = task.status == "completed" ? "checked" : "";
                if (filter == task.status || filter == "all") {
                    li += "\n      \n      \n          \n      \n            <li class=\"task\">\n      \n                    <label for=\"".concat(id, "\">\n      \n      \n                    \n                    \n                    <input onclick = \"this.updateStatus( this)\" type=\"checkbox\" id=\"").concat(id, " class=\"input-checkbox\">\n      \n      \n                 \n                    \n      \n      \n                 \n      \n                    <p class=\"").concat(isCompleted, "\">").concat(task.title, "</p>\n      \n      \n                    \n                    </label>\n      \n      \n                 \n      \n                  \n                    <button class=\"update\" onclick = \"this.updateTask(").concat(id, ")\">Update</button>\n      \n      \n                   <button class=\"delete\" onclick = \"this.deleteTask(").concat(id, ")\">Delete</button>\n      \n                    \n      \n                    \n      \n                   \n                </li>\n       \n            ");
                }
            });
        }
        taskBox.innerHTML = li;
    };
    PendingTask.prototype.updateTask = function (updateId) {
        var tasks = JSON.parse(JSON.parse(localStorage.getItem("task-list")));
        if (taskTitle.value && taskdesc && taskDate) {
            tasks[updateId].title = taskTitle.value;
            tasks[updateId].desc = taskdesc.value;
            tasks[updateId].date = taskDate.value;
            localStorage.setItem("task-list", JSON.stringify(tasks));
            task_title.value = "";
            taskDate.value = "";
            taskDate.value = "";
        }
        this.showTasks("all");
    };
    PendingTask.prototype.deleteTask = function (deleteId) {
        tasks.splice(deleteId, 1);
        localStorage.setItem("task-list", JSON.stringify(tasks));
        this.showTasks("all");
    };
    PendingTask.prototype.updateStatus = function (selectedItem) {
        var taskName = selectedItem.parentElement.lastElementChild;
        var id = selectedItem.id.split("")[0];
        if (selectedItem.checked) {
            taskName.classList.add("checked");
            tasks[id].status = "completed";
        }
        else {
            taskName.classList.remove("checked");
            tasks[id].status = "pending";
        }
        localStorage.setItem("task-list", JSON.stringify(tasks));
    };
    return PendingTask;
}());
//filters.forEach((btn) => {
//btn.addEventListener("click", () => {
//  activeElement.classList.remove("active");
//btn.classList.add("active");
//showTasks(btn.id);
// });
// });
var unfinishedTask = new PendingTask(tasks);
addButton.addEventListener("click", function () {
    if (taskTitle.value && taskDate.value && taskdesc.value) {
        filterPending.addEventListener("click", function () {
            var tasks = JSON.parse(localStorage.getItem("task-list"));
        });
        if (!tasks) {
            tasks = [];
        }
        var newTask = {
            title: taskTitle.value,
            desc: taskdesc.value,
            date: taskDate.value,
            status: "pending"
        };
        tasks.push(newTask);
        localStorage.setItem("task-list", JSON.stringify(tasks));
        taskTitle.value = "";
        taskdesc.value = "";
        taskDate.value = "";
        unfinishedTask.showTasks("pending");
    }
});
clearButton.addEventListener("click", function () {
    var tasks = JSON.parse(localStorage.getItem("task-list"));
    if (tasks) {
        tasks = [];
        localStorage.setItem("task-list", JSON.stringify(tasks));
    }
    unfinishedTask.showTasks("pending");
});
