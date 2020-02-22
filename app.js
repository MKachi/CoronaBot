const {
  writeLog
} = require('./utils')
const dotenv = require('dotenv')
const discord = require('discord.js')
const router = require('./router')
const Crawler = require('./crawler')
const News = require('./models/news')

dotenv.config()

const app = new discord.Client()

app.on('message', msg => router(msg))

app.on('ready', () => {
  writeLog('Info', `Corona bot is running at ${app.user.tag}`)
})
app.login(process.env.TOKEN)