
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('cron');
require("dotenv").config();


// Set your bot token here

// Set the image URL here
const imageUrl = 'https://cdn.discordapp.com/attachments/1065373320402452510/1083748902374748321/IMG-20230127-WA0002.jpg';

// Set the cron schedule for when the image should be posted (every Friday at 9:00 AM UTC in this example)
//const cronSchedule = '0 9 * * 5';
const cronSchedule = '*/2 * * * * *';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Set up the cron job to post the image on schedule
  const job = new cron.CronJob(cronSchedule, () => {
    const channel = client.channels.cache.get('1083867489722695800');
    if (channel) {
      // Post the image in the channel
      channel.send(imageUrl)
        .then(() => console.log('Image posted successfully'))
        .catch(console.error);
    } else {
      console.error('Channel not found');
    }
  });
  
  job.start();
});

client.login(process.env.TOKEN);