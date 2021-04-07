import React, { Component } from "react";
import Header from "../components/Header";
import Item from "./Item";
import Foooter from "../components/foooter";

class TodoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            count: 2,
            List : [
                {id:0,content:"first todo",show:1,done:true},
                {id:1,content:"second todo",show:1,done:false},
            ],
        };
    }


    deletebtn = (id) => {
        let List = [...this.state.List];
        List = List.filter((item)=>item.id !== id);
        this.setState(state=>({List:List}));
        console.log('delete id');
    }

    change_state = (id) => {
      
        console.log('in change_state');
        for (let i =0;i< this.state.List.length;i++){
            if(this.state.List[i].id === id){
                let List = [...this.state.List];
                List[i].done === true? List[i].done = false:List[i].done = true;
                this.setState(state=>({List:List}));
            }
        }

        
    }


    enter_text = e => {
        try{
            if(e.key === "Enter"){
                let new_item = { id:this.state.count,content:e.target.value,show:1,done:0};
                this.setState( state => ({ List: state.List.concat(new_item),count:state.count+1}));
                e.target.value = '';
            }
        } catch(error){
            console.log(error);
        };
    }

    


    // todoList_state = () => {console.log('in todoclick function');};

    render() {

        let DoneList = this.state.List.filter((item)=>item.done !==true);



        return (
            <>
                <Header text="todos" />

                <section className="todo-app__main">
                    <input className="todo-app__input" onKeyDown={this.enter_text} />
                    <ul className="todo-app__list" id="todo-list">
                        {this.state.List.map(item => <Item item={item} key={item.id} detailChange={()=>{this.change_state(item.id)}} deleteFunc={()=>{this.deletebtn(item.id)}}/>)}
                    </ul>
                </section>

                <Foooter listLen={DoneList.length}/>
            </>
        )
    }
}

export default TodoApp;
