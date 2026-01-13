let todos = [];

 const input = document.getElementById("input");
 const table = document.getElementById("table");

function loadTodos(){
    const saved = localStorage.getItem("todos");
    todos = saved ? JSON.parse(saved) : [
        {text: "Einkaufen", done: false}
    ];
}
function addTodo() {
   const value = input.value.trim();
     if (value === "") {
        alert("Bitte ein To-do eingeben!");
        input.focus();
        return;
    }

    todos.push({ text: value, done: false});

    currentFilter = "all"; 
    
    input.value = "";
    input.focus();
    saveTodos();
    renderTodos();
}

function renderTodos() {
    table.innerHTML = "";

    const filteredTodos = todos.filter((todo) => {
        if(currentFilter === "open") return !todo.done; 
        if(currentFilter === "done") return todo.done; 
        return true; 
    }); 
    
    filteredTodos.forEach((todo, filteredIndex) => {
        const realIndex = todos.indexOf(todo); 
        const row = table.insertRow();

        // Checkbox
        const checkCell = row.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        checkbox.onchange = () => toggleTodo(realIndex);
        checkCell.appendChild(checkbox);

        // Text
        const textCell = row.insertCell();
        textCell.textContent = todo.text;
        textCell.className = todo.done ? "done" : "";
        textCell.style.cursor = "pointer"; 
        textCell.onclick = () => editTodo(realIndex);

        // Löschen
        const deleteCell = row.insertCell();
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️"; 
        deleteBtn.setAttribute("aria-label", "To-do löschen")
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTodo(realIndex);
        }
        deleteCell.appendChild(deleteBtn);
    });
}

function toggleTodo(index) {
    todos[index].done = !todos[index].done;
    saveTodos(); 
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();

}

function editTodo(index) {
    const newText = prompt("To-do bearbeiten:", todos[index].text);
    if (newText !== null && newText.trim() !== "") {
        todos[index].text = newText.trim();
        saveTodos();
        renderTodos();
    }

}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

let currentFilter = 'all';
function setFilter(newFilter) {
    currentFilter = newFilter; 
    renderTodos(); 
}

// Programmstart
loadTodos();
renderTodos(); 