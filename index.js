require("dotenv").config();
const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// 1. Ping Command
app.command("/dumb-bot-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong! 🏓\nLatency: ${latency}ms` });
});

// 2. Help Command
app.command("/dumb-bot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `*Available Commands:*\n• \`/dumb-bot-ping\` - Check bot latency\n• \`/dumb-bot-catfact\` - Get a random cat fact\n• \`/dumb-bot-help\` - Show this help menu`,
  });
});

// 3. Cat Fact Command (uses axios + try/catch)
app.command("/dumb-bot-catfact", async ({ ack, respond }) => {
  await ack();
  try {
    const res = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `🐱 *Cat Fact:* ${res.data.fact}` });
  } catch (error) {
    await respond({ text: "⚠️ Couldn't fetch a cat fact right now!" });
  }
});

// Global error catcher to stop random crashes
app.error(async (error) => {
  console.error("Bolt caught an error:", error);
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();