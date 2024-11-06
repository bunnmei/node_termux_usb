
const express = require("express")
const execSync = require('child_process').execSync;


const app = express()

const PORT = 3000

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.post("/on", (req, res) => {
  console.log("onが押されたよ")
  const output = execSync('am broadcast -a MY_CUSTOM_ACTION --es "extra_data" "on" -n com.example.broadcast_reboot/.BootCompletedReceiver').toString()
  console.log(output);
  res.send("ok")
})

app.post("/off", (req, res) => {
  const output = execSync('am broadcast -a MY_CUSTOM_ACTION --es "extra_data" "off" -n com.example.broadcast_reboot/.BootCompletedReceiver').toString()
  console.log(output);
  console.log("offが押されたよ")
  res.send("ok")
})


app.listen(PORT)