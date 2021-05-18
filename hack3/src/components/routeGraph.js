import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data

  console.log("in routeGraph: ", data)

  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...

        data[1].map(station => <Station key={station.station_id} station={station} />)


      }
    </div>
  )
}

export default RouteGraph
