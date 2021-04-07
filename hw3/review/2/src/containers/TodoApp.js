import React, { useState } from 'react';
//components
import Header from "../components/Header";
// import Todo from "../components/Todo";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";


function App() {
  
  const [ todoList, setTodoList ] = useState([]);
  const [ mode, setMode ] = useState("All");

  const handleToggle = (itemId) => {
    let mapped = todoList.map(task => {
      return task.id === Number(itemId) ? { ...task, complete: !task.complete } : { ...task};
    });
    setTodoList(mapped);
  }

  const handleFilter = () => {
    let filtered = todoList.filter(task => {
      return !task.complete;
    });
    setTodoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...todoList];
    // todoList.length + 1
    copy = [...copy, { id: todoList.length, task: userInput, complete: false }];
    setTodoList(copy);
  }

  const deleteTask = (itemId) => {
    
    let index = todoList.findIndex(obj => obj.id === Number(itemId))

    const temp = [...todoList];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setTodoList(temp);
  }

  var completedNum = 0;
  var i;
  for (i = 0 ; i < todoList.length ; i++) {
    if(todoList[i].complete === true) {
      completedNum++ ;
    }
  }

  const display = (e, mode) => {
    e.preventDefault();
    setMode(mode);
  }


  return (


    <div id="root" className="todo-app__root">
        <Header text="釷渡" />
        <section className="todo-app__main">
            <TodoForm addTask={addTask}/>
            <ul className="todo-app__list" id="todo-list">
 
                <TodoList todoList={todoList} handleToggle={handleToggle} handleFilter={handleFilter} deleteTask={deleteTask} displayMode={mode}/>
            </ul>
        </section>
        {todoList.length !== 0 ? 
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">
                {todoList.length - completedNum} left
            </div>
            <ul className="todo-app__view-buttons">
                <button className = "button" onClick={(event) => display(event, "All")} style={mode ==='All' ? {color: "rgb(243,12,12)"}:{}}>All</button>
                <button className = "button" onClick={(event) => display(event, "Active")} style={mode ==='Active' ? {color: "rgb(243,12,12)"}:{}}>Active</button>
                <button className = "button" onClick={(event) => display(event, "Completed")} style={mode ==='Completed' ? {color: "rgb(243,12,12)"}:{}}>Completed</button>
            </ul>
            
            <div className="todo-app__clean" style={completedNum === 0 ? {visibility:"hidden"}:{visibility:""}}>
                <button className = "button" onClick={handleFilter}>Clear completed</button>
            </div>
            
            
        </footer>
        : ""
        }
        
    </div>

    
  );
}

export default App;
