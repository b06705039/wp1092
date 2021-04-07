import React, {Component} from 'react';
import Checkbox from '../components/checkbox';

class Item extends Component{

    constructor(props){
        super(props);
        this.state = {
            check: false,
        }
        
    }
    
    render(){

        let Detail;
        console.log(this.props.item.done);
        if(this.props.item.done===true){
            console.log('into true');
            Detail = <h1 className="todo-app__item-detail" style={{textDecoration: 'line-through'}}>{this.props.item.content}</h1>;
        }
        else{
            Detail = <h1 className="todo-app__item-detail">{this.props.item.content}</h1>;
        }
 
        return(
            <li className="todo-app__item" key={this.props.item.id} >
                <Checkbox item={this.props.item} onchange={this.props.detailChange}/>
                {Detail}
                <img src="./img/x.png" className="todo-app__item-x" alt="" onClick={this.props.deleteFunc} />
                
            </li>

        )
    }
}

export default Item;