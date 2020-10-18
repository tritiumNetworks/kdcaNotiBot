const Client = require('./classes/Client')
const client = new Client()

const onReady = require('./events/onReady')
const onMessage = require('./events/onMessage')
const onNewContent = require('./events/onNewContent')
const onGuildCreate = require('./events/onGuildCreate')

client.start()
client.regist('ready', onReady)
client.regist('message', onMessage)
client.regist('newContent', onNewContent)
client.regist('guildCreate', onGuildCreate)
