const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const ngrok = require("@ngrok/ngrok");
require('dotenv').config()
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

(async function() {
const listener = await ngrok.forward({ proto: 'tcp', addr: 25565, authtoken_from_env: true });
const serverip = listener.url();

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.user.setActivity(`${serverip}`, { type: 4});
    client.user.setStatus('dnd');
    const channel = client.channels.cache.get('channelid-here');
    channel.send(`Bot & Ngrok Online, Check my Status for the IP. \nRemove the tcp:// on the url \n\n${serverip}`);
});})();
client.login(token);