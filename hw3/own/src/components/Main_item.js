import React, {Component} from 'react';

class Item extends Component{

    add_list = (event) => {}

    render(){
        return(
            <>
                <div className="todo-app__checkbox">
                    <input id="2"></input>
                    <label forhtml="2"></label>
                </div>
                <h1 className="todo-app__item-detail">This is todo item1.</h1>
                <img src="./img/x.png" className="todo-app__item-x" alt=""></img>
            </>

        );
    }
}

export default Item;