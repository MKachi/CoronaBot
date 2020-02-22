const moment = require('moment')
require('moment-timezone')

const isEmpty = (value) => {
  if (
    typeof value == 'boolean' &&
    value != null &&
    value != undefined) {
    return false
  }

  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)) {
    return true
  }
  return false
}

const getKorTime = (format) => {
  moment.tz.setDefault('Asia/Seoul')
  return moment().format(format)
}
const writeLog = (type, message) => {
  console.log(`${getKorTime('YYYY-MM-DD HH:mm:ss')} : [${type}] ${message}`)
}

module.exports = {
  isEmpty,
  getKorTime,
  writeLog
}