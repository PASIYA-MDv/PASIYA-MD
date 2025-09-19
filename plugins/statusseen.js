module.exports = {
  event: 'status',
  execute: async (sock, update) => {
    try {
      if (update.statusBroadcast) {
        const jid = update.key.participant || update.key.remoteJid
        const user = jid.split('@')[0]
        const time = new Date().toLocaleTimeString()

        await sock.sendMessage(jid, { text: `✅ Just now status seen by ${user} at ${time}` })
      }
    } catch (e) {
      console.error("Status Seen Error:", e)
    }
  }
}
