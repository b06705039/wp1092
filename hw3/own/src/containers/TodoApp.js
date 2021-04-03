import React, { Component } from "react";
import Header from "../components/Header";
import Item from "../components/Main_item";
import Foooter from "../components/foooter";

class TodoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            items :{
                
            },
        };
    }

    enter_text = (e) => {
        if(e.key === "Enter"){

            let new_item = {id:0, detail:e.target.value, status:1};
            this.setState( state => ({ 
                                        items: state.items.push(new_item)
                                    })
                        );

            console.log(new_item);
        }
    }

    render() {
        return (
            <>
                <Header text="todos" />

                <div className="todo-app__main">
                    <input className="todo-app__input" onKeyDown={this.enter_text.bind(this)} />
                    <ul className="todo-app__list">
                        <Item className="todo-app__item" />
                    </ul>
                </div>

                <Foooter />
            </>
        );
    }
}

export default TodoApp;
