import React, { useRef, useState } from 'react'
import './App.css'
import { Button, Input, Radio } from 'antd'
import { add, clear, query } from './axios'

function App() {

  const nameRef = useRef()
  const subjectRef = useRef()
  const scoreRef = useRef()
  const queryRef = useRef('')

  const [ queryType, setQueryType ] = useState("name")
  const [ queryDatas, setQueryDatas ] = useState([])

  const addData = async() => {
    const ifSuccess = await add(nameRef.current.state.value, subjectRef.current.state.value, scoreRef.current.state.value)
    console.log("in app.js addData: ", ifSuccess)
  }

  const clearData = async() => {
    const ifClear = await clear()
    console.log("in app.js clearData: ", ifClear)
  }

  const queryData = async() => {
    const queryResult = await query(queryType, queryRef.current.state.value)
    console.log("in app.js queryData: ", queryResult)
    setQueryDatas(queryResult)
  }


  return (
    <div className="app">
      <div className="header">
          <h1>ScoreBoard DB</h1>
          <Button
            onClick={clearData}>
            Clear
          </Button>
      </div>
      <div className="section">
          <Input.Group>
            <Input 
              placeholder="Name"
              ref={nameRef} />
            <Input
              placeholder="Subject"
              ref={subjectRef} />
            <Input
              placeholder="Score"
              ref={scoreRef} />
            <Button
              onClick={addData}>
              Add
            </Button>
          </Input.Group>
      </div>

      <div className="section">
        <Radio.Group name="queryType" defaultValue="name">
          <Radio value="name" onClick={(e)=>setQueryType(e.target.value)} defaultChecked>Name</Radio>
          <Radio value="subject" onClick={(e)=>setQueryType(e.target.value)}>Subject</Radio>
        </Radio.Group>
        <Input
              placeholder="Query string..."
              ref={queryRef} />
        <Button onClick={queryData}>
          Query
        </Button> 
      </div>


      <div className="queryResult">
        {queryDatas.length===0 && (
          <p>
            {queryType},{queryRef.value} not Found!
          </p>
        )}
      
      </div>



    </div>
  );
}

export default App;


