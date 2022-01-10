const express = require('express')
const app = express()
const axios = require('axios').default;
const port = 3001
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())

const fs = require('fs')
let dataManagers = undefined
fs.readFile('./fixtures.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  dataManagers = JSON.parse(data)

})

app.post('/*', (req, res) => {
  axios.post('https://api.sorare.com' + req.path, req.body, {
    headers: {
      'Content-Type': 'application/json'
  }}).then((response) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.json(response.data)
  }).catch((e) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.json(response.json())
  })

  
})


app.get('/search/:key', (req, res) => {
  const manager = dataManagers.find((managerObject) => managerObject.manager.Nickname.toLowerCase().includes(req.params.key.toLowerCase()))
  res.json(JSON.stringify(manager))
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})