const {
  writeLog
} = require('../utils')
const News = require('../models/news')
const webDriver = require('selenium-webdriver')
const By = webDriver.By
const url = 'https://coronamap.live'

module.exports = class Crawler {
  constructor() {
    this._lastMessage = null
    this._lastInfo = null
  }
  async update() {
    let driver = await new webDriver.Builder().forBrowser('chrome').build()
    try {
      await driver.get(url)
      const messages = await driver.findElements(By.className('message'))
      for (let i = 0; i < messages.length; ++i) {
        const target = messages[i]

        const header = await target.findElements(By.css('.time > div'))
        const label = await header[0].getText()
        let timestamp = ''
        if (header[1] != undefined && header.length > 1) {
          timestamp = await header[1].getText()
        }

        const message = await target.findElement(By.css('.text'))
        const info = await message.findElement(By.css('.info'))
        const infoValue = await info.getText()

        const link = await message.findElements(By.css('a'))

        let linkValue = ''
        if (link != undefined && link.length > 0) {
          linkValue = await link[0].getAttribute('href')
        }

        if (i == 0) {
          const last = new News(label, timestamp, infoValue, linkValue)
          if (this._lastMessage != null && this._lastMessage.equals(last)) {
            return false
          }
          this._lastMessage = last
        }

        if (label != '개발자') {
          this._lastInfo = new News(label, timestamp, infoValue, linkValue)
          break;
        }
      }

    } catch (except) {
      writeLog('Except', except)
      return false

    } finally {
      driver.quit()
    }
    return true
  }

  getLastMessage() {
    return this._lastMessage
  }

  getLastInfo() {
    return this._lastInfo
  }
}