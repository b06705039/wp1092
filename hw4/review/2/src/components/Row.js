import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'


export default class Row extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  Add = () =>{
    
  }

  render() {

    const cells = []
    const y = this.props.y
    for(let x = 0; x < this.props.x + 1;x++){
      cells.push(
        <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        onChangedValue={this.props.handleChangedCell}
        Completed = {this.props.completed}
        updateCells={this.props.updateCells}
        value={this.props.rowData[x] || ''}
        />
      )
    }
    return (
      <div>
        {cells}        
      </div>
    )
  }
}

// const Row = (props) => {
//   const cells = []
//   const y = props.y
//   for (let x = 0; x < props.x +1; x += 1) {
//     cells.push(
//       <Cell
//         key={`${x}-${y}`}
//         y={y}
//         x={x}
//         onChangedValue={props.handleChangedCell}
//         updateCells={props.updateCells}
//         value={props.rowData[x] || ''}
//       />,
//     )
//   }
//   return (
//     <div>
//       {cells}
//     </div>
//   )
// }



//export default Row