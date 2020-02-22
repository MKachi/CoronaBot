const discord = require('discord.js')

const status = (crawler, message) => {
  let result = '정보 출처 : https://coronamap.live/\r\n'
  const embed = new discord.RichEmbed()
    .setColor(0xFF0000)
    .setThumbnail('https://i.imgur.com/dthfKX4.png')
    .setTitle('현황')
    .addField('확진자', '가장 마지막 소식을 알려줍니다.')
    .addField('완치', '지금까지 집계된 확진자, 완치, 사망자의 수를 알려줍니다.')
    .addField('사망자', '지금까지 집계된 확진자, 완치, 사망자의 수를 알려줍니다.')
    .setDescription(result)
    .setFooter('https://github.com/MKachi/CoronaBot')
  message.channel.sendEmbed(embed)
}

module.exports = status