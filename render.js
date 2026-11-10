'use strict';

// Apply Render environment variables to the same settings object that index.js loads.
const settings = require('./settings.json');

const serverHost = process.env.SERVER_HOST || settings.server.ip;
if (!serverHost || serverHost === 'your.server.ip') {
  console.error('[Config] Set SERVER_HOST to your Minecraft server address (without a protocol).');
  process.exit(1);
}
settings.server.ip = serverHost;

if (process.env.SERVER_PORT) {
  const port = Number(process.env.SERVER_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('[Config] SERVER_PORT must be an integer from 1 to 65535.');
    process.exit(1);
  }
  settings.server.port = port;
}

settings.server.version = process.env.MC_VERSION || settings.server.version || '1.16.5';
settings['bot-account'].username = process.env.BOT_USERNAME || settings['bot-account'].username;
settings['bot-account'].password = process.env.BOT_PASSWORD || '';
settings.utils['auto-auth'].password = process.env.BOT_AUTH_PASSWORD || '';

require('./index.js');
