function app() {
  const inputTask = document.querySelector(".input-task");
  const btnAddTaks = document.querySelector(".btn-add-task");
  const tasks = document.querySelector(".tasks");

  function createTag(tag) {
    const element = document.createElement(tag);
    return element;
  }

  function clearInput() {
    inputTask.value = "";
    inputTask.focus();
  }

  function btnDelete(li) {
    li.innerText += " ";
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = `
    <span class="material-symbols-outlined">delete</span>
    `;
    btnDelete.setAttribute("class", "delete");
    btnDelete.setAttribute("title", "Apagar esta tarefa");
    li.appendChild(btnDelete);
  }

  function createTask(task) {
    const li = createTag("li");
    li.innerText = task;
    tasks.appendChild(li);
    clearInput();
    btnDelete(li);
    saveTasks();
  }

  inputTask.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      createTask(inputTask.value);
    }
  });

  btnAddTaks.addEventListener("click", function () {
    createTask(inputTask.value);
  });

  document.addEventListener("click", function (e) {
    const element = e.target;

    if (element.classList.contains("material-symbols-outlined")) {
      element.parentElement.parentElement.remove();
      saveTasks();
    }
  });

  function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const tasksList = [];

    for (let task of liTasks) {
      let textTask = task.innerText;
      textTask = textTask.replace("\ndelete", "").trim();
      tasksList.push(textTask);
    }

    const tasksJSON = JSON.stringify(tasksList);
    localStorage.setItem("tasks", tasksJSON);
  }

  function addSaveTasksToScreen() {
    const tasks = localStorage.getItem("tasks");
    const taskList = JSON.parse(tasks);

    for (let task of taskList) {
      createTask(task);
    }
  }
  addSaveTasksToScreen();
}
app();
