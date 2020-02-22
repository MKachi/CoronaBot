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
  }

  async init() {
    this._lastMessage = this._getTopMessage()
  }

  async _getTopMessage() {
    const driver = await new webDriver.Builder().forBrowser('chrome').build()
    try {
      await driver.get(url)
      const messages = await driver.findElements(By.className('messages'))
      const target = messages[0]

      const header = await target.findElements(By.css('.time > div'))
      const label = await target.findElements(By.css('.time > div'))
      let time = ''
      if (header[1] != undefined) {
        time = await header[1].getText()
      }

      const info = await target.findElement(By.css('.text > .info'))
      const message = await info.getText()

      // Selenium은 Element가 존재하는지 체크하는 함수가 없음
      // 따라서 findElements를 사용하여 length를 체크할 수 밖에 없음
      const a = await target.findElements(By.css('.text > a'))
      let link = ''
      if (a != undefined && a.length > 0) {
        link = await a[0].getAttribute('href')
      }

      return new News(header, label, message, link)
    } catch (except) {
      writeLog('Except', except)
      return null
    } finally {
      driver.quit()
    }
  }
  async isUpdate() {
    const beforeMessage = this._lastMessage
    this._lastMessage = await this._getTopMessage()
    if (beforeMessage.equals(this._lastMessage)) {
      return false
    }
    return true
  }

  getLastMessage() {
    return this._lastMessage
  }
}