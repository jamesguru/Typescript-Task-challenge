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
        console.log("item deleted");
        this.showTasks("all");
    };
    PendingTasks.prototype.updateStatus = function (selectedItem) {
        console.log("updating thiis");
        var taskName = selectedItem.parentElement.lastElementChild;
        var id = selectedItem.id.split("")[0];
        if (selectedItem.checked) {
            taskName.classList.add("checked");
            this.tasks[id].status = "completed";
        }
        else {
            taskName.classList.remove("checked");
            this.tasks[id].status = "pending";
        }
        localStorage.setItem("task-list", JSON.stringify(tasks));
        console.log("status updated");
        this.showTasks("all");
    };
    PendingTasks.prototype.showTasks = function (filter) {
        var li = "";
        if (tasks) {
            tasks.forEach(function (task, id) {
                var isCompleted = task.status == "completed" ? "checked" : "";
                if (filter == "pending" || filter == "all") {
                    li += "\n      \n    \n          \n      \n            <li class=\"task\">\n      \n                    <label for=\"".concat(id, "\">\n      \n      \n                    \n                    \n                    <input onclick = \"() => this.updateStatus(this)\" type=\"checkbox\" id=\"").concat(id, " class=\"input-checkbox\">\n      \n                     <p class=\"").concat(isCompleted, "\">").concat(task.title, "</p>\n      \n      \n                    \n                    </label>\n      \n      \n                 \n      \n                  \n                    <button class=\"update\" onclick = \"() => this.updateTask(").concat(id, ")\" >Update</button>\n      \n      \n                   <button class=\"delete\" onclick = \"() => this.deleteTask(").concat(id, ")\">Delete</button>\n      \n                    \n      \n                    \n      \n                   \n                </li>\n       \n            ");
                }
            });
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
    completedTask.prototype.showTasks = function (completed) {
        var li = "";
        if (tasks) {
            tasks.forEach(function (task, id) {
                var isCompleted = task.status == "completed" ? "checked" : "";
                if (completed == "completed" || completed == "all") {
                    li += "\n    \n  \n        \n    \n          <li class=\"task\">\n    \n                  <label for=\"".concat(id, "\">\n    \n    \n                  \n                  \n                  <input type=\"checkbox\" id=\"").concat(id, " class=\"input-checkbox\">\n    \n                   <p class=\"").concat(isCompleted, "\">").concat(task.title, "</p>\n    \n    \n                  \n                  </label>\n    \n    \n                 <button class=\"delete\" onclick = \"this.deleteTask(").concat(id, ")\">Delete</button>\n    \n                  \n    \n                  \n    \n                 \n              </li>\n     \n          ");
                }
            });
        }
        else {
            taskBox.innerHTML = "<li class=\"warning\">No task is added.</li>";
        }
        taskBox.innerHTML = li;
    };
    completedTask.prototype.deleteTask = function (deleteId) {
        tasks.splice(deleteId, 1);
        localStorage.setItem("task-list", JSON.stringify(tasks));
        this.showTasks("all");
    };
    return completedTask;
}(PendingTasks));
var unfinishedTask = new PendingTasks(tasks);
var finishedTask = new completedTask();
addButton.addEventListener("click", function () {
    if (taskTitle.value && taskDate.value && taskdesc.value) {
        filterPending.addEventListener("click", function () {
            var tasks = JSON.parse(localStorage.getItem("task-list"));
        });
        if (!tasks) {
            tasks = [];
        }
        var differenceinTime = differenceInTime(taskDate.value, taskDate1.value);
        var newTask = {
            title: taskTitle.value,
            desc: taskdesc.value,
            date: taskDate.value,
            deadline: taskDate1.value,
            status: "pending",
            diff: differenceInTime
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
    finishedTask.showTasks("all");
});
var differenceInTime = function (date, deadline) {
    var date1 = new Date("".concat(date));
    var date2 = new Date("".concat(deadline));
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
};
