import {React, useState} from "react";
import Left from "./InsideContainers/Left"
import Right from "./InsideContainers/Right"
import convertNumToLet from "./InsideContainers/Utils"

function SetRow(row) {
    var rows = [];
    for(let i = 0; i < row; i++){
        //console.log( convertNumToLet(i+1));
        rows.push(convertNumToLet(i+1));
    }
    return rows;
}

function SetCol(row) {
    var rows = [];
    for(let i = 0; i < row; i++){
        rows.push(i+1);
    }
    return rows;
}

function createTableValue(r, c) {
    var tableValue = [];
    for(let i = 0; i < c; i++){
        tableValue.push([]);
        for(let j = 0; j < r; j++){
            tableValue[i].push("");
        }
    }
    //console.log(tableValue);
    return tableValue;
}

function Container() {
    const [row, setRow] = useState(SetRow(26));
    const [col, setCol] = useState(SetCol(100));
    const [curRow, setCurRow] = useState(-1);
    const [curCol, setCurCol] = useState(-1);
    const [tableValue, setTableValue] = useState(createTableValue(26, 100))

    return (
        <div className="flex">
            
            <Left 
                row={row} col={col} curCol={curCol} curRow={curRow} setCurCol={setCurCol} setCurRow={setCurRow}
                setRow={setRow} setCol={setCol} tableValue={tableValue} setTableValue={setTableValue}
            />
            <Right 
            row={row} col={col} curCol={curCol} curRow={curRow} setCurCol={setCurCol} setCurRow={setCurRow}
            setRow={setRow} setCol={setCol} tableValue={tableValue} setTableValue={setTableValue}/>
            
        </div>
    )
}

export default Container;