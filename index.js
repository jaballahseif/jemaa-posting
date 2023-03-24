
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('cron');
require("dotenv").config();
const keepAlive = require('./keep_alive.js');



const imageUrl = 'https://cdn.discordapp.com/attachments/1065373320402452510/1083748902374748321/IMG-20230127-WA0002.jpg';


const cronSchedule = '0 9 * * 5';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  const job = new cron.CronJob(cronSchedule, () => {
    const channel1 = client.channels.cache.get('1065373320402452510');
    const channel2 = client.channels.cache.get('634483057046585385');
    if (channel1 && channel2) {
      Promise.all([
        channel1.send(imageUrl),
        channel2.send(imageUrl)
      ])
        .then(() => console.log('Image posted successfully'))
        .catch(console.error);
    } else {
      console.error('One or more channels not found');
    }
  });

  job.start();
});

client.login(process.env.TOKEN);
keepAlive();