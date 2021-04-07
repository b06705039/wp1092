import React from 'react';
import Todo from './Todo';

const TodoList = ({todoList, handleToggle, handleFilter, deleteTask, displayMode}) => {
    var out = [];
    if(displayMode === "All") {
        for(let i = 0 ; i < todoList.length ; i++) {
            out.push(todoList[i]);
        }
    }

    else if(displayMode === "Active") {
        for(let i = 0 ; i < todoList.length ; i++) {
            if(todoList[i].complete === false) {
                out.push(todoList[i]);
            }
        }
    }

    else if(displayMode === "Completed") {
        for(let i = 0 ; i < todoList.length ; i++) {
            if(todoList[i].complete === true) {
                out.push(todoList[i]);
            }
        }
    }
    // console.log(out)
    // console.log(todoList)
    console.log(displayMode)

    return (
        <div>
            {out.map(todo => {
                return (
                    <Todo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} deleteTask={deleteTask} displayMode={displayMode}/>
                )
            })}
        </div>
    );
};

export default TodoList;