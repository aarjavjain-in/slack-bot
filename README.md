# dumb-bot 🤖

A 24/7 Slack bot built for the Hack Club Stardance mission using Node.js and `@slack/bolt` in Socket Mode, hosted persistently on Hack Club Nest.

## ✨ Features & Commands

All commands are prefixed to prevent workspace command collisions:

- `/dumb-bot-ping` — Checks the bot's live responsiveness and reports the round-trip latency in milliseconds.
- `/dumb-bot-catfact` — Queries the Cat Facts API (`https://catfact.ninja/fact`) and returns a random cat fact.
- `/dumb-bot-help` — Displays an interactive help menu listing all available commands.

## 🛠️ Tech Stack & Architecture

- **Runtime:** Node.js (v24 LTS)
- **Framework:** `@slack/bolt`
- **Protocol:** Slack Socket Mode (WebSocket connection; no exposed inbound HTTP ports required)
- **API Requests:** `axios`
- **Configuration:** `dotenv` for secure secret management

## 🚀 Hosting & Deployment

The bot runs 24/7 as an automated background service on **Hack Club Nest**:
- Managed by `systemd` via a custom unit file (`slackbot.service`).
- Configured with `Restart=always` to ensure automatic recovery across server reboots and network interruptions.
