const { resolve: path } = require('path')
const { Client } = require('discord.js')
const { existsSync } = require('fs')
const { kdcaRSS } = require('../utils/kdcaUtils')
const { readRecursively } = require('../utils/readFiles')

class eClient extends Client {
  constructor () {
    super()
    this.tt = {}

    this.tt.settingPath = path() + '/config.json'
    this.tt.settingHas = existsSync(this.tt.settingPath)

    if (this.tt.settingHas) {
      const {
        token = process.env.TOKEN,
        prefix = (process.env.PREFIX || 'kdca>'),
        ...settings
      } = require(this.tt.settingPath)

      if (!token) throw new Error('Token not provided')
      this.settings = { token, prefix, ...settings }
    } else throw new Error('./config.json not exists')

    this.tt.commandsPath = path() + '/commands'
    this.tt.commandsHas = existsSync(this.tt.commandsPath)

    if (this.tt.commandsHas) {
      this.commands = []
      readRecursively(this.tt.commandsPath)
        .forEach((command) => {
          if (!command.endsWith('.js')) return

          command = require(command)
          this.commands.push(command)
        })
    } else throw new Error('./commands/ folder not exists')
  }

  start (token = this.settings.token) {
    this.login(token)
  }

  regist (event = 'ready', exec = () => {}) {
    if (event === 'newContent') return kdcaRSS((...args) => exec(this, ...args))
    this.on(event, (...args) => {
      exec(this, ...args)
    })
  }
}

module.exports = eClient
