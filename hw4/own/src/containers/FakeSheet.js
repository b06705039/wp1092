import React, {useState,useEffect} from "react";
import styled from 'styled-components';
import Row from './row';
import Item from '../components/gridItem';
import Btn from '../components/btn';

// import GridItem from '../components/gridItem';


const Sheet = styled.div`
    width: 100%;
    height: 1520px;
    display:fixed;
    
`;


const SheetInformation = {
    'rowNum': 10,
    'colName': [...Array(26).keys()].map(i=>String.fromCharCode(i+65)),
    'colNum': 26
    
}

const FuncBarTop = styled.div`
    background-color: #C8C8C8;
    width: ${(SheetInformation.colNum+1)*105}px;
    height: 20px;
    display: inline-block;
`;

const FuncBarLeft = styled.div`
    background-color: #C8C8C8;
    width: 20px;
    // height:  1500px;
    height: 100%;
    display: block;
    padding-top: 20px;
`;

const Container = styled.div`
    display: inline-block;  
`;

const Table = styled.table`
    display: inline-block;
    border-spacing: 0;
`;

// above are CSS


let tdArr = [];
for (let i=0;i<SheetInformation.rowNum;i++){
    let templist = [];
    for (let j=0;j<SheetInformation.colNum;j++){
        templist.push("");
    }
    tdArr.push(templist);
}

// above are variable

function deepCopy(sheet){
    let Arr = [];
    sheet.map(row=>{
            let temp = [];
            row.map(item=>temp.push(item))
            Arr.push(temp);
        });
   
    return Arr;
};


function FakeSheet (){

    const [SheetInfo,setSheetInfo] = useState(SheetInformation);
    const [SheetContent, setSheetContent] = useState({content:tdArr});
    const [curEle, setCurEle] = useState(null);

    const SheetContentFunc = (value,i,j) => {

        console.log("sheetcontentfunc",value,i,j);
        
        console.log(SheetContent.content);
        let modified = deepCopy(SheetContent.content);
        modified[i][j] = value;
        setSheetContent(state=>({...state,content:modified}));
        console.log(SheetContent.content);
    
    };

    const AddRowCol = (e) =>{
        console.log("into add rowcol");

        let i=null;
        let j=null;
        if(curEle!==null){
            i = curEle.id.split('-')[1];
            j = curEle.id.split('-')[2];
            let clcl = new MouseEvent('click',{bubbles:true});
            curEle.dispatchEvent(clcl);
        }
        

        if(i===null){i=SheetInfo.rowNum};
        if(j===null){j=SheetInfo.colNum};
        
        let modifiedSheet = deepCopy(SheetContent.content);

        console.log("ij",i,j);

        if(e.target.id === "rowAdd"){
            
            setSheetInfo(state=>({ ...state,
                                rowNum:state.rowNum+1,
                                }));
            let temp = [];
            for(let j=0;j<SheetInfo.colNum;j++){
                temp.push("");
            }
            modifiedSheet.splice(i,0,temp);
            setSheetContent(state=>({...state,content:modifiedSheet}));
            
        }
        else if(e.target.id === "rowDel"){
            i=i-1;
            modifiedSheet.splice(i,1);
            setSheetContent(state=>({...state,content:modifiedSheet}));
            setSheetInfo(state=>({ ...state,
                rowNum:state.rowNum-1,
            }));
            console.log(modifiedSheet);

        }
        else if(e.target.id === "colAdd"){
            setSheetInfo(state=>({ ...state,
                colNum:state.colNum+1,
                colName:state.colName.push("AA")
                }));

            for(let x=0;x<SheetInfo.rowNum;x++){
                modifiedSheet[x].splice(j,0,'');
            }
            // modifiedSheet.map(row=>{row.splice(j,0,'')});
            setSheetContent(state=>({...state,content:modifiedSheet}));

        }
        else if(e.target.id === "colDel"){
            j=j-1;
            
            // modifiedSheet.map(row=>row.splice(j,1));
            for(let x=0;x<SheetInfo.rowNum;x++){
                modifiedSheet[x].splice(j,1);
            }


            console.log(SheetInfo.colName.splice(j,1));
            setSheetInfo(state=>({ ...state,
                colNum:state.colNum-1,
                colName:state.colName
            }));

            setSheetContent(state=>({...state,content:modifiedSheet}));

        }
    }

    const updateCurEle = (ele) =>{
        setCurEle(ele);
        console.log("in set cur ele",ele);
    }

    useEffect(() => {
        console.log("Sheet content updated");
      return () => {

      };
    }, [setSheetContent])


    return (
            <Sheet>
                <FuncBarLeft>
                    <Btn text="+" id="rowAdd" handleclick={AddRowCol}/>
                    <Btn text="-" id="rowDel" handleclick={AddRowCol}/>
                </FuncBarLeft>


                <FuncBarTop>
                    <Btn text="+" id="colAdd" handleclick={AddRowCol}/>
                    <Btn text="-" id="colDel" handleclick={AddRowCol}/>
                </FuncBarTop>
                
                <Container>
                    <Table>
                        <colgroup span="1" style={{backgroundColor:"#F8F8F8",width:"30px"}}></colgroup>
                        <colgroup style={{width:"105px"}}></colgroup>

                        <Row key={"-"} i={"-"} rowInfo={SheetInfo['colName']} handleItem={SheetContentFunc} ele={updateCurEle}/>
                        {SheetContent.content.map((row,rowi)=><Row key={rowi} i={rowi} rowInfo={row} handleItem={SheetContentFunc} ele={updateCurEle}/>)}
                    </Table>
                </Container>

                

            </Sheet>
    );



};

export default FakeSheet;

