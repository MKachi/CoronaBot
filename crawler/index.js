const {
  writeLog
} = require('../utils')

const webDriver = require('selenium-webdriver')
const By = webDriver.By
const url = 'https://coronamap.live'

const crwlData = async () => {
  const driver = await new webDriver.Builder().forBrowser('chrome').build()
  try {
    await driver.get(url)
    const messages = await driver.findElements(By.className('messages'))
    for (let i = 0; i < messages.length; ++i) {
      const header = await messages[i].findElements(By.css('.time > div'))

      const label = await header[0].getText()
      if (label == '개발자') {
        continue
      }

      let time = ''
      if (header[1] != undefined) {
        time = await header[1].getText()
      }

      const info = await messages[i].findElements(By.css('.text > .info'))
      const message = await info.getText()

      const a = await messages[i].findElements(By.css('.text > a'))
      let link = ''
      if (a != undefined && a.length > 0) {
        link = await a[0].getAttribute('href')
      }
    }
  } catch (except) {
    writeLog('Except', except)
    return null
  } finally {
    driver.quit()
  }
}