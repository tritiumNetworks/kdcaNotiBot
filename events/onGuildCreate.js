const { getGreetingChannel } = require('../utils/channelUtils')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Guild} guild
 */
async function onGuildCreate (client, guild) {
  const channel = await getGreetingChannel(guild)
  channel.send(
    '<@' + guild.owner.id + '> KDCA RSS 봇을 초대해 주셔서 감사합니다.\n' +
    'KDCA에서 작성한 보도내용을 실시간으로 전송해 드립니다.\n\n' +
    '=**주의**=\n' +
    '- `' + guild.name + '`의 채널중 이름 맨 마지막에 `-kdca`가 붙은 채널만 보도내용을 전송합니다\n' +
    '- 보도자료는 질병관리청에서 제공하지만 <@' + client.user.id + '>봇은 질병관리청에서 관리, 운영하지 않습니다\n' +
    '- 문의사항은 `Dev. PMH#7086`로 보내주시면 친절히 답변해 드립니다'
  )
}

module.exports = onGuildCreate
