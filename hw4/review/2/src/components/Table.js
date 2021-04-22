import React from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

export default class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
    }
  }
  
  handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, this.state.data)
    if (!modifiedData[y]) modifiedData[y] = {}
    modifiedData[y][x] = value
    this.setState({ data: modifiedData })
  }
  componentDidMount
  updateCells = () => {
    this.forceUpdate()
  }
  // componentDidMount(){
  //   document.addEventListener('keydown',this.completed)
  // }
  // document.addEventListener('keydown',this.completed)
  completed = ({x,y}) => {
   // alert(`${x+1}-${y+1}`)
    //alert(1)
    //alert(x)
    const id = `${x}-${y+1}`
    document.querySelector('#g'+id).style.outlineStyle = 'dotted';
  }
  render() {
    const rows = []

    for (let y = 0; y < this.props.y + 1; y += 1) {
      //if is empty then return empty array
      const rowData = this.state.data[y] || {}
      rows.push(
        <Row
          handleChangedCell={this.handleChangedCell}
          updateCells={this.updateCells}
          completed = {this.completed}
          key={y}
          y={y}
          x={this.props.x }
          rowData={rowData}
        />,
      )
    }
    return (
      <>
        <section>
          
            {rows}
          
        </section>
      </>
    )
  }
}

Table.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

