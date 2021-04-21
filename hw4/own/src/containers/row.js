import React from 'react';
import styled from 'styled-components';
import Item from '../components/gridItem';


const Tr = styled.tr`
    
`;

function Row(props){

    return(
        <Tr >
            <Item key={"-"+props.i} content={props.i} i={props.i} j="-"/>
            { Object.keys(props.rowInfo).map( key=> <Item key={key} content={props.rowInfo[key]} handleItem={props.handleItem} i={props.i} j={key}/>) } 
        </Tr>
    )

}

export default Row;
