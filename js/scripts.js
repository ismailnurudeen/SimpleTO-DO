// window.onerror = function (msg, url, line) {
//   console.log("Message: " + msg);
//   console.log("URL: " + url);
//   console.log("Line: " + line);
// }

//universal variables
var checkList;
var items;
var inputBox;
var deleteBtn;
var keynum;

//if user Browser is inernet explorer
if (navigator.appName === "Microsoft Internet Explorer") {
  var elements = document.all;
  elements[3].innerHTML = "<h1>Sorry! your Browser is not Supported!!!<br><br>Please open App in a Supported Browser E.g Chrome,FireFox.<br><br>Thanks.</h1>";
  elements[3].style.background = "red";
  elements[3].style.paddingTop = "100px";
  elements[3].style.color = "#fff";
} else {
  function initializeVars() {
    checkList = document.getElementById("checkList");
    items = checkList.querySelectorAll("li");
    inputBox = checkList.querySelectorAll("input");
    deleteBtn = checkList.querySelectorAll("button");
    keynum = items.length;
  }

  function addListener() {
    initializeVars();
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", editItem);
      inputBox[i].addEventListener("blur", updateItem);
      inputBox[i].addEventListener("keypress", itemKeyPress);
      deleteBtn[i].addEventListener("click", deleteItem);
    }
  }
  addListener();

  function editItem() {
    this.className = "edit";
    var input = this.querySelector("input");
    input.focus();
    input.setSelectionRange(0, input.value.length);
  }

  function updateItem() {
    // this.previousElementSibling.innerHTML = this.value;
    // this.parentNode.className = "";
    // var key="item"+keynum;
    // if(this.value!==""){
    //     saveList(key,this.value);
    // }
    console.log(this.dataset);

  }

  function itemKeyPress(event) {
    if (event.keyCode === 13) {
      updateItem.call(this);
    }
  }

  function addItem() {
    var listItem = document.createElement("li");
    var span = document.createElement("span");
    var input = document.createElement("input");
    var btn = document.createElement("button");
    btn.innerHTML = "X";
    listItem.appendChild(span);
    listItem.appendChild(input);
    listItem.appendChild(btn);
    listItem.className = "edit";
    checkList.appendChild(listItem);
    input.setAttribute("data-id",keynum);
    input.focus();
    addListener();
    keynum++;
  }

  function deleteItem() {
    checkList.removeChild(this.parentNode);
    keynum--;

  }

  function saveList(key, itemToSave) {
    localStorage.setItem(key, itemToSave);
  }

  function loadItems() {
    initializeVars();
    var storedItem = localStorage.getItem("todo");

    if (storedItem !== "" && storedItem !== null) {
      for (var i = 1; i <= storedItem.length; i++) {
        var listItem = document.createElement("li");
        var span = document.createElement("span");
        var input = document.createElement("input");
        var btn = document.createElement("button");
        btn.innerHTML = "X";
        input.value = storedItem[i].task;
        span.innerHTML = storedItem[i].task;
        listItem.appendChild(span);
        listItem.appendChild(input);
        listItem.appendChild(btn);
        checkList.appendChild(listItem);
        addListener();
      }
    }
  }

  loadItems();
}