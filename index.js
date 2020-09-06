const BtnAdd = document.querySelector('#btn-add'),
    BtnSort = document.querySelector('#btn-sort'),
    todoInput = document.querySelector('#input-todo'),
    todoList = document.querySelector('#todo-list'),
    data = storageTodo('todo');

let todo = data ? data : [],
    mode = "add",
    todoId = "";


BtnAdd.addEventListener("click", addTodo);
BtnSort.addEventListener("click", sortByCompleted);

if (todo.length) {
    showTodo();
}

// show todo with lopping create element
function showTodo() {
    todoList.innerHTML = "";
    for (let i = 0; i < todo.length; i++) {
        todoList.innerHTML += `<li class="item">
                                ${todo[i].complete ? '<span class="checked">' : ''}${todo[i].text} ${todo[i].complete ? '</span>' : ''}
                                <a class="btn-edit" onclick="editTodo(${i})">Edit</a>
                                <a class="btn-delete" onclick="deleteTodo(${i})">Delete</a>
                                <a class="btn-edit" onclick="completeTodo(${i})">Complete</a>
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
        todo.push({
            text: val,
            complete: false
        });
        storageTodo('todo', todo, true);
    } else if (mode === "edit") {
        editedTodo(todoId, val);
        storageTodo('todo', todo, true);
    }

    mode = "add";
    BtnAdd.innerHTML = "add";
    todoId = "";
    todoInput.value = "";
    showTodo();
    // console.log(todoInput.value);
}

// find index todo berfore execute
function editTodo(i) {
    mode = "edit";
    BtnAdd.innerHTML = "edit";
    todoId = i;
    todoInput.value = todo[i].text;
    // console.log(todo[index]);
}

// execute edit todo
function editedTodo(i, newTodo) {
    todo.splice(i, 1, {
        ...todo[i],
        text: newTodo
    });
    showTodo();
}

// delete todo
function deleteTodo(i) {
    if (confirm(`Are you sure to delete ${todo[i].text}?`)) {
        todo.splice(i, 1);
        storageTodo('todo', todo, true);
    }
    showTodo();
}

// function to completed todo
function completeTodo(i) {
    if (todo[i].complete === false) {
        if (confirm(`click okay if you've been completed todo ${todo[i].text} !`)) {
            todo[i].complete = true;
            storageTodo('todo', todo, true);
        }
    } else {
        alert(`todo ${todo[i].text} has been completed !`)
    }
    showTodo();
}

// function to sort todo by completed todo
function sortByCompleted(i) {
    if (todo == "") {
        alert("you do not have any todo to sort !")
    } else {
        todo.sort(function(a, b) {
            return (a.complete - b.complete);
        });
    }
    console.log(todo);
    storageTodo('todo', todo, true);
    showTodo();
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
