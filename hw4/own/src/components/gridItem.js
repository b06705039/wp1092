import React,{useState} from 'react';
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

    const [active,setAcive] = useState(0);

    function handleEvent(e){
        props.itemInfo.handleItem(e,props.itemInfo.rowInfo[0],props.j);
        setAcive(1);
    }

    function handleClick(e){
        console.log('click1',e);
        
    }

    function handledbClick(e){
        console.log('click2',e);
    
    }



    return( 
        <Td>
            <Input defaultValue={props.content} onKeyDown={handleEvent} onClick={handleClick} onDoubleClick={handledbClick}/>
            {/* <Input defaultValue={props.content} onKeyDown={(e)=>props.itemInfo.handleItem(e,props.itemInfo.rowInfo[0],props.j)} /> */}
        </Td>
    );

}

export default Item;