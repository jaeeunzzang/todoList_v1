var data = [
  //객체변수
  { id: 0, title: "test", complete: false },
  { id: 1, title: "test2", complete: true },
];

var list = document.getElementById("list"); //할 일 목록 (ul)
var completeList = document.getElementById("completeList"); //완료한 일 목록(ul)
var total = data.length; //리스트 갯수. 아이디에 추가해줄 변수
var addButton = document.getElementById("addButton"); //추가버튼

showItem(data); //data에 들어있는거 출력해주면서 시작

function addNew() {
  //새 할일 추가
  var addList = document.getElementById("addList"); //추가할 일 input 태그
  var title = addList.value;
  var lastTask = data[data.length - 1]; //현재 마지막으로 들어있는 데이터 값
  //console.log(lastTask);
  data.push({
    id: lastTask ? lastTask.id + 1 : 0,
    //마지막 데이터의 아이디값 +1. 들어있는 데이터가 없으면 아이디는 0으로 설정
    title: title,
    complete: false,
  });
  addList.value = ""; //입력값 초기화
  showItem(data);
}

function showItem(data) {
  list.innerHTML = ""; //리스트에 이미 출력되어있는거 지워주고
  completeList.innerHTML = "";

  /* var todo = data.filter((n) => !n.complete); //완료 안된일
  var doneList = data.filter((n) => n.complete); //완료 된 일 
  */

  var num = 0;
  for (num; num <= data.length - 1; num++) {
    if (data[num].complete == true) {
      //data[n]번째가 완료된 일이면
      var item = createItem(data[num]);
      completeList.append(item);
    } else {
      list.append(createItem(data[num]));
    }
  }
}

function createItem(taskItem) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  span.innerText = taskItem.title;
  var checkbox = checkboxCreate(taskItem);
  var del = deleteButton();

  checkbox.checked
    ? (span.style.textDecoration = "line-through")
    : (span.style.textDecoration = "none");
  li.id = taskItem.id;
  li.append(checkbox, span, del);

  return li;
}
function checkboxClick() {
  var thisData = this.parentElement;
  var span = thisData.children[1];
  console.log(thisData);

  if (this.checked) {
    //체크가 되면
    //data의 complete를 true로 바꿔줘야대는데 ..????
    span.style.textDecoration = "line-through";
    completeList.append(thisData);
  } else {
    span.style.textDecoration = "none";
    list.append(thisData);
  }
}
function checkboxCreate(taskItem) {
  var checkbox = document.createElement("input"); //체크박스
  checkbox.setAttribute("type", "checkbox");
  taskItem.complete ? (checkbox.checked = true) : (checkbox.checked = false);
  checkbox.onclick = checkboxClick;
  return checkbox;
}
function deleteButton() {
  var del = document.createElement("input"); //delete 버튼
  del.setAttribute("type", "button");
  del.setAttribute("value", "Del");
  del.setAttribute("class", "delete"); //css

  del.onclick = deleteList; //del클릭하면 deleteList함수실행
  return del;
}

function deleteList() {
  //리스트 삭제
  var li = this.parentElement; //클릭한 deleteButton의 부모태그를 선택해서 지워준다(li)
  li.remove();
}
