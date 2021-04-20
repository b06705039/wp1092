import React, {useState} from "react";
import styled from 'styled-components';
import Row from './row';
import {SheetContent} from '../context';

// import GridItem from '../components/gridItem';


const Sheet = styled.div`
    width: 2460px;
    height: 1520px;
    
`;

// const FuncBarTop = styled.div`
//     background-color: #C8C8C8;
//     width: 2460px;
//     height: 20px;
//     display: inline-block;
// `;

// const FuncBarLeft = styled.div`
//     background-color: #C8C8C8;
//     width: 20px;
//     height:  1500px;
//     display: inline-block;
// `;

const Container = styled.table`
    display: inline-block;
    border-spacing: 0;
    

`;

// above are CSS

const SheetInformation = {
    'rowNum': 10,
    'colNum': 2,
    'colName': [''].concat([...Array(26).keys()].map(i=>String.fromCharCode(i+65)))
}

let twoDArray = []
    
for(let i=0;i<SheetInformation.rowNum;i++){
    let templist = [i+1];
    for(let j=0;j<SheetInformation.colNum;j++){
        templist.push('');
    }
    twoDArray.push(templist);
}

// above are variable


function FakeSheet (){

    const [SheetInfo,setSheetInfo] = useState(SheetInformation);
    const [SheetContent, setSheetContent] = useState(twoDArray);
    

    // const SheetContentFunc = (value,i,j) => {

    //     console.log("sheetcontentfunc",value,i,j);
    //     console.log(SheetContent);
    //     let modified = SheetContent;
    //     SheetContent[i][j] = value;
    //     setSheetContent(preSheet=>(modified));
    //     console.log(SheetContent);
    
    // };





    return (
        <SheetContent.provider value={{SheetContent, setSheetContent}}>
            <Sheet>
                {/* <FuncBarTop></FuncBarTop>
                <FuncBarLeft></FuncBarLeft> */}

                <Container>
                    <thead>
                        <Row rowInfo={SheetInfo['colName']} />
                    </thead>
                    <tbody>
                        {/* {SheetContent.map(item=><Row key={item[0]} rowInfo={item} handleItem={SheetContentFunc}/>)} */}
                        {SheetContent.map(item=><Row key={item[0]} rowInfo={item}/>)}
                    </tbody>
                </Container>

            </Sheet>
        </SheetContent.provider>
    );
};

export default FakeSheet;

