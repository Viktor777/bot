var CalcBot = require('./lib/calc-bot'),
    calcBot,// = new CalcBot('Viktor777/bot');
    colors = require('colors');

if (process.argv[2]) {
    calcBot = new CalcBot(process.argv[2]);
    module.exports = calcBot.run();
} else {
    console.log('Please specify a room name'.red);
    process.exit(1);
}