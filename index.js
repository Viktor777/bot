var CalcBot = require('./lib/calc-bot'),
    calcBot,
    log = require('./lib/log');

if (!process.env.TOKEN) {
    log.error('Please specify your application token');
    process.exit(1);
} else if (!process.argv[2]) {
    log.error('Please specify room name');
    process.exit(1);
} else {
    calcBot = new CalcBot(process.env.TOKEN, process.argv[2]);
    calcBot.run();
}