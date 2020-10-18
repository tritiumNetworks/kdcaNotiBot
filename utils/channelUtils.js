/**
 * @param {import('discord.js').TextChannel} channel
 */
function hasPermission (channel) {
  if (!channel) return false
  const permissions = channel.permissionsFor(channel.guild.me)
  return permissions.has('SEND_MESSAGES') && permissions.has('EMBED_LINKS')
}

/**
 * @param {import('discord.js').Guild} guild
 */
async function getTargetChannel (guild) {
  const channels = guild.channels.cache.array().filter((chn) => chn.type === 'text')
  for (const channel of channels) {
    if (channel.name.endsWith('-kdca') && hasPermission(channel)) {
      return channel
    }
  }
  return null
}

/**
 * @param {import('discord.js').Guild} guild
 */
async function getGreetingChannel (guild) {
  return await getTargetChannel(guild) ||
    (hasPermission(guild.systemChannel) ? guild.systemChannel : null) ||
    guild.channels.cache.filter((chn) => chn.type === 'text' && hasPermission(chn)).first() ||
    guild.owner
}

module.exports = { getTargetChannel, getGreetingChannel, hasPermission }
