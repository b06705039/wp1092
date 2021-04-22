import React from 'react';
import styled from 'styled-components';
import Item from '../components/gridItem';


const Tr = styled.tr`
    
`;

function Row(props){

    let con = "";
    props.i==="-"?con = "":con = parseInt(props.i)+1;

    console.log(props.rowInfo);

    return(
        <Tr >
            <Item key={"-"+props.i} content={con} i={props.i} j="-"/>
            {props.rowInfo.map((item,itemi)=><Item key={itemi} content={item} handleItem={props.handleItem} i={props.i} j={itemi} ele={props.ele}/>)}
        </Tr>
    )

}

export default Row;
