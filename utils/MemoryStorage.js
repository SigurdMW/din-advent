class MemoryStorage {
  constructor() {
    if (!!MemoryStorage.instance) {
      return MemoryStorage.instance
    }

    MemoryStorage.instance = this
    this.data = {}

    return this
  }

  get(name) {
    console.log("Running get for '" + name + "' and has value", this.data[name])
    if (this.data.hasOwnProperty(name)) {
      return this.data[name]
    }
    return undefined
  }

  set(name, value) {
    this.data[name] = value
  }
}
const inst = new MemoryStorage()

module.exports = inst
