const {
  writeLog
} = require('./utils')
const dotenv = require('dotenv')
const discord = require('discord.js')
const router = require('./router')
const Crawler = require('./crawler')
const News = require('./models/news')

dotenv.config()

const crawler = new Crawler()
const app = new discord.Client()

app.on('message', msg => router(crawler, msg))

app.on('ready', () => {
  writeLog('Info', `Corona bot is running at ${app.user.tag}`)
  crawler.init().then(() => {
    writeLog('Info', 'Crawler is ready!')
  })
})
app.login(process.env.TOKEN)