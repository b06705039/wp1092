import React from "react"

function Left(props) {
    const handleAddCol = async (event) => {
        props.setTableValue((tableValue)=>{
            var curCol = props.curCol;
            var curRow = props.curRow;
            //console.log(curCol);
            var arr = JSON.parse(JSON.stringify(tableValue));
            //console.log(arr);
            var col = Object.assign([], props.col);
            col.push(col.length+1);
            props.setCol(col);
            let add = [];
            for(let i = 0; i < props.row.length; i++){
                add.push("");
            }
            if(curRow === -1) arr.push(add);
            else{
                
                arr.splice(curRow, 0, add);
            }  
            return arr;
        });
        //console.log(arr, row);
    }

    const handleRemoveCol = () => {
        if(props.curRow === -1) return;
        props.setTableValue((tableValue)=>{
            //var curCol = props.curCol;
            var curRow = props.curRow;
            //console.log(curCol);
            var arr = JSON.parse(JSON.stringify(tableValue));
            //console.log(arr);
            var col = Object.assign([], props.col);
            col.push(col.length-1);
            props.setCol(col);
            if(curRow === -1) arr.pop();
            else{
                
                arr.splice(curRow, 1);
            }  
            return arr;
        });
    }
    return (
        <div className="left">
            <button className="leftBtnPlus" onMouseDown={handleAddCol}>+</button>
            <button className="leftBtnMinus" onMouseDown={handleRemoveCol}>-</button>
        </div>
    )
}

export default Left;