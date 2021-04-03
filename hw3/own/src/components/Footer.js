import React, {Component} from "react";

class foooter extends Component{
    render(){
        return(
            <>
                <div class="todo-app__total">
                    <input id="2"></input>
                    <label id="2"></label>
                </div>
                <ul class="todo-app__view-buttons">
                    <button class="all"></button>
                    <button class="Active"></button>
                    <button class="Completed"></button>
                </ul>
                <div class="todo-app__clean"></div>
            </>
        )
    }
}

export default foooter;