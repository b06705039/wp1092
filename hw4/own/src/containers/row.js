import React from 'react';
import styled from 'styled-components';
import GridItem from '../components/gridItem';


const Tr = styled.tr`
    
`;

function Row(props){

    return(
        <Tr >
            {props.rowInfo.map(item => <GridItem content={item} i={props.rowInfo[0]} j={props.rowInfo.findIndex(i=>i===item)}/>)}
        </Tr>
    )

}

export default Row;
