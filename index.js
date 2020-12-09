var data = [
  { id: 0, title: "test", complete: false },
  { id: 1, title: "test2", complete: true },
];

var total = data.length; //리스트 갯수. 아이디에 추가해줄 변수
function appendItem() {
  //데이터 가져올때

  var checked = data.complete == true ? true : false; //체크여부
}
function addNew() {
  //새로 추가버튼 눌럿을때
  var list = document.getElementById("list"); //할 일 목록 (ul)
  var text = document.getElementById("addList").value; //addList에 입력된 값 가져오기
  if (text.length < 1) {
    //입력된 값이 없으면
    alert("할일을 입력하세요");
    return false;
  } else {
    data.push({ id: total, title: text, complete: false }); //data 배열 맨 뒤에 push
    document.getElementById("addList").value = ""; //input text 값은 초기화
  }
  console.log(data);
  var item = createItem(text, total, false); //새로 추가니까 일단 false로 들어간다.

  list.append(item); //todo list에 li태그를 붙여준다
  showItem(data);
}

function showItem(data) {
  //data 출력해줄 함수 view
}

function createItem(taskTitle, id, checked) {
  //listItem 생성 함수 : 할일, id, 체크여부 인자로 받아옴
  var item = document.createElement("li"); // li태그 생성
  var span = document.createElement("span");
  span.innerText = taskTitle; //span태그 안에 text값을 textValue로 넣어준다

  var check = checkStatus(checked);
  var del = deleteButton();
  var edit = editButton();

  item.id = "li" + id; //id에 토탈값넣어서 구분할수있게 해준당
  item.append(check, span, del, edit); //아이디 설정해준 li태그안에 체크박스, span, button을 붙여준다

  return item; //item return
}
function checkStatus(checked) {
  var check = document.createElement("input"); //input태그생성
  check.setAttribute("type", "checkbox"); //input type= checkbox로 설정
  check.setAttribute("checked", checked);

  check.onclick = updateList; //체크박스 클릭하면 updateList함수 실행
  return check;
}
function editButton() {
  var edit = document.createElement("input"); //edit버튼
  edit.setAttribute("type", "button");
  edit.setAttribute("value", "Edit");
  edit.setAttribute("class", "edit");

  edit.onclick = editList;
  return edit;
}
function deleteButton() {
  var del = document.createElement("input"); //delete 버튼
  del.setAttribute("type", "button");
  del.setAttribute("value", "Del");
  del.setAttribute("class", "delete"); //css

  del.onclick = deleteList; //del클릭하면 deleteList함수실행
  return del;
}
function updateList() {
  //체크박스 누를때 줄그어주고 옮겨주고 하는 함수
  var re_ck = this.id.replace("ck", ""); //누른 체크박스의 아이디를 받아서 숫자만 가져온다
  //  console.log(re_ck);
  var re_sp = document.getElementById("sp" + re_ck);
  var re_li = document.getElementById("li" + re_ck);
  //각 태그 id에 받아온 숫자 추가해서 같은 줄에 있는 태그들 선택가능하게 해준다
  if (this.checked) {
    //체크박스 check가 true일때
    re_sp.style.textDecoration = "line-through"; //span태그의 text에 줄그어준다
    todoDone(re_li); //todoDone 함수 호출. 인자로 li가져간다
  } else if (!this.checked) {
    //체크박스 check가 false일때
    re_sp.style.textDecoration = "none"; //줄그은거 취소하고
    todoList(re_li); //todoList함수 호출
  }
}

function deleteList() {
  //리스트 삭제
  var li = this.parentElement; //클릭한 deleteButton의 부모태그를 선택해서 지워준다(li)
  li.remove();
}

function editList() {
  //리스트 수정 --다시해보깅
  var editId = this.id.replace("edit", "");
  var span = document.getElementById("sp" + editId);

  var inputText = span.innerHTML; //text value에 span태그 사이 값 넣어준다
  console.log(inputText);

  var toggleEdit = span.querySelector("input"); //현재 span안에 input태그가 들엇으며는
  var input = document.getElementById(editId);

  if (toggleEdit) {
    span.innerHTML = input.value;
  } else {
    span.innerHTML =
      "<input type='text'id='" + editId + "' value=" + inputText + ">";
    //input text태그로 바꾸고,,, value에 원래 값 넣어준다 id는 숫자로 설정
    editId.value = span.innerHTML;
  }
}

function todoDone(re_li) {
  //완료한 할일 함수
  var doneList = document.getElementById("completeList"); //받아온 li 붙여줄 ul태그
  doneList.appendChild(re_li); //append 해도 되긴하는데 무슨차이인지,,??
}

function todoList(re_li) {
  //다시 할일목록으로 옮기는 함수
  var list = document.getElementById("list");
  list.appendChild(re_li);
}
