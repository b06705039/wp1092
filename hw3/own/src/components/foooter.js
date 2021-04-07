import React, {Component} from "react";

class Foooter extends Component {
    render() {
        return (
            <div className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">
                    <span>{this.props.listLen}</span>
                    <span> left</span>
                </div>
                <ul className="todo-app__view-buttons">
                    <button className="all">all</button>
                    <button className="Active">active</button>
                    <button className="Completed">completed</button>
                </ul>
                <div className="todo-app__clean">clean</div>
            </div>
        );
    }
}

export default Foooter;