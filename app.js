const {
  writeLog
} = require('./utils')
const dotenv = require('dotenv')
const discord = require('discord.js')
const router = require('./router')
const Crawler = require('./crawler')

dotenv.config()

const crawler = new Crawler()
const app = new discord.Client()

const sendNews = () => {
  if (crawler.update()) {
    app.guilds.forEach((guild) => {
      guild.channels.forEach((channel) => {
        if (channel.type == 'text') {
          const textChannel = new discord.TextChannel(guild, channel)

          const news = crawler.getLastInfo()
          const embed = new discord.RichEmbed()
            .setColor(0xFF0000)
            .setThumbnail('https://i.imgur.com/dthfKX4.png')
            .setTitle(news.getLabel())
            .setDescription(news.getMessage())
            .setFooter(news.getTimestamp())
          textChannel.sendEmbed(embed)
        }
      })
    })
  }
  setTimeout(sendNews, 60000)
}

app.on('message', msg => router(crawler, msg))
app.on('ready', () => {
  writeLog('Info', `Corona bot is running at ${app.user.tag}`)
  crawler.update().then(() => {
    writeLog('Info', 'Crawler is ready!')
    setTimeout(sendNews, 60000)
  })
})
app.login(process.env.TOKEN)