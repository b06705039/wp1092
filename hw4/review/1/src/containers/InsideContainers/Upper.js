import React from "react"
import convertNumToLet from "./Utils"

function Upper(props) {
    const handleAddRow = async (event) => {
        props.setTableValue((tableValue)=>{
            var curCol = props.curCol;
            var curRow = (props.curRow === null)? -1 : props.curCol;
            //console.log(curCol);
            var arr = JSON.parse(JSON.stringify(tableValue));
            //console.log(arr);
            var row = Object.assign([], props.row);
            row.push(convertNumToLet(row.length+1));
            props.setRow(row);
            for(let i = 0; i < arr.length; i++){
                if(curCol === -1) arr[i].push("");
                else {
                    arr[i].splice(curCol, 0, "");

                }
            }
            return arr;
        });
        //console.log(arr, row);
    }

    const handleRemoveRow = () => {
        if(props.curCol === -1) return;
        props.setTableValue((tableValue)=>{
            var curCol = props.curCol;
            var curRow = (props.curRow === null)? -1 : props.curCol;
            //console.log(curCol);
            var arr = JSON.parse(JSON.stringify(tableValue));
            //console.log(arr);
            var row = Object.assign([], props.row);
            row.pop();
            props.setRow(row);
            for(let i = 0; i < arr.length; i++){
                if(curCol === -1) arr[i].pop();
                else {
                    arr[i].splice(curCol, 1);

                }
            }
            return arr;
        });
    }
    return (
        <div className="upper">
            <button className="upperBtnPlus" onMouseDown={handleAddRow}>+</button>
            <button className="upperBtnMinus" onMouseDown={handleRemoveRow}>-</button>
        </div>
    )
}

export default Upper;