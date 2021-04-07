import React, { Component } from "react";
import Header from "../components/Header";
import Item from "./Item";
import Foooter from "../components/foooter";

class TodoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            List : [
            ],
            filter_mode: "all",
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
                let new_item = { id:this.state.count,content:e.target.value,show:1,done:false};
                this.setState( state => ({ List: state.List.concat(new_item),count:state.count+1}));
                e.target.value = '';
            }
        } catch(error){
            console.log(error);
        };
    }
    
    filterList = (e) => {
        console.log(e.target.className);
        if(e.target.className==="Active"){
            this.setState(state=>({filter_mode:"active"}));
        }
        else if(e.target.className==="Completed"){
            this.setState(state=>({filter_mode:"completed"}));
        }
        else if(e.target.className==="All"){
            this.setState(state=>({filter_mode:"all"}));
        }
        else if(e.target.className==="clean"){
            console.log(this.state.List);
            this.setState(state=>({List:[...state.List.filter((item)=>item.done===false)]}));
            console.log(this.state.List);
        }
    }
    


    render() {

        let DoneList = [...this.state.List.filter((item)=>item.done !==true)];
        let List = [...this.state.List];
        if(this.state.filter_mode==="active"){
            List = List.filter((item)=>item.done!==true);
        }
        else if(this.state.filter_mode==="completed"){
            List = List.filter((item)=>item.done===true);
        }


        return (
            <>
                <Header text="todos" />

                <section className="todo-app__main">
                    <input className="todo-app__input" placeHolder="What needs to be done?" onKeyDown={this.enter_text} />
                    <ul className="todo-app__list" id="todo-list">
                        {List.map(item => <Item item={item} key={item.id} detailChange={()=>{this.change_state(item.id)}} deleteFunc={()=>{this.deletebtn(item.id)}}/>)}
                    </ul>
                </section>

                <Foooter DoneLen={DoneList.length} ListLen={this.state.List.length} filter_func={this.filterList} />
            </>
        )
    }
}

export default TodoApp;
