import {createContext} from 'react';


const SheetInformation = {
    'rowNum': 10,
    'colNum': 2,
    'colName': [...Array(26).keys()].map(i=>String.fromCharCode(i+65))
}


let tdArr = [];
for (let i=0;i<SheetInformation.rowNum;i++){
    let templist = [];
    for (let j=0;j<SheetInformation.colNum;j++){
        templist.push("");
    }
    tdArr.push(templist);
}



export const {SheetContent,SheetInformation,tdArr} = createContext();
