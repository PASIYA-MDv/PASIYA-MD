module.exports = {
  command: 'ping',
  execute: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, { text: 'PONG! 🏓' })
  }
}
