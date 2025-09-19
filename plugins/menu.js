module.exports = {
  name: "menu",
  alias: ["help", "commands"],
  desc: "Show all available commands",
  type: "main",
  execute: async (sock, m) => {
    try {
      let text = `
╭━━━〔 🤖 PASIYA-MD PRIME BOT 〕━━━╮
┃ OWNER : Pasidu Sampath
┃ OWNERS : 94784548818 / 94766359869
┃ ADMIN  : Kaveesha Dewmina (94722977523)
┃ PREFIX : .
┃ POWERED_BUY PASIYA-MD PRIME BOT
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

📌 Available Commands:
> .menu / .help - Show this menu
> .ping - Test bot status
> .status - Just now status seen
> .owner - Show owner details
> .about - Bot details

More plugins coming soon... 🚀
`
      await sock.sendMessage(m.chat, { text }, { quoted: m })
    } catch (e) {
      console.error("Menu error:", e)
      await sock.sendMessage(m.chat, { text: "⚠️ Error showing menu." })
    }
  }
}
