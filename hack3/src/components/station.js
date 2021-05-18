import React from 'react'

function Station(props) {

  return (
    <div className="station-line-container">
      <div className="station-and-name"> {/* you should add both id and onClick to attributes */}
        <div className="station-rectangle"></div>
        <div className="station-name"></div>
      </div>
      <div className="line"></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
