import React,{useState} from 'react';

function Btn(props){


    function handleClick(e){
        console.log("into click");
        props.handleclick(e);


    }


    return <button id={props.id} onClick={handleClick}>{props.text}</button>;

}

export default Btn;
