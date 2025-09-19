require('dotenv').config()

module.exports = {
  ownerNumbers: process.env.OWNER_NUMBER.split(','),
  sessionId: process.env.SESSION_ID,
  botName: process.env.BOT_NAME || 'PASIYA-MD PRIME',
  prefix: process.env.PREFIX || '.',
  language: process.env.LANGUAGE || 'en',
}
