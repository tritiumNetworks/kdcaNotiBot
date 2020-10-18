const { MessageEmbed } = require('discord.js')
const { getTargetChannel } = require('../utils/channelUtils')

/**
 * @param {import('../classes/Client')} client
 * @param {import('../utils/kdcaUtils').data} data
 */
async function onNewContent (client, data) {
  if (!client.readyAt) return

  const guilds = client.guilds.cache.array()
  for (const guild of guilds) {
    const targetChannel = await getTargetChannel(guild)
    if (!targetChannel) return

    const embed = new MessageEmbed({
      url: 'https://www.cdc.go.kr' + data.url,
      color: 0xe4032e,
      title: data.title,
      description: data.author + ' (#' + data.id + ')\n\n' + (data.content.length > 100 ? data.content.slice(0, 99) + '...' : data.content)
    })

    targetChannel.send(embed)
    for (const table of data.tables.slice(0, 3)) {
      targetChannel.send('', {
        files: [{
          attachment: table,
          name: 'table.jpg'
        }]
      })
    }
  }
}

module.exports = onNewContent
