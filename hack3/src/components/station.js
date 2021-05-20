import React from 'react'

function Station(props) {

  console.log("in station", props)

  let station_id = "s-"+props.station.station_id
  let line_id = "l"+props.station.station_id

  return (
    <div className="station-line-container">
      <div className={station_id}> {/* you should add both id and onClick to attributes */}
        <div className="station-rectangle">{props.station.station_id}</div>
        <div className="station-name">{props.station.station_name}</div>
      </div>
      <div className={line_id}></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
