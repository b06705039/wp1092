import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try{
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  } catch (error) {
    try{
      console.log(error.response.status)
      const err_msg = number + " is not a valid number (1 - 100)"
      return err_msg
    } catch (error) {
      return "Server not responding or not connected."
    }
  }
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
