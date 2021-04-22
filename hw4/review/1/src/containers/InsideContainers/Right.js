import React, {useState} from "react"
import Upper from "./Upper"
import Content from "./Content"



function Right(props) {
    //const [row, setRow] = useState(SetRow(26));
    //const [col, setCol] = useState(SetRow(100));
    //const [curRow, setCurRow] = useState(-1);
    //const [curCol, setCurCol] = useState(-1);
    //const [tableValue, setTableValue] = useState(createTableValue(26, 100))

    return (
        <div className="right">
            <Upper row={props.row} col={props.col} curCol={props.curCol} curRow={props.curRow}
            setRow={props.setRow} setCol={props.setCol} tableValue={props.tableValue} setTableValue={props.setTableValue}
             />
            <Content row={props.row} col={props.col} tableValue={props.tableValue} setTableValue={props.setTableValue}
            curCol={props.curCol} curRow={props.curRow} setCurCol={props.setCurCol} setCurRow={props.setCurRow}
             />
        </div>
    )
}

export default Right;