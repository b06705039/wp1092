import React,{useState,useEffect,useContext} from 'react';
import styled from 'styled-components';


const Td = styled.td`
    font-size: 13px;
    width: 94px;
    height: 20px;
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

    // const [active,setActive] = useState("inactive");
    
    const [value,setValue] = useState(props.content);
    const [deleteAll,setDeleteAll] = useState(true);
    const {SheetContent,setSheetContent} = useContext(SheetContent);


    function handleChange(e){
        if(deleteAll){
            console.log("delete");
            setValue("");
            // props.handleItem(value,props.i,props.j);
            let temp = SheetContent;
            temp[props.i][props.j] = SheetContent;
            setSheetContent(temp);
            setDeleteAll(false);
        }
        else{
            setValue(e.target.value);
            
        }
    }
    // useEffect(() => {
    //     console.log("into effect");
    //     props.handleItem(value,props.i,props.j);
    //     console.log(active,value);
    // },[value,active]);

    function onkeydown(e){
        console.log("into onkey");

        if(e.key === "Enter"){
            let temp = SheetContent;
            temp[props.i][props.j] = SheetContent;
            setSheetContent(temp);
            // props.handleItem(value,props.i,props.j);
            // setValue(e.target.value);
            // setActive("inactive");
            // console.log('enter',e.target.value)
        }
        // else{
        //     props.handleItem(value,props.i,props.j);
        //     if(active==="focus"){ console.log("into else focus");setValue(""); }
        //     setActive("active");
        // }
    };
    return( 
        <Td>
            <Input defaultValue={value} onChange={handleChange} onKeyDown={onkeydown} onClick={()=>setDeleteAll(true)} onDoubleClick={()=>setDeleteAll(false)} onBlur={()=>setDeleteAll(true)} />
            {/* <Input defaultValue={props.content} onKeyDown={(e)=>props.itemInfo.handleItem(e,props.itemInfo.rowInfo[0],props.j)} /> */}
        </Td>
    );

}

export default Item;