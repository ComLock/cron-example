import Cron from 'lib/enonic/cron';

// ┌───────────── second (0 - 59)
// │ ┌───────────── minute (0 - 59)
// │ │ ┌───────────── hour (0 - 23)
// │ │ │ ┌───────────── day of the month (1 - 31)
// │ │ │ │ ┌───────────── month (1 - 12)
// │ │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
// │ │ │ │ │ │                                   7 is also Sunday on some systems
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * command to execute

const jobs = [{
  cron: '0 0 0 * * 1',
  fn: () => {
    log.info('Once every monday at 00:00:00');
  }
}, {
  cron: '0 * * * * *',
  fn: () => {
    log.info('Once every minute');
  }
}];

const cron = new Cron(jobs); // Arrays are references in JS, I guess not keeping the reference would be the correct behaviour here.


cron.get(); // returns jobs array (a copy, not a reference to the originial js array)

jobs.pop();
jobs.pop();
jobs.push({
  cron: '* * * * * *',
  fn: () => {
    log.info('Once every second');
  }
});

cron.start(); // At this point the two original jobs will get called.
cron.update(jobs); // At this point the original jobs are gone and only 'Once every second' exists.
cron.stop(); // At this point no jobs will get called.

// Uncertain whether this is allow in js but you get the idea, this could be called in main.js destroy.
delete cron; // At this point whether cron is stopped or started should not matter, no jobs should be called.
