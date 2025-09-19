const { ownerNumbers, botName } = require('../config')

module.exports = {
  command: 'owner',
  execute: async (sock, msg, args) => {
    const text = `Bot Name: ${botName}\nOwner(s):\n${ownerNumbers.join('\n')}`
    await sock.sendMessage(msg.key.remoteJid, { text })
  }
}
