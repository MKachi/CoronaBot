const discord = require('discord.js')

const news = (crawler, message) => {
  const news = crawler.getLastInfo()
  const label = news.getLabel()
  const embed = new discord.RichEmbed()
    .setColor(0xFF0000)
    .setThumbnail('https://i.imgur.com/dthfKX4.png')
    .setTitle(news.getLabel())
    .setDescription(news.getMessage())
    .setFooter(news.getTimestamp())
  message.channel.sendEmbed(embed)
}

module.exports = news