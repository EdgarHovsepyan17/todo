//selectors
const todoInput=document.querySelector(".todo-input")
const todoButton=document.querySelector(".todo-button")
const todoList=document.querySelector(".todo-list")
const filterOption=document.querySelector(".todo-filter")

//event listeners
document.addEventListener("DOMContentLoaded",getTodos())
todoButton.addEventListener('click',addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo)

//functions

//add todo function
function addTodo(event){
    event.preventDefault();
    if(todoInput.value==="") return
    //create todo div 
    const todoDiv=document.createElement("div")
    todoDiv.classList.add("todo-div");

    //create todo li
    const newTodo=document.createElement("li")
    newTodo.classList.add("new-todo");
    newTodo.innerText=todoInput.value;
    saveTodosInStorage(todoInput.value)
    todoDiv.appendChild(newTodo);

    //create complete button
    const completedButton=document.createElement("button")
    completedButton.classList.add("completed-button");
    completedButton.innerHTML='<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //create trash button
    const trashButton=document.createElement("button")
    trashButton.classList.add("trash-button");
    trashButton.innerHTML='<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //appending child
    todoList.appendChild(todoDiv);
    todoInput.value=""
}

//delete or check todo function
 function deleteCheck(e){
    const item=e.target;

    //delete
    if(item.classList[0]==="trash-button"){
        const toDo=item.parentElement;
        toDo.classList.add('fall')
        
        let newTodo=toDo.querySelector(".new-todo")
        const todoText=newTodo.innerText;
        let todosInStorage=JSON.parse(localStorage.getItem("todos"));
        for(let i=0;i<todosInStorage.length;i++){
            let currentTodo=todosInStorage[i];
            if(currentTodo.text===todoText){

                if(currentTodo.status==="completed"){
                    if(!toDo.classList.contains("completed")){
                        continue
                    }
                }

                todosInStorage.splice(i,1)
                break
            }
        }
        localStorage.clear();
        localStorage.setItem("todos",JSON.stringify(todosInStorage))

        toDo.addEventListener("transitionend",function(){
            toDo.remove()
        })
    };

    //check
    if(item.classList[0]==="completed-button"){
        const toDo=item.parentElement;
        let newTodo=toDo.querySelector(".new-todo")
        const todoText=newTodo.innerText;
        let todosInStorage=JSON.parse(localStorage.getItem("todos"));
        for(let i=0;i<todosInStorage.length;i++){
            let currentTodo=todosInStorage[i];
            if(currentTodo.text===todoText){
                if(currentTodo.status==="completed"){
                    currentTodo.status="uncompleted"
                }else currentTodo.status="completed"
                break;
            }
        }
        localStorage.clear();
        localStorage.setItem("todos",JSON.stringify(todosInStorage))
        toDo.classList.toggle('completed')
    }
 }

 function filterTodo(e){
    const todos=todoList.childNodes;

    for(let i=1;i<todos.length;i++){
        const todo=todos[i];
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else todo.style.display="none";    
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else todo.style.display="none";    
                break;                       
        }
    }
 }

function saveTodosInStorage(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else todos=JSON.parse(localStorage.getItem("todos"))

    todos.push({
        text:todo,
        status:"uncompleted"
    });
    localStorage.setItem("todos",JSON.stringify(todos));
 }

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else todos=JSON.parse(localStorage.getItem("todos"))

    todos.forEach(todo => {
        const todoDiv=document.createElement("div")
        todoDiv.classList.add("todo-div");
        if(todo.status==="completed"){
            todoDiv.classList.add("completed")
        }

        //create todo li
        const newTodo=document.createElement("li")
        newTodo.classList.add("new-todo");
        newTodo.innerText=todo.text;
        todoDiv.append( newTodo);

        //create complete button
        const completedButton=document.createElement("button")
        completedButton.classList.add("completed-button");
        completedButton.innerHTML='<i class="fa-solid fa-check"></i>';
        todoDiv.appendChild(completedButton);

        //create trash button
        const trashButton=document.createElement("button")
        trashButton.classList.add("trash-button");
        trashButton.innerHTML='<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        //appending child
        todoList.appendChild(todoDiv);
    });
}

