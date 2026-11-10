# Deploy this bot on Render

## Before you deploy

- Use this bot only on a server you own or have permission to access. Check the server host's rules; a bot cannot prevent Aternos from stopping a server under its inactivity policy.
- The bot is configured for Minecraft Java 1.16.5, username `anubis`, and offline-mode login. The Minecraft server must permit that kind of login. If `anubis` is registered with a server `/login` plugin, set `BOT_AUTH_PASSWORD` as a secret in Render.
- Do not commit passwords. The password shared in chat should be treated as exposed: change it if it is real, then add the new value only as a Render secret. `BOT_PASSWORD` is only relevant to account authentication; this project's default account mode is `offline`.
- The server's `!tp` feature is not needed. `settings.json` has an empty `tpWhitelist`, so `!tp` requests are not authorized. This is the bot's own chat-command allowlist, not a plugin or setting that must exist on your Minecraft server.

## Step-by-step

1. Confirm the changes are on the `main` branch of your GitHub repository.
2. Sign in at [Render](https://render.com), click **New +**, then **Blueprint**.
3. Connect GitHub and select `GSKHEPRIME/Aternos24-7-HostingBot`. If Render asks which branch, choose `main`; it will read `render.yaml`.
4. Review the service settings. It uses `npm ci` to build, `npm start` to run, and `/ping` as its health check.
5. In the Blueprint environment-variable form (or the service's **Environment** page), set:
   - `SERVER_HOST`: your Minecraft server address only (no `https://`; use the address Aternos displays).
   - `SERVER_PORT`: your server's actual port (usually `25565`, but use Aternos's displayed port).
   - `MC_VERSION`: `1.16.5`.
   - `BOT_USERNAME`: `anubis`.
   - `BOT_AUTH_PASSWORD`: leave blank if the server does not prompt for `/login`; otherwise enter the new server-login password as a secret. Do not put it in GitHub files.
   - `BOT_PASSWORD`: leave blank for this offline-mode configuration. Do not use this for a server `/login` password.
6. Click **Apply** / **Create Web Service** and wait for the deployment to finish.
7. Open the service's **Logs**. A successful connection logs that the bot spawned. If it cannot connect, check the exact server host/port, server availability, offline-mode setting, and login prompt/password.
8. Open the service URL in a browser. `/` is the dashboard, `/health` reports bot status, and `/ping` should return `pong`.

## Important Render free-plan limitation

Render's free web service can spin down when idle. This bot needs a continuously running process to stay connected, and a web-service health check or self-ping does not guarantee 24/7 operation. Use an always-on paid Render instance for continuous runtime, or expect the bot to disconnect while the free service is asleep. Aternos may also stop its server independently; the bot cannot override that policy.

## Local run

1. Install Node.js 20 or newer.
2. Clone/download the repository and run `npm ci`.
3. Set `SERVER_HOST` and `SERVER_PORT` to the server's address and port, then run `npm start`.
   - Linux/macOS: `SERVER_HOST=example.aternos.me SERVER_PORT=12345 npm start`
   - Windows PowerShell: `$env:SERVER_HOST='example.aternos.me'; $env:SERVER_PORT='12345'; npm start`
4. Add `BOT_AUTH_PASSWORD` to the environment only if the server requires `/login`.
