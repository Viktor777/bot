var Bot = require('./bot'),
    math = require('mathjs'),
    colors = require('colors');

module.exports = (function () {

    function CalcBot(room) {
        Bot.call(this, room);
    }

    CalcBot.prototype = Object.create(Bot.prototype, {
        answer: {
            get: function () {
                return this.exec();
            }
        },
        exec: {
            value: function () {
                var matches = this.message.text.match(/calc\s+([\d+\-/()*]+)/m),
                    result = null;

                if (Array.isArray(matches) && matches[1]) {
                    try {
                        result = matches[1] + '=' + math.eval(matches[1]);
                    } catch (e) {
                        console.log(colors.red('Invalid expression:', matches[1], '\n' + e));
                    }
                }

                return result;
            }
        }
    });
    CalcBot.prototype.constructor = CalcBot;

    return CalcBot;
})();