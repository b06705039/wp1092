import React, { useState } from 'react';

const TodoForm = ({ addTask }) => {

    const [ userInput, setUserInput ] = useState("");

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userInput !== "") {     
            addTask(userInput);
            setUserInput("");
        }
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <input className="todo-app__input" value={userInput} type="text" placeholder="What need to be done?" onChange={handleChange}/>
        </form>
    );
};

export default TodoForm;