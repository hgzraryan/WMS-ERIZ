const cron = require('node-cron');

// Schedule a cron job to run a function every minute
cron.schedule('* * * * *', () => {
  console.log('Cron job executed!');
});