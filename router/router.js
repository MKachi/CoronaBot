const help = require('../commands/help')
const news = require('../commands/news')

module.exports = [{
  command: '!도움말',
  route: help
}, {
  command: '!소식',
  route: news
}]