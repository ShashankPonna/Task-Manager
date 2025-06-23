document.addEventListener("DOMContentLoaded", function () {
  let newTask = document.querySelector("#new-task");
  let addTask = document.querySelector("#add-task");
  let taskBox = document.querySelector("ul");
  let checked = false;


  function taskAdder(task = newTask.value.trim(),isChecked = false){  

        // let task = newTask.value.trim();
        if (task != "") {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkBox" class="check-box" ${isChecked? "checked" : ""} >
            <span>${task}</span>
            <div class="icons">
            <i class="fa-solid fa-pencil"></i>
            <i class="fa-solid fa-trash"></i>
            </div>
            `;

        let checkBox = li.querySelector(".check-box");
        checkBox.addEventListener("change",()=>{
            saveTaskLocalStorage()
        })

        li.querySelector(".fa-pencil").addEventListener("click", () => {
            newTask.value = li.querySelector("span").textContent;
            li.remove();
            saveTaskLocalStorage()
        });
        li.querySelector(".fa-trash").addEventListener("click", () => {
            li.remove();
            saveTaskLocalStorage()
        });

        taskBox.appendChild(li);
        li.classList.add("task-style");
        newTask.value = "";
        task = "";
        saveTaskLocalStorage()
    }
  }

  let saveTaskLocalStorage = ()=>{
    let allTasks = Array.from(taskBox.querySelectorAll("li")).map(li =>({
        text: li.querySelector("span").textContent,
        completed : li.querySelector(".check-box").checked
    }))
    localStorage.setItem("allTasks",JSON.stringify(allTasks))
  } 

  const loadTaskLocalStorage = () =>{
    const savedTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    savedTasks.forEach((task) => {
        taskAdder(task.text,task.completed);
        
    });
  }

  addTask.addEventListener("click", () => {
    taskAdder();
    saveTaskLocalStorage();
  });

  newTask.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        taskAdder();
        saveTaskLocalStorage()
    }
  })

  loadTaskLocalStorage()
;
});
