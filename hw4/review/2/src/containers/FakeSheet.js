import React, { Component } from 'react'
import Table from '../components/Table'
import PropTypes from 'prop-types'

export default class FakeSheet extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       x : 26,
       y : 100,
       clicked : false,
    }
  }
  
  Add = () =>{
    this.setState({
      y  : this.state.y +1,
    })
  }
  deleted = () =>{
    this.setState({
      y  : this.state.y -1,
    })
  }
  Add2 = () =>{
    this.setState({
      x  : this.state.x +1,
    })
  }
  deleted2 = () =>{
    this.setState({
      x  : this.state.x -1,
    })
  }


  render() {
    return ( 
      <div className ='Mode'>  
        <div className = 'btmode2'>      
            <button className='btmode'
                    onClick = {this.Add} >+</button>
            <button className='btmode' onClick = {this.deleted}>-</button>
        </div> 
        <div className = 'btmode1'> 
          
            <button onClick = {this.Add2}>+</button>
            <button onClick = {this.deleted2}>-</button>
           
          <div style={{ width: 'max-content' }}>
            <Table 
            x={this.state.x} 
            y={this.state.y} />
          </div>
        </div>

      </div>
    )
  }
}

// const App = () =>
//   (
//   <>
//     <div>
//       <button>+</button>
//       <button>-</button>
//       <div style={{ width: 'max-content' }}>
//         <Table x={10} y={100} />
//       </div>
//     </div>
//   </>
//   )

// export default App
