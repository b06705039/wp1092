import React, { Component } from "react";

export class Foooter extends Component {
    render() {
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">
                    <input id="2">2</input>
                    <label id="2">left</label>
                </div>
                <ul className="todo-app__view-buttons">
                    <button className="all">all</button>
                    <button className="Active">active</button>
                    <button className="Completed">completed</button>
                </ul>
                <div className="todo-app__clean">clean</div>
            </footer>
        );
    }
}

export default Foooter;