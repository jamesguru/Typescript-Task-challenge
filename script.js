var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var taskTitle = document.querySelector(".title");
var taskdesc = document.querySelector(".description");
var taskDate = document.querySelector(".date");
var taskDate1 = document.querySelector(".date1");
var addButton = document.querySelector(".add-btn");
var taskBox = document.querySelector(".task-box");
var clearButton = document.querySelector(".clear-btn");
var filterPending = document.querySelector(".pending");
var task_title = document.querySelector(".task-title");
var filters = document.querySelectorAll(".filters span");
var tasks = JSON.parse(localStorage.getItem("task-list"));
var activeElement = document.querySelector("span.active");
var PendingTasks = /** @class */ (function () {
    function PendingTasks(tasks) {
        this.tasks = tasks;
        this.tasks = tasks;
    }
    PendingTasks.prototype.updateTask = function (updateId) {
        var tasks = JSON.parse(JSON.parse(localStorage.getItem("task-list")));
        if (taskTitle.value && taskdesc && taskDate) {
            tasks[updateId].title = taskTitle.value;
            tasks[updateId].desc = taskdesc.value;
            tasks[updateId].date = taskDate.value;
            localStorage.setItem("task-list", JSON.stringify(tasks));
            task_title.value = "";
            taskDate.value = "";
            taskDate.value = "";
            taskDate1.value = "";
        }
        this.showTasks("all");
    };
    PendingTasks.prototype.deleteTask = function (deleteId) {
        tasks.splice(deleteId, 1);
        localStorage.setItem("task-list", JSON.stringify(tasks));
        this.showTasks("all");
    };
    PendingTasks.prototype.updateStatus = function (selectedItem) {
        console.log("updating thiis");
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
    PendingTasks.prototype.showTasks = function (filter) {
        var li = "";
        if (tasks) {
            tasks.forEach(function (task, id) {
                var isCompleted = task.status == "completed" ? "checked" : "";
                if (filter == task.status || filter == "all") {
                    li += "\n      \n    \n          \n      \n            <li class=\"task\">\n      \n                    <label for=\"".concat(id, "\">\n      \n      \n                    \n                    \n                    <input onclick = {this.updateStatus(this)} type=\"checkbox\" id=\"").concat(id, " class=\"input-checkbox\">\n      \n                     <p class=\"").concat(isCompleted, "\">").concat(task.title, "</p>\n      \n      \n                    \n                    </label>\n      \n      \n                 \n      \n                  \n                    <button class=\"update\" onclick = {this.updateTask(").concat(id, ")}>Update</button>\n      \n      \n                   <button class=\"delete\" onclick = {this.deleteTask(").concat(id, ")}>Delete</button>\n      \n                    \n      \n                    \n      \n                   \n                </li>\n       \n            ");
                }
            });
        }
        else {
            taskBox.innerHTML = "<li class=\"warning\">No task is added.</li>";
        }
        taskBox.innerHTML = li;
    };
    return PendingTasks;
}());
var completedTask = /** @class */ (function (_super) {
    __extends(completedTask, _super);
    function completedTask() {
        return _super.call(this, tasks) || this;
    }
    return completedTask;
}(PendingTasks));
var unfinishedTask = new PendingTasks(tasks);
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
            deadline: taskDate1.value,
            status: "pending"
        };
        tasks.push(newTask);
        localStorage.setItem("task-list", JSON.stringify(tasks));
        taskTitle.value = "";
        taskdesc.value = "";
        taskDate.value = "";
        taskDate1.value = "";
        unfinishedTask.showTasks("all");
    }
    else {
        taskBox.innerHTML = "<li class=\"warning\">Please make sure you have entered values to proceed.</li>";
    }
});
filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
        activeElement.classList.remove("active");
        btn.classList.add("active");
        unfinishedTask.showTasks(btn.id);
    });
});
clearButton.addEventListener("click", function () {
    var tasks = JSON.parse(localStorage.getItem("task-list"));
    if (tasks) {
        tasks = [];
        localStorage.setItem("task-list", JSON.stringify(tasks));
    }
    unfinishedTask.showTasks("all");
});
