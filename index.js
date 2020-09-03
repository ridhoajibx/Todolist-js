const BtnAdd = document.querySelector('#btn-add'),
      todoInput = document.querySelector('#input-todo'),
      todoList = document.querySelector('#todo-list'),
      data = storageTodo('todo');

let todo = data ? data : [],
    mode = "add",
    todoId = "";


BtnAdd.addEventListener("click", addTodo);
todoList.addEventListener("click", isComplete);

if(todo.length){
    showTodo();
}

// show todo with lopping create element
function showTodo() {
   todoList.innerHTML = "";
   for (let i = 0; i < todo.length; i++) {
       todoList.innerHTML += `<li class="item"><span>${todo[i]}</span> 
                                <a class="btn-edit" onclick="editTodo(${i})">Edit</a>
                                <a class="btn-delete" onclick="deleteTodo(${i})">Delete</a>
                             </li>`       
   }
}

// add todo and update todo with another function
function addTodo(e) {
    e.preventDefault();
    let val = todoInput.value;

    if (val === "") {
        alert("empty todo not allowed!");
    } else if (mode === "add") {
        todo.push(val);
        storageTodo('todo', todo, true);
    }else if (mode === "edit") {
        editedTodo(todoId, val);
        storageTodo('todo', todo, true);
    }

    mode = "add";
    BtnAdd.innerHTML = "add";
    todoId ="";
    todoInput.value = "";
    showTodo();
    // console.log(todoInput.value);
}

// find index todo berfore execute
function editTodo(i) {
    mode = "edit";
    BtnAdd.innerHTML = "edit";
    todoId = i;
    todoInput.value = todo[i];
    // console.log(todo[index]);
}

// execute edit todo
function editedTodo(i, newTodo) {
    todo.splice(i, 1, newTodo);
    showTodo(); 
}

// delete todo
function deleteTodo(i) {
    if (confirm("Are you sure to delete?")) {
        todo.splice(i, 1);
        storageTodo('todo', todo, true);
    }
    showTodo();
}

// complete todo
function isComplete(e){
    const checked = e.target.classList.toggle('checked');
    e.target.tagName === 'SPAN' ? checked: null;
    console.log(e.target);
}

// get and set todo
function storageTodo(name, data = null, set = false) {
    if (set) {
        localStorage.setItem(name, JSON.stringify(data));
        return true;
    } else {
        return JSON.parse(localStorage.getItem(name));
    }
}