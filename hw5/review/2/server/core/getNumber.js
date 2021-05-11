let number

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
};

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(forceRestart || !number){
    console.log('got new number.')
    number = getRandom(1,100)
  }
  return number
}

export default getNumber
