import React, {useState,useEffect} from "react";
import styled from 'styled-components';
import Row from './row';
import Item from '../components/gridItem';
import Btn from '../components/btn';

// import GridItem from '../components/gridItem';


const Sheet = styled.div`
    width: 2460px;
    height: 1520px;
    display:fixed;
    
`;

const FuncBarTop = styled.div`
    background-color: #C8C8C8;
    width: 2460px;
    height: 20px;
    display: block;
`;

const FuncBarLeft = styled.div`
    background-color: #C8C8C8;
    width: 20px;
    // height:  1500px;
    height: 100%;
    display: block;
`;

const Container = styled.div`
    display: inline-block;  
`;

const Table = styled.table`
    display: inline-block;
    border-spacing: 0;
`;



// above are CSS

const SheetInformation = {
    'rowNum': 10,
    'colNum': 2,
    'colName': [...Array(26).keys()].map(i=>String.fromCharCode(i+65))
}

// let twoDArray = {}
    
// for(let i=0;i<SheetInformation.rowNum;i++){
//     let templist = {};
//     for(let j=0;j<SheetInformation.colNum;j++){
//         templist[j.toString()] = "";
//     }
//     twoDArray[i.toString()] = templist;
// }


let tdArr = [];
for (let i=0;i<SheetInformation.rowNum;i++){
    let templist = [];
    for (let j=0;j<SheetInformation.colNum;j++){
        templist.push("");
    }
    tdArr.push(templist);
}

// above are variable


function FakeSheet (){


    const [SheetInfo,setSheetInfo] = useState(SheetInformation);
    // const [SheetContent, setSheetContent] = useState(twoDArray);
    const [SheetContent, setSheetContent] = useState(tdArr);
    const [curEle, setCurEle] = useState(null);

    const SheetContentFunc = (value,i,j) => {

        console.log("sheetcontentfunc",value,i,j);
        
        console.log(SheetContent);
        let modified = SheetContent;
        modified[i][j] = value;
        setSheetContent(modified);
        console.log(SheetContent);
    
    };

    const AddRowCol = (e) =>{
        console.log("into add rowcol");
        if(e.target.id === "rowAdd"){
            
        }
    }

    const updateCurEle = (ele) =>{
        setCurEle(ele);
        console.log("in set cur ele",ele);
    }

    

    return (
        <Sheet>
            <FuncBarTop>
                <Btn text="+" id="colAdd" handleclick={AddRowCol}/>
                <Btn text="-" id="colDel" handleclick={AddRowCol}/>
            </FuncBarTop>
            <FuncBarLeft>
                <Btn text="+" id="rowAdd" handleclick={AddRowCol}/>
                <Btn text="-" id="rowDel" handleclick={AddRowCol}/>
            </FuncBarLeft>
            
            <Container>
                <Table>
                    <colgroup span="1" style={{backgroundColor:"#F8F8F8",width:"30px"}}></colgroup>
                    <colgroup style={{width:"105px"}}></colgroup>

                    {/* <tr>
                        {SheetInfo['colName'].map((item,j)=><Item key={j} i="-" content={item} handleItem={SheetContentFunc} j={j-1} />)}
                    </tr> */}
                    {/* { Object.keys(SheetContent).map( key=> <Row key={key} i={key} rowInfo={SheetContent[key]} handleItem={SheetContentFunc} ele={updateCurEle}/>) }  */}

                    <Row key={"-"} i={"-"} rowInfo={SheetInfo['colName']} handleItem={SheetContentFunc} ele={updateCurEle}/>
                    {SheetContent.map((row,rowi)=><Row key={rowi} i={rowi} rowInfo={row} handleItem={SheetContentFunc} ele={updateCurEle}/>)}
                </Table>
            </Container>

            

        </Sheet>
    );


};

export default FakeSheet;

