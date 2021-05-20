import React, { useRef, useState} from 'react'
import './App.css'
import { Button, Input, Radio, Form } from 'antd'
import { add, clear, query } from './axios'
import PrintMsg from './printMsg'



function App() {

  const nameRef = useRef()
  const subjectRef = useRef()
  const scoreRef = useRef()
  const queryRef = useRef('')

  const [ form ]= Form.useForm()

  const [ nameValue, setNameValue ] = useState()
  const [ subjectValue, setSubjectValue ] = useState()
  const [ scoreValue, setScoreValue ] = useState()
  const [ queryValue, setQueryValue ] = useState()

  const [ queryType, setQueryType ] = useState("")
  const [ queryDatas, setQueryDatas ] = useState([])

  const [ queryInfo, setQueryInfo ] = useState({type:"", datas:[]})


  const addData = async() => {
    // setQueryDatas([])
    // setQueryType("")

    setQueryInfo({type:"", datas: []})

    
    const ifexisting = await add(nameRef.current.state.value, subjectRef.current.state.value, scoreRef.current.state.value)
    console.log("in app.js addData: ", ifexisting)

    if(ifexisting === "fail"){
      // setQueryType("add fail")
      setQueryInfo({type:"fail", datas: []})
    }else if(ifexisting){
      // setQueryType("update")
      // setQueryDatas([{name: nameRef.current.state.value, subject: subjectRef.current.state.value, score: scoreRef.current.state.value}])
      setQueryInfo({type:"update", 
                    datas: [{name: nameRef.current.state.value, subject: subjectRef.current.state.value, score: scoreRef.current.state.value}]})
    }else{
      // setQueryType("add")
      // setQueryDatas([{name: nameRef.current.state.value, subject: subjectRef.current.state.value, score: scoreRef.current.state.value}])
      setQueryInfo({type:"add", 
                    datas: [{name: nameRef.current.state.value, subject: subjectRef.current.state.value, score: scoreRef.current.state.value}]})
    }
    
    
    // setNameValue("")
    // setSubjectValue("")
    // setScoreValue("")
    form.resetFields();


  }

  const clearData = async() => {
    // setQueryDatas([])
    // setQueryType("")
    setQueryInfo({type:"", datas: []})

    const ifClear = await clear()
    console.log("in app.js clearData: ", ifClear)
  }

  const queryData = async() => {
    // setQueryDatas([])
    setQueryInfo({...queryInfo, datas: []})

    const queryResult = await query(queryInfo.type, queryRef.current.state.value)
    console.log("in app.js queryData: ", queryResult)
    if(queryResult.length===0){
      // setQueryType("not found!")
      // setQueryDatas([{type: queryType, content: queryRef.current.state.value}])
      setQueryInfo({type:"not found!", datas: [{type: queryInfo.type, content: queryRef.current.state.value}]})
    }else{
      setQueryInfo({...queryInfo, datas: queryResult})
    }

    
    // queryRef.current.state.value = ""
    // console.log("in app.js endQuery, Queryref: ", queryRef.current.state.value)
    setQueryValue("")
  }

  const queryTypeClick = (e) => {
    // setQueryType(e.target.value)
    // setQueryDatas([])
    setQueryInfo({type:e.target.value, datas: []})

  }


  // useEffect(() => {
  //   console.log("in useEffect: ", queryDatas)
  // }, [queryDatas])

  // useEffect(() => {
  //   console.log("in useEffect, queryType: ", queryType)
  // }, [queryType])


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
        <Form form={form}>
          <Form.Item style={{ display: 'inline-block', width: 'calc(28% - 8px)', margin: '0 8px' }}>
          {/* <Input.Group> */}
              <Input 
                placeholder="Name"
                ref={nameRef} />
                {/* value={nameValue} */}
          </Form.Item >
          <Form.Item style={{ display: 'inline-block', width: 'calc(28% - 8px)', margin: '0 8px' }}>
              <Input
                placeholder="Subject"
                ref={subjectRef} />
                {/* value={subjectValue} */}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(28% - 8px)', margin: '0 8px' }}>
              <Input
                placeholder="Score"
                ref={scoreRef} />
                {/* value={scoreValue} */}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(5% - 8px)', margin: '0 8px' }}>
              <Button
                onClick={addData}
                type="reset">
                Add
              </Button>
          </Form.Item>
          {/* </Input.Group> */}
            
          </Form>
         
      </div>

      <div className="section">
        <Radio.Group name="queryType">
          <Radio value="name" onChange={(e)=>queryTypeClick(e)} >Name</Radio>
          <Radio value="subject" onChange={(e)=>queryTypeClick(e)}>Subject</Radio>
        </Radio.Group>
        <Input
              placeholder="Query string..."
              ref={queryRef} />
              {/* value={queryValue} */}
        <Button onClick={queryData}>
          Query
        </Button> 
      </div>


      <div className="queryResult" >
        {/* {(queryDatas.length===0 && queryType !== null) && (
          <p>
            {queryType},{queryRef.value} not Found!
          </p>
        )}
        {queryDatas.length!==0 && (
          <>
            <p>{queryType}</p>
            {queryDatas.map(data => <p>{data.name} {data.subject} {data.score}</p>)}
          </>
        )} */}
        {/* {console.log("in app, ready to pass: ", queryDatas)} */}
        {/* <PrintMsg type={queryType} data={queryDatas}></PrintMsg> */}
        <PrintMsg type={queryInfo.type} data={queryInfo.datas}></PrintMsg>
      
      </div>



    </div>
  );
}

export default App;


