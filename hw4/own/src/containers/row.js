import React from 'react';
import styled from 'styled-components';
import GridItem from '../components/gridItem';


const Tr = styled.tr`
    
`;

function Row(props){

    return(
        <Tr >
            {props.rowInfo.map(item => <GridItem itemInfo={props} content={item} j={props.rowInfo.findIndex(i=>i===item)}/>)}
        </Tr>
    )

}

export default Row;
