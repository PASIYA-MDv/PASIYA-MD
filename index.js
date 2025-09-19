// index.js
// ======================================
// PASIYA-MD PRIME BOT
// POWERED_BY PASIYA-MD
// ======================================

import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys"
import { Boom } from "@hapi/boom"
import pino from "pino"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import figlet from "figlet"
import chalk from "chalk"
import ora from "ora"

dotenv.config()

// === CONFIG ===
const SESSION_ID = process.env.SESSION_ID || null
const OWNER_NUMBERS = ["94784548818", "94766359869"] // Owners
const BOT_NAME = "PASIYA-MD PRIME BOT"

// === START BOT ===
async function startBot() {
    const spinner = ora("Starting PASIYA-MD PRIME BOT...").start()

    const { state, saveCreds } = await useMultiFileAuthState("sessions")

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !SESSION_ID, // Show QR if no session_id
        auth: state,
        browser: [BOT_NAME, "Chrome", "1.0.0"]
    })

    // connection updates
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update
        if (qr) {
            console.log(chalk.yellow("📌 Scan this QR to login"))
        }
        if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("❌ Logged out. Scan again."))
                startBot()
            } else {
                console.log(chalk.red("⚠️ Connection closed, reconnecting..."))
                startBot()
            }
        } else if (connection === "open") {
            spinner.succeed("✅ Connected successfully!")
            console.log(chalk.green(`🤖 ${BOT_NAME} is online!`))
        }
    })

    // save creds
    sock.ev.on("creds.update", saveCreds)

    // messages
    sock.ev.on("messages.upsert", async (msg) => {
        const m = msg.messages[0]
        if (!m.message) return
        const sender = m.key.remoteJid
        const text = m.message.conversation || m.message.extendedTextMessage?.text || ""

        // === MENU ===
        if (text.toLowerCase() === ".menu") {
            await sock.sendMessage(sender, {
                text: `👋 Hello! I am *${BOT_NAME}*
                
🛠️ Owner: Pasidu Sampath
📞 Contact: ${OWNER_NUMBERS.join(", ")}

Available Commands:
.menu - Show this menu
.ping - Test bot status
.status - Just now status seen

POWERED_BY PASIYA-MD PRIME BOT`
            })
        }

        // === PING ===
        if (text.toLowerCase() === ".ping") {
            await sock.sendMessage(sender, { text: "✅ Bot is online!" })
        }

        // === STATUS SEEN DEMO ===
        if (text.toLowerCase() === ".status") {
            await sock.sendMessage(sender, { text: "👀 You just now status seen\nPOWERED_BY PASIYA-MD PRIME BOT" })
        }
    })
}

startBot()
