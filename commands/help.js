const help = (message) => {
  let result = '도움말\r\n'
  result += '!소식 - 가장 마지막 소식을 알려줍니다.'
  message.reply(result)
}

module.exports = help