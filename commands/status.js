const discord = require('discord.js')

const status = (crawler, message) => {
  const infos = crawler.getStatus()
  let result = '정보 출처 : https://coronamap.live/\r\n'
  const embed = new discord.RichEmbed()
    .setColor(0xFF0000)
    .setThumbnail('https://i.imgur.com/dthfKX4.png')
    .setTitle('현황')
    .addField('확진자', infos[0])
    .addField('완치', infos[1])
    .addField('사망자', infos[2])
    .setDescription(result)
    .setFooter('https://github.com/MKachi/CoronaBot')
  message.channel.sendEmbed(embed)
}

module.exports = status