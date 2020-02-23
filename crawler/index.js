const {
  writeLog
} = require('../utils')
const News = require('../models/news')
const webDriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const By = webDriver.By
const url = 'https://corona-live.com/'

module.exports = class Crawler {
  constructor() {
    this._lastMessage = null
    this._lastInfo = null
    this._status = []
  }

  async wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  async update() {
    writeLog('Info', 'Update')
    let flag = false
    let driver = await new webDriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
    try {
      await driver.get(url)
      await this.wait(3000)
      const messages = await driver.findElements(By.className('message'))
      for (let i = 0; i < messages.length; ++i) {
        const target = messages[i]

        // Label
        const header = await target.findElements(By.css('.time > div'))
        const label = await header[0].getText()

        // Timestamp
        let timestamp = ''
        if (header[1] != undefined && header.length > 1) {
          timestamp = await header[1].getText()
        }

        // 내용
        const info = await target.findElement(By.css('.text > .info'))
        const description = await info.getText()

        // 출처
        const source = await target.findElements(By.css('.source > a'))
        let link = ''
        if (source != undefined && source.length > 0) {
          link = await source[0].getAttribute('href')
        }

        if (i == 0) {
          const last = new News(label, timestamp, description, link)
          if (this._lastMessage != null && this._lastMessage.equals(last)) {
            return flag
          }
          flag = true
          this._lastMessage = last
        }

        if (label != '개발자') {
          this._lastInfo = new News(label, timestamp, description, link)
          break;
        }
      }

      const status = await driver.findElements(By.css('.stats-container > div > div > span'))
      this._status = []
      for (let i = 0; i < status.length; ++i) {
        this._status.push(await status[i].getText())
      }
    } catch (except) {
      writeLog('Except', except)
      return flag

    } finally {
      driver.quit()
    }
    return flag
  }

  getLastMessage() {
    return this._lastMessage
  }

  getLastInfo() {
    return this._lastInfo
  }

  getStatus() {
    return this._status
  }
}