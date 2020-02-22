const news = (crawler, message) => {
  const news = crawler.getLastMessage()
  const info = ''
  info += `${news.getLabel()} ${news.getTimestamp()}\r\n`
  info += news.getMessage()
  message.channel.send(news)
}

module.exports = news