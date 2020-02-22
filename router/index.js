const {
  writeLog
} = require('../utils')
const settings = require('./router')

const router = (message) => {
  if (message.channel.type != 'dm') {
    return
  }

  settings.forEach(info => {
    if (message.content == info.command) {
      writeLog('Bot', `Route to ${info.command}`)
      info.route(message)
    }
  })
}

module.exports = router