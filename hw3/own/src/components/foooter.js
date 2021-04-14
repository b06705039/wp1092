import React, {Component} from "react";

class Foooter extends Component {
    render() {

        let show1 = <></>;
        let show2 = <></>;

        if(this.props.ListLen > 0){
            show1 = <>
                        <div className="todo-app__total">
                            <span>{this.props.DoneLen}</span>
                            <span> left</span>
                        </div>
                        <ul className="todo-app__view-buttons">
                            <button className="All" onClick={this.props.filter_func}>All</button>
                            <button className="Active" onClick={this.props.filter_func}>Active</button>
                            <button className="Completed" onClick={this.props.filter_func}>Completed</button>
                        </ul>
                    </>;
        }

        if(this.props.ListLen === 0){
            show2 = <div className="todo-app__clean"><button className="clean" style={{visibility:"hidden"}}>Clear completed</button></div>;
        }
        else{
            show2 = <div className="todo-app__clean"><button className="clean" onClick={this.props.filter_func}>Clear completed</button></div>;
        }


        return (
            <div className="todo-app__footer" id="todo-footer">
                {show1}
                {show2}
            </div>
        );
    }
}

export default Foooter;