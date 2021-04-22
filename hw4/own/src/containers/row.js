import React from 'react';
import styled from 'styled-components';
import Item from '../components/gridItem';


const Tr = styled.tr`
    
`;

function Row(props){

    let con = "";
    console.log(props.i);
    if(props.i==="-"){
        con = "";
    }
    else{
        con = parseInt(props.i)+1;;
    }
    console.log(con);

    return(
        <Tr >
            <Item key={"-"+props.i} content={con} i={props.i} j="-"/>
            {/* { Object.keys(props.rowInfo).map( key=> <Item key={key} content={props.rowInfo[key]} handleItem={props.handleItem} i={props.i} j={key} ele={props.ele}/>) }  */}
            {props.rowInfo.map((item,itemi)=><Item key={itemi} content={item} handleItem={props.handleItem} i={props.i} j={itemi} ele={props.ele}/>)}
        </Tr>
    )

}

export default Row;
