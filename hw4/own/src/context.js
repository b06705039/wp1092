import {createContext, useContent, useState} from 'react';

const Default_row = 10;
const Default_col = 26;

const Info = createContext({
    rowNum: 0,
    colNum: 0,
    content: [],
});

let tdArr = [];
for (let i = 0 ; i < Default_row+1 ; i++){
    tdArr.push(new Array(Default_col+1).fill(''));
}}

// colName: [...Array(26).keys()].map(i=>String.fromCharCode(i+65)),

function useInfoProvider(){
    
    const [rowNum, setRowNum] = useState(Default_row);
    const [colNum, setColNum] = useState(Default_col);
    const [content, setContent] = useState(tdArr);

    
    console.log(content);
    
}






export const {SheetContent,SheetInformation,tdArr} = createContext();
