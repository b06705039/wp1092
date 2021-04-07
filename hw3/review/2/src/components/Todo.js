import React from 'react';

const Todo = ({todo, handleToggle, deleteTask}) => {

    const handleClick = (e) => {
        // e.preventDefault()
        handleToggle(e.currentTarget.id)
    }  

    const handleDelete = (e) => {
        // e.preventDefault()
        let itemId = e.target.getAttribute("alt")
        deleteTask(itemId)
    }


    return (

        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick} checked={todo.complete}/>
                <label htmlFor={todo.id}/>  
            </div>
            <h1 className={todo.complete ? "todo-app__item-detail completed" : "todo-app__item-detail"}>
                {todo.task}
            </h1>
            <img src = "./img/x.png" className="todo-app__item-x" alt={todo.id} onClick={handleDelete}>

            </img>
        </li>
    );
};

export default Todo;