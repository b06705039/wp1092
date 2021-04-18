import React, { Component } from "react";
import styled from 'styled-components';
import GridItem from '../components/gridItem';
// import Header from "../components/Header";

const SheetInfo = {
    'rowNum': 100,
    'colNum': 26,
}


const Sheet = styled.div`
    width: 2460px;
    height: 1520px;
    
`;



const FuncBarTop = styled.div`
    background-color: #C8C8C8;
    width: 2460px;
    height: 20px;
    display: inline-block;
    
`;

const FuncBarLeft = styled.div`
    background-color: #C8C8C8;
    width: 20px;
    height:  1500px;
    display: inline-block;
    
`;

const Container = styled.div`
    display: inline-block;

`;

const SpreadContainer = styled.div`
    display: inline;
    grid-template-columns: repeat(${SheetInfo['colNum']},94px);
    grid-template-rows: repeat(${SheetInfo['rowNum']},15px);
`;




class FakeSheet extends Component {
    render() {
        return (
            <Sheet>
                <FuncBarTop></FuncBarTop>
                <FuncBarLeft></FuncBarLeft>
                <Container>
                    sss
                    {/* <SpreadContainer>
                        <GridItem />
                        <GridItem />
                        <GridItem />
                    </SpreadContainer> */}
                </Container>

            </Sheet>
        );
    }
};

export default FakeSheet;

