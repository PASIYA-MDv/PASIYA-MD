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


main menu 
Command version info

const { cmd } = require('../lib/commands');

cmd({
  pattern: ['menu', 'help', 'මෙනු'],
  desc: 'Display main bot command list',
  category: 'Main',
  use: '.menu',
  filename: __filename
}, async (message, match, client) => {
  const menuText = 
💠 *PASIYA-MD PRIME BOT - MENU*
╭───────────────
│👑 Owner: Pasidu Sampath
│🤖 Bot: PASIYA-MD PRIME
│🌐 Version: 100.0.9 ULTRA
│📆 Updated: 2025-09-19
╰───────────────

📍 *Main Commands*
├ .menu / .help - Show this menu
├ .ai [msg] - Ask AI
├ .sticker - Image to sticker
├ .photo - Sticker to image
├ .tr [text] - Translate text
├ .status - Status seen reply
├ .news - Market updates

📊 *Forex/Trading*
├ .signal [XAU/USD] - Trading signal
├ .profit - Show daily profit
├ .trade - Auto trade

🛠 *Tools*
├ .pdf [img] - Make PDF
├ .short [link] - URL shortener
├ .tts [text] - Text to audio

🔐 Powered by PASIYA-MD PRIME BOT


  await client.sendMessage(message.jid, { text: menuText }, { quoted: message });
});
POWERED_BUY PASIYA-MD  LAAST UPDATE  PRIME ULTRA BOT 
