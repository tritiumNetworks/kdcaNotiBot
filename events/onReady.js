/**
 * @param {import('../classes/Client')} client
 */
function onReady (client) {
  console.log(
    client.user.username + ' is now online!\n' +
    'prefix: ' + client.settings.prefix
  )

  client.user.setActivity('-kdca로 끝나는 채널에서 작동합니다', { type: 'WATCHING' })
}

module.exports = onReady
