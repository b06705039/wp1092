import React, {useState} from "react";
import styled from 'styled-components';
import Row from './row';
import Item from '../components/gridItem';

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

let twoDArray = {}
    
for(let i=0;i<SheetInformation.rowNum;i++){
    let templist = {};
    for(let j=0;j<SheetInformation.colNum;j++){
        templist[j.toString()] = "";
    }
    twoDArray[i.toString()] = templist;
}

// above are variable


function FakeSheet (){


    const [SheetInfo,setSheetInfo] = useState(SheetInformation);
    const [SheetContent, setSheetContent] = useState(twoDArray);
    

    const SheetContentFunc = (value,i,j) => {

        console.log("sheetcontentfunc",value,i,j);
        
        console.log(SheetContent);
        let modified = SheetContent;
        modified[i][j] = value;
        setSheetContent(modified);
        console.log(SheetContent);
    
    };



    return (
        <Sheet>
            {/* <FuncBarTop></FuncBarTop>
            <FuncBarLeft></FuncBarLeft> */}
            
            <Container>
 
                <colgroup span="1" style={{backgroundColor:"#F8F8F8",width:"30px"}}></colgroup>
                <colgroup style={{width:"105px"}}></colgroup>
                 
            
                <tr>
                    {SheetInfo['colName'].map((item,j)=><Item key={j} i="-" content={item} handleItem={SheetContentFunc} j={j-1} />)}
                </tr>
                { Object.keys(SheetContent).map( key=> <Row key={key} i={key} rowInfo={SheetContent[key]} handleItem={SheetContentFunc}/>) } 
            
            </Container>

            <table>
                {/* <colgroup>
                    <col span="2" style={{backgroundColor: "gray",width:"105px"}} />
                    <col span="1" style={{backgroundColor: "gray"}} />
                </colgroup> */}
                <colgroup style={{backgroundColor: "yellow"}}></colgroup>
                
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Memo</th>
                </tr>
                <tr>
                    <td>iPhone 11</td>
                    <td>$24,900</td>
                    <td>2</td>
                    <td>NA</td>
                </tr>
                <tr>
                    <td>AirPods</td>
                    <td>$6,490</td>
                    <td>1</td>
                    <td>NA</td>
                </tr>
            </table>

        </Sheet>
    );


};

export default FakeSheet;

