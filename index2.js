var data = [
  //객체변수
  { id: 0, title: "test", complete: false },
  { id: 1, title: "test2", complete: true },
];

var list = document.getElementById("list"); //할 일 목록 (ul)
var completeList = document.getElementById("completeList"); //완료한 일 목록(ul)
var total = data.length; //리스트 갯수. 아이디에 추가해줄 변수
var addButton = document.getElementById("addButton"); //추가버튼

function titled() {
  //할일 입력할 input태그
  var num = 0;
  for (num; num < total; num++) {
    console.log(data[num].title);
  }
}
function addNew() {
  var addList = document.getElementById("addList"); //추가할 일 input 태그
  var title = addList.value;
  var lastTask = data[data.length - 1]; //현재 마지막으로 들어있는 데이터 값
  console.log(lastTask);
  data.push({
    id: lastTask ? lastTask.id + 1 : 0,
    //마지막 데이터의 아이디값 +1. 들어있는 데이터가 없으면 아이디는 0으로 설정
    title: title,
    complete: false,
  });
  addList.value = "";
}

var searchButton = document.getElementById("search-btn");
var searchInput = document.getElementById("search-task");
searchButton.onclick = function () {
  var query = searchInput.value;
  showTasks(globalTasks.filter((t) => (query ? t.title.match(query) : true)));
};

function showTasks(tasks) {
  // remove all tasks
  incompleteTaskHolder.innerHTML = "";
  completedTasksHolder.innerHTML = "";

  var incomplete = tasks.filter((t) => !t.completed);
  var completed = tasks.filter((t) => t.completed);

  var favorite = incomplete.filter((t) => t.favorite);
  var notFavorite = incomplete.filter((t) => !t.favorite);
  for (let t of favorite) {
    incompleteTaskHolder.append(createNewTaskElement(t));
  }
  for (let t of notFavorite) {
    incompleteTaskHolder.append(createNewTaskElement(t));
  }

  for (let t of completed) {
    completedTasksHolder.append(createNewTaskElement(t));
  }
}

//New task list item
function createNewTaskElement(task) {
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbx
  checkBox.setAttribute("type", "checkbox");
  checkBox.onclick = () => onClickCheckbox(task.id);
  if (task.completed) {
    checkBox.setAttribute("checked", true);
  }
  //label
  var label = document.createElement("label"); //label
  //button.edit
  var favoriteButton = document.createElement("button"); //edit button

  //button.delete
  var deleteButton = document.createElement("button"); //delete button

  label.innerText = task.title;

  favoriteButton.innerText = "Favorite"; //innerText encodes special characters, HTML does not.

  if (task.favorite) {
    favoriteButton.className = "favorite";
  }

  favoriteButton.onclick = () => onClickFavorite(task.id);

  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = () => onClickDelete(task.id);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(favoriteButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function onClickCheckbox(id) {
  var task = globalTasks.find((t) => t.id === id);
  task.completed = !task.completed;
  showTasks(globalTasks);
}

function onClickFavorite(id) {
  var task = globalTasks.find((t) => t.id === id);
  task.favorite = !task.favorite;
  showTasks(globalTasks);
}

function onClickDelete(id) {
  var tasks = globalTasks.filter((t) => t.id !== id);
  globalTasks = tasks;
  showTasks(globalTasks);
}

showTasks(globalTasks);
