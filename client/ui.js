document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["title"].value;
  const description = taskForm["description"].value;
  const store = taskForm["store"].value;
  
  App.createTask(title, description,store);
});
