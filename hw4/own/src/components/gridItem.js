import React,{useState,useEffect} from 'react';
import styled from 'styled-components';


const Td = styled.td`
    
    
`;

const Input = styled.input`
        all: unset;
        border: 1px solid #F8F8F8;
        
        &:focus{
            border: 1px solid #187bcd;
        }
`;
// background-color:  ${(props.i==="-" | props.j==="-")? '#F8F8F8' : 'transparent'};
function Item(props){

    
    let id = "";
    (props.i==="-" | props.j==="-")?id ="index-"+props.i+props.j:id="grid-"+props.i+props.j;

    let classname = "";

    if (props.i==="-"){
        classname = "rowIndex";
        document.getElementById(id).setAttribute("style","background-color:#F8F8F8");
    }
    else if(props.j==="-"){
        classname = "colIndex";
        document.getElementById(id).setAttribute("style","background-color:#F8F8F8");
    }
    else{
        classname = "content";
    };

    

    const [value,setValue] = useState(props.content);
    const [active,setActive] = useState("active");
    


    function handleClick(e){
        console.log("in handleClick", e.type);
        e.target.focus(handleRef(e));

        if(active === "active"){
            e.type==="dblclick"?setActive("db"):setActive("focus");
        }
        
    } 

    function handleKey(e){
        let value = e.target.value;
        console.log("target value", value);
        if(active === "focus"){
            value = value.slice(-1);
            console.log("modified value", value);
            document.getElementById(id).value = "";
            setValue(value);
            setActive("active");
        }
        setValue(value);
        props.handleItem(value,props.i,props.j);
        setActive("active");

        // e.target.blur();
    }


    function handleRef(e){
        console.log("into focus e",e);
        document.getElementById("index-"+"-"+props.j).setAttribute("style","background-color:#DCDCDC");
        document.getElementById("index-"+props.i+"-").setAttribute("style","background-color:#DCDCDC");
    }

    function handleBlur(e){
        console.log("into blur",e.target);
        document.getElementById("index-"+"-"+props.j).setAttribute("style","background-color:#F8F8F8");
        document.getElementById("index-"+props.i+"-").setAttribute("style","background-color:#F8F8F8");
    }


    useEffect(() => {
        document.getElementById(id).value = value;
      return () => {
      };
    }, [value])
    
    return( 
        <Td className={classname}>
            <Input type="text" id={id} defaultValue={props.content} onDoubleClick={handleClick} onClick={handleClick} onKeyDown={handleKey} onBlur={handleBlur}/>
        </Td>
    );


    

}

export default Item;