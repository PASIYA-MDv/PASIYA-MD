module.exports = {
  event: 'status',
  execute: async (sock, update) => {
    try {
      if (update.statusBroadcast) {
        const jid = update.key.participant || update.key.remoteJid

        await sock.sendMessage(jid, { 
          text: "✅ You just now status seen\nPOWERED_BUY PASIYA-MD PRIME BOT" 
        })
      }
    } catch (e) {
      console.error("Status Seen Error:", e)
    }
  }
}
