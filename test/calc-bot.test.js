var assert = require('assert'),
    CalcBot = require('../lib/calc-bot'),
    calcBot,
    room;

if (!process.env.TOKEN) {
    console.error('Please specify your application token');
    process.exit(1);
}

describe('Calc Bot', function () {
    before(function() {
        room = 'Viktor777/bot';
        calcBot = new CalcBot(process.env.TOKEN, room);
    });

    it('should execute an expression from message and calculate it', function () {
        calcBot.message = 'calc 1+1';
        assert.equal(calcBot.answer, '1+1=2');
        calcBot.message = 'calc (';
        assert.equal(calcBot.answer, null);
        calcBot.message = 'calc 1/0';
        assert.equal(calcBot.answer, null);
        calcBot.message = 'calc 10+(5+3)/(1+1)-24';
        assert.equal(calcBot.answer, '10+(5+3)/(1+1)-24=-10');
        calcBot.message = 'calc 10+(5+3)/(1+1)-24 calc 1/0 calc 1+1';
        assert.equal(calcBot.answer, '10+(5+3)/(1+1)-24=-10\n1+1=2');
        calcBot.message = 'Test calc 10+(5+3)/(1+1)-24 test calc 1/1\n calc 1+1\n\ntest calc 2+3\ncalc 10-1';
        assert.equal(calcBot.answer, '10+(5+3)/(1+1)-24=-10\n1/1=1\n1+1=2\n2+3=5\n10-1=9');
        calcBot.message = 'Testcalc 1+1';
        assert.equal(calcBot.answer, null);
    });
});