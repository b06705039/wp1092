import React, {useEffect, useState} from "react"
import {convertNumToLet} from "./Utils"

function SetRow(row) {
    var rows = [];
    for(let i = 0; i < row; i++){
        rows.push(i+1);
    }
    return rows;
}


function Content(props) {
    //const [row, setRow] = useState(SetRow(26));
    //const [col, setCol] = useState(SetRow(100));
    //const setBtn = () => setRow([888, ...row])

    const changeTableValue = (tableValue, row, col, value) => {
        let r = parseInt(row);
        let c = parseInt(col);
        //console.log(tableValue);
        var ret = tableValue.slice(0);
        //console.log(ret)
        ret[r][c] = value;
        return ret;
    }

    const handleEnter = (event) => {
        if(event.target.readOnly == true && event.key !== 'Enter'){
            event.target.value = "";
            event.target.readOnly = false;
        }
        var indices = event.target.id.split("_");
        props.setCurCol(parseInt(indices[1]));
        props.setCurRow(parseInt(indices[0]));
        
        //console.log(props.tableValue);
        if(event.key === "Enter"){
            //props.setCurCol(parseInt());
            props.setTableValue(changeTableValue(props.tableValue, indices[0], indices[1], event.target.value));
            props.setCurRow(Math.min(parseInt(indices[0])+1, props.col.length-1));
            props.setCurCol(parseInt(indices[1]));
            console.log("??", parseInt(indices[1]), Math.min(parseInt(indices[0])+1, props.col.length-1))
            event.stopPropagation();
            //document.getElementById(props.curRow+"_"+props.curCol).focus();
            //console.log(props.curRow, props.curCol);
           
        }
        
    }

    const handleClick = (event) => {
        var indices = event.target.id.split("_");
        props.setCurCol(parseInt(indices[1]));
        props.setCurRow(parseInt(indices[0]));
        console.log(props.tableValue[parseInt(indices[0])][parseInt(indices[1])])
    }

    const handleDoubleClick = (event) => {
        event.target.removeAttribute("readonly");
        event.target.selectionStart = event.target.selectionEnd;
    }

    const handleBlur = (event) => {
        var indices = event.target.id.split("_");
        //props.setCurCol(parseInt(indices[1]));
        //props.setCurRow(parseInt(indices[0]));
        console.log("blur", props.curRow, props.curCol);
        props.setTableValue(changeTableValue(props.tableValue, indices[0], indices[1], event.target.value));
        event.target.setAttribute("readonly", "true");
        props.setCurCol(-1);
        props.setCurRow(-1);
        //console.log(props.curRow, props.curCol);
    }

    const handleFocus = (event) => {
        var indices = event.target.id.split("_");
        props.setCurCol(parseInt(indices[1]));
        props.setCurRow(parseInt(indices[0]));
        console.log("focus",props.curRow, props.curCol);
    }

    const handleDelete = (event) => {
        switch (event.keyCode) {
            case 46:
            case 8:
                if(event.target.readOnly == true){
                    event.target.value = "";
                    event.target.readOnly = false;
                }
                break;
            default:
        }
    }

    useEffect(() => {
        console.log(props.curRow, props.curCol);
        if(props.curRow >= 0 && props.curCol >= 0)
            document.getElementById(props.curRow+"_"+props.curCol).focus();
    })

    //let showRow = [];
    let showAll = [];
    props.tableValue.map((arr, index) => {
        let showRow = [];
        for(let i = 0; i < arr.length; i++){
            showRow.push(
                <td className="td-row" key={new Array([index, i, arr[i]])}>
                    <input type="text" id={index.toString() + "_" + i.toString()} 
                    onClick={handleClick} onDoubleClick={handleDoubleClick} onBlur={handleBlur} readOnly={true}
                    onKeyPress={handleEnter} defaultValue={arr[i]}
                    onFocus={handleFocus} onKeyDown={handleDelete}
                    ></input>
                </td>
            )
        }
        showAll.push(showRow);
    })

    return (
        
        <div className="content">
            <table>
                <thead>
                    <tr>
                        <th className="firstcell"></th>
                        {props.row.map((index, idx) => {
                            return (
                                <th className={((props.curCol === idx)? "tableFocusHead th-row":"th-row")} key={index + "head"}>
                                    {index}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.tableValue.map((arr, index) => {
                        return (
                            <tr key={index + "body"}>
                                <th  className={(props.curRow === index)? "tableFocusLeft stickyCol" : "stickyCol"}>{index+1}</th>
                                {showAll[index]}
                               
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Content;