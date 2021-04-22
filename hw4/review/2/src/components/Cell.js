import React from 'react'
import PropTypes from 'prop-types'

/**
 * Cell represents the atomic element of a table
 */
export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      selected : false,
      value: props.value,
      completed : false,
      
    }
    this.display = this.determineDisplay(
      // { x: props.x, y: props.y },
      props.value)
   
    
  }

  componentDidMount() {
    window.document.addEventListener('unselectAll',
      this.handleUnselect)
  }

  componentWillUnmount() {
    window.document.removeEventListener('unselectAll',
      this.handleUnselect)
  }

  deletUnselect = () => {
    const selected = new Event('unselectAll')
    window.document.dispatchEvent(selected)

  } 
  clicked = () => {
    this.deletUnselect()
    this.setState({
      selected : true
    })
  }
  onBlur = (e) =>　{
    this.hasNewvalue(e.target.value)
  }
  doubleClicked = () => {
    this.deletUnselect()
    //this.focusText()
    this.setState({
      editing : true
    })
  }

  determineDisplay = (value)  => {
    return value
  }
  onChange = (e) => {
    this.setState({
      value : e.target.value
    })
    //alert (this.state.value)
    //???? 
    this.display = this.determineDisplay(
       e.target.value)
  }
  onKeyPressInput = (e) => {
      
      if(e.key === 'Enter'){
        this.hasNewvalue(e.target.value)
       // let a = e.target.value
        //alert(a)
        //alert(6)
        
      }
  }

  hasNewvalue = (value) => {
    this.props.onChangedValue(
      {
        x : this.props.x,
        y : this.props.y
      },
      value,
    )
    this.props.Completed(
      {
      x :this.props.x,
      y : this.props.y
      })
    this.setState({
      editing : false
    })
  }

  // completed = () => {
  //   this.setState({
  //     completed  : true 
  //   })
  // }
  focusText = () =>{
    this.textInput.current.focusText();
  }

  handleUnselect = () => {
    if(this.state.selected || this.state.editing){
      this.setState({
        selected : false,
        editing : false
      })
    }
  }
///css
  calculateCss = () => {
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',
      //fontFamily: 'Calibri, \'Segoe UI\', Thonburi,
       // Arial, Verdana, sans-serif',
    }

    if (this.props.x === 0 || this.props.y === 0) {
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }

    if(this.state.editing){
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }

    return css
  }
//css



  render() {
    const css = this.calculateCss()
    let position_id = `g${this.props.x}-${this.props.y}`

    // column 0
    if (this.props.x === 0) {
      return (
        <>
          
            <span style={css}>
              {this.props.y}
            </span>
         
        </>
      )
    }

    // row 0
    if (this.props.y === 0) {
      const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      return (
        <>
          
            <span
              style={css}>
              {alpha[this.props.x]}
            </span>
          
        </>
      )
    }

    if (this.state.selected) {
      css.outlineColor = 'blue'
      css.outlineStyle = 'dotted'
      
    }

    if (this.state.editing) {
      return (
        <input
          style={css}
          type="text"
          onKeyPress = {this.onKeyPressInput}
          onChange = {this.onChange}
          value = {this.state.value}
          onBlur = {this.onBlur}
          //ref = {this.textInput}
          autoFocus
        />
      )
    }
    return (
      <span
        id = {position_id}
        style={css}
        onClick = {e => this.clicked(e)}
        onDoubleClick = {e => this.doubleClicked(e)}>
          {this.display}
      </span>
      
    )
  }
}
