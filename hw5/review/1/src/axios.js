import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/start')
    return msg
  } catch (error) {
    return HandleError(error)
  }


}

const guess = async (number) => {
  try {
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  } catch (error) {
    return HandleError(error)
  }
}

const restart = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/restart')

    return msg
  } catch (error) {
    return HandleError(error)
  }

}

const HandleError = (error) => {
  if (error.response) {
    console.error(error.response.data)
    return error.response.data.msg
  }
  else if (error.request) {
    console.log(error.request)
  }
  else {
    console.log(error)
  }
  return 'server not responding or not connected'
}

export { startGame, guess, restart }
