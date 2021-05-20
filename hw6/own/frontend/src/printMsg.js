import React from 'react'

const PrintMsg = ({type, data}) => {

    console.log("in printMsg props.data: ", type, data)

    // const printType = type

    return (
        <>
            {type==="not found!" && (<p>{data[0].type} ({data[0].content})</p>)}
            {type && data.length!==0 && data.map(Adata=><p> {type} {Adata.name} {Adata.subject} {Adata.score}</p>)}
        </>
    )
}

export default PrintMsg