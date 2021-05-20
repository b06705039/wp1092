import express from 'express'
import getNumber from '../core/getNumber.js'
// import dateFormat from 'dateformat'
// import fs from 'fs'
// import 'path'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
    
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true)
  res.json({ msg: 'The game has started.' })


  // let now = new Date();
  // console.log('../log/'+dateFormat(now,"yyyy-MM-dd-hh-mm")+'.log')
  // let logStream = fs.createWriteStream('../log/'+dateFormat(now,"yyyy-MM-dd-hh-mm")+'.log')
  // logStream.write("success");

})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed > number){
      res.send({msg:'smaller'});
    }
    else if(guessed < number){
      res.send({msg:'bigger'});
    }
    else{
      res.send({msg:'equal'});
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
    getNumber(true)
    res.json({msg:'the game has restart'})
})



export default router


// • 在 “server” 底下開個 “log” 資料夾, 把每次 server ON 以後遊戲的紀錄存在⼀個檔案裡，檔案名稱為
// “yyyy-mm-dd-hh-mm.log” (例如：”2021-04-30-18-32.log”)，即以 server ON 的時間為檔名，記錄每個
// 遊戲的動作，每個動作⼀⾏，格式建議如下 (記錄到 “秒“)：
// ✓ start number=57 2021-04-30-18-33-27
// ✓ guess 50 2021-04-30-18-33-50
// ✓ guess 75 2021-04-30-18-34-08
// ✓ guess 57 2021-04-30-18-34-22
// ✓ end-game
// ✓ restart number=38 2021-05-02-10-03-17
// Note: 寫 log 檔如果發⽣錯誤，應屬於 server side 的問題，於 server side 印出適當的 error/alert 即可，
// 不⽤回傳錯誤訊息給 client, 也不應該中斷遊戲。
// Note: 每次 server 重開應該都要重新開啟⼀個 log 檔，直到 server 關掉為⽌
// Note: 請將 “/log” ⽬錄加到 “.gitignore”, 不要把 log 也 check in 到 GitHub 上⾯去