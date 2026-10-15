require("dotenv").config();
const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Command 1: Ping / Latency
app.command("/dumb-bot-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong! 🏓\nLatency: ${latency}ms` });
});

// Command 2: Help menu
app.command("/dumb-bot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `*Available Commands:*\n• \`/dumb-bot-ping\` - Check bot latency\n• \`/dumb-bot-catfact\` - Get a random cat fact\n• \`/dumb-bot-help\` - Show this help menu`,
  });
});

// Command 3: Cat Fact (API call)
app.command("/dumb-bot-catfact", async ({ ack, respond }) => {
  await ack();
  try {
    const res = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `🐱 *Cat Fact:* ${res.data.fact}` });
  } catch (error) {
    await respond({ text: "⚠️ Couldn't fetch a cat fact right now!" });
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();


app.command("/dumb-bot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});