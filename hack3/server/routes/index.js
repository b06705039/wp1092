import { GetStations, CalculateDistance } from './station'

const wrap = fn => (...args) => fn(...args).catch(args[2])





function routes(app) {
  // set proper api path and connect the path with wrap(function)
  // coding here ...
  app.get('/api/getStation', wrap(GetStations))
  app.get('/api/getDistanse', wrap(CalculateDistance))
  
}

export default routes
