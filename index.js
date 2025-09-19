const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@adiwajshing/baileys')
const { Boom } = require('@hapi/boom')
const chalk = require('chalk')
const figlet = require('figlet')
const { ownerNumbers, sessionId, botName, prefix } = require('./config')
const fs = require('fs')
const path = require('path')

async function startBot() {
  console.log(chalk.green(figlet.textSync(botName)))

  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${sessionId}`)

  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(chalk.blue(`Using WA Version v${version.join('.')}, isLatest: ${isLatest}`))

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if(connection === 'close') {
      const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
      console.log(chalk.red('Connection closed. Reconnecting:', shouldReconnect))
      if(shouldReconnect) startBot()
    } else if(connection === 'open') {
      console.log(chalk.green(`${botName} is online!`))
    }
  })

  // Load all plugins (commands) dynamically from plugins folder
  const pluginsPath = path.join(__dirname, 'plugins')
  const plugins = {}

  fs.readdirSync(pluginsPath).forEach(file => {
    if(file.endsWith('.js')) {
      const plugin = require(path.join(pluginsPath, file))
      plugins[plugin.command] = plugin.execute
    }
  })

  sock.ev.on('messages.upsert', async (m) => {
    if(!m.messages) return
    const msg = m.messages[0]
    if(!msg.message || msg.key.fromMe) return

    const from = msg.key.remoteJid
    const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text

    if(!messageContent) return

    if(ownerNumbers.includes(from.split('@')[0])) {
      if(messageContent.startsWith(prefix)) {
        const commandBody = messageContent.slice(prefix.length).trim()
        const command = commandBody.split(' ')[0].toLowerCase()
        const args = commandBody.split(' ').slice(1)

        if(plugins[command]) {
          try {
            await plugins[command](sock, msg, args)
          } catch(err) {
            await sock.sendMessage(from, { text: `Error executing command: ${err.message}` })
          }
        } else {
          await sock.sendMessage(from, { text: `Unknown command: ${command}` })
        }
      }
    }
  })
}

startBot()
