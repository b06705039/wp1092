import React, { Component, useState } from "react";
import Header from "../components/Header";

class TodoApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            pendingItem: "",
            count: 0,
            filter: "all",
        };
        this.id = 0;
        this.setFilter = this.setFilter.bind(this)
    }    
    addTodo = e => {
        const {todos, pendingItem} = this.state
        if(e.key === 'Enter') {
            this.setState({
                todos: [...todos, 
                    {
                        id: this.id,
                        content: pendingItem,
                    }
                ],
                pendingItem: '',
                count: this.state.count + 1
            });
            this.id++
        }
    }
    removeTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
        this.state.todos.map( (object) =>{
            if(object.id === id){
               object.checked ? this.setState({count:this.state.count}) : this.setState({count: this.state.count - 1});
            }
        })
    }
    inputTodo = e => {
        e.preventDefault();
        this.setState({ 
            pendingItem: e.target.value 
        });
    }
    handleChange = (id) =>{
        this.state.todos.map( (object) =>{
            if(object.id === id){
               object.checked = !object.checked;
               object.checked ? this.setState({count:this.state.count - 1}) : this.setState({count: this.state.count + 1});
            }
         });
        this.setState({todos: this.state.todos});  
        // localStorage.setItem('todos', this.state.todos); 
    }
    setFilter = (filter) =>{
        this.setState({filter: filter})
    }
    handleClear = () => {
        var clearList = this.state.todos.filter(todo => !todo.checked);
        this.setState({todos:clearList})
    }
    render() {
        // if (window.performance) {
        //     if (performance.navigation.type == 1) {
        //       console.log( "This page is reloaded" );
        //     } else {
        //       console.log( "This page is not reloaded");
        //     }
        //   }
        // window.onload = window.localStorage.clear();
        var filterList = [];
        
        if(this.state.filter === "all"){
            filterList = this.state.todos;
        }
        else if(this.state.filter === "active"){
            filterList = this.state.todos.filter(todo => !todo.checked);
        }
        else if(this.state.filter === "completed"){
            filterList = this.state.todos.filter(todo => todo.checked);
        }

        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input 
                        type="text" 
                        className="todo-app__input" 
                        onChange={this.inputTodo} 
                        value={this.state.pendingItem} 
                        onKeyPress={this.addTodo}
                        placeholder="What needs to be done?"
                        onInput={this.showFooter}
                    />
                    <div className="todolist__list" id = "todo-list">
                        {filterList.map(todo => (
                            <Todo todo={todo} key={todo.id} checked={todo.checked}removeTodo={this.removeTodo} handleChange={this.handleChange}/>
                        ))}
                    </div>
                </section>
                <footer className="todo-app__footer" id="todo-footer" style={{display: this.state.todos.length > 0 ? '' : 'none' }}>
                    <div className="todo-app__total">{this.state.count} left</div>
                    <Filter filter={this.state.filter} setFilter={this.setFilter}></Filter>
                    <div className="todo-app__clean">
                        <button className="todo-app__clean" onClick = {this.handleClear} style={{display: this.state.todos.filter(todo => todo.checked).length > 0 ? '' : 'none' }}>Clear completed</button>
                    </div>
                </footer>
            </>
        );
    }
}

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           checked: false,
        };
    }
    
    delete = () => {
        const { todo, removeTodo } = this.props
        removeTodo(todo.id)
    }
    editing = (e) => {
        const { editTodo, todo } = this.props
        editTodo(todo.id, todo.content)
    }
    onClickChange = (id) => {
        const { handleChange } = this.props
        handleChange(id)
    }
    render(){
        const {todo} = this.props;
        const style = {
            textDecoration: "line-through",
            opacity: 0.5
        };
        let checkBox;
        if (todo.checked) {
            checkBox = <h1 class="todo-app__item-detail" style={style}>{todo.content}</h1>
        } 
        else{
            checkBox = <h1 class="todo-app__item-detail">{todo.content}</h1>
        }
        return (
            <li className = "todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" key = {todo.id} id={todo.id} checked={this.props.checked} onChange={() => this.onClickChange(todo.id)}/>
                    <label htmlFor={todo.id}></label>
                </div>
                {checkBox}
                <img src="./img/x.png" alt="" className="todo-app__item-x" onClick={this.delete}/>
            </li>
        );
    } 
}

class Filter extends Component {
    constructor(props) {
        super(props)
    }
    setFilterAll = e => {
        e.preventDefault();
        this.props.setFilter("all")
    };
    setFilterActive = e => {
        e.preventDefault();
        this.props.setFilter("active")
    };
    setFilterCompleted = e => {
        e.preventDefault();
        this.props.setFilter("completed")
    };
    render(){
        return (
            <ul className="todo-app__view-buttons">
                <button className="todo-app__view-buttons"onClick={this.setFilterAll} >All</button>
                <button className="todo-app__view-buttons" onClick={this.setFilterActive}>Active</button>
                <button className="todo-app__view-buttons" onClick={this.setFilterCompleted}>Completed</button>
            </ul>
        );
    } 
}

export default TodoApp;