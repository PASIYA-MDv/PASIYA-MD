module.exports = {
  command: 'echo',
  execute: async (sock, msg, args) => {
    if(args.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, { text: 'Please provide text to echo.' })
    }
    const echoText = args.join(' ')
    await sock.sendMessage(msg.key.remoteJid, { text: echoText })
  }
}
