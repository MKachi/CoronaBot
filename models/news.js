module.exports = class News {
  constructor(label, timestamp, message, link) {
    this._label = label
    this._timestamp = timestamp
    this._message = message
    this._link = link
  }

  getLabel() {
    return this._label
  }

  getMessage() {
    return `${this.message}\r\n${link}`
  }

  equals(other) {
    if (
      other._label == undefined ||
      other._timestamp == undefined ||
      other._message == undefined ||
      other._link == undefined) {
      return false
    }

    if (
      this._label != other._label ||
      this._timestamp != other._timestamp ||
      this._message != other._message ||
      this._link != other._link) {
      return false
    }
    return true
  }
}