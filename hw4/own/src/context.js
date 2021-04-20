import React,{createContext} from 'react';

const SheetInformation = {
    'rowNum': 10,
    'colNum': 2,
    'colName': [''].concat([...Array(26).keys()].map(i=>String.fromCharCode(i+65)))
}

// let twoDArray = []
    
// for(let i=0;i<SheetInformation.rowNum;i++){
//     let templist = [i+1];
//     for(let j=0;j<SheetInformation.colNum;j++){
//         templist.push('');
//     }
//     twoDArray.push(templist);
// }


const SheetContent = createContext(null);

export default SheetContent;