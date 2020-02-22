const {
  writeLog
} = require('./utils')
const discord = require('discord.js')

const app = new discord.Client()

app.on('message', msg => router(app, msg))
app.on('ready', () => {
  writeLog('Info', `Corona bot is running at ${app.user.tag}`)
})
app.login('token')