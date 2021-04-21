import React,{useState,useEffect} from 'react';
import styled from 'styled-components';


const Td = styled.td`
    font-size: 13px;
    width: 105px;
    height: 15px;
    padding: 0;
    
`;

const Input = styled.input`
    all: unset;
    border: 1px solid #F8F8F8;

    &:focus{
        border: 1px solid #187bcd;
    }
`;


function Item(props){

    const id = "grid-"+props.i+props.j;
    const [active,setActive] = useState("active");


    function handleClick(e){
        console.log("in handleClick", e.type);

        e.type==="dblclick"?setActive("active"):setActive("focus");

        console.log("-"+props.i,"grid--"+props.j);
        // document.getElementById("grid-"+props.i+"-").setAttribute("style","background-color:#DCDCDC");
        // document.getElementById("grid--"+props.j).setAttribute("style","background-color:#DCDCDC");
        

    }  

    function handleKey(e){
        console.log("in handlekey",e,e.target.value);

        let value = e.target.value;
        console.log("target value", value);
        if(active === "focus"){
            value = value.slice(-1);
            console.log("modified value", value);
            document.getElementById(id).value = "";
            setActive("active");
        }
        props.handleItem(value,props.i,props.j);

    }

    
    return( 
        <Td>
            <Input type="text" id={id} defaultValue={props.content} onDoubleClick={handleClick} onClick={handleClick} onKeyDown={handleKey}/>
        </Td>
    );

}

export default Item;