import React,{Component} from "react";



class Checkbox extends Component{

    

    render(){
        return(
            <div className="todo-app__checkbox" >
                <input type="checkbox" id={this.props.item.id} defaultChecked={this.props.item.done} onChange={this.props.onchange} />
                <label htmlFor={this.props.item.id} />
            </div>
        )
    }
}



export default Checkbox;