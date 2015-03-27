var Bot = require('./bot'),
    math = require('mathjs'),
    log = require('./log');

/**
 * Module for a calculation bot
 */
module.exports = (function () {

    /**
     * Create new bot for calculation
     *
     * @param token
     * @param room
     * @constructor
     */
    function CalcBot(token, room) {
        Bot.call(this, token, room);
    }

    /**
     *
     * @type {Bot}
     */
    CalcBot.prototype = Object.create(Bot.prototype, {
        answer: {
            /**
             * Answer for an expression
             *
             * @returns {*|Array|{index: number, input: string}}
             */
            get: function () {
                return this.exec();
            }
        },
        exec: {
            /**
             * Execution of a formatted string
             *
             * @returns {*}
             */
            value: function () {
                var matches = this.message.text.match(/calc\s+([\d+\-/()*]+)/m),
                    answer = null,
                    result = null;

                if (Array.isArray(matches) && matches[1]) {
                    try {
                        result = math.eval(matches[1]);

                        if (isFinite(result)) {
                            answer = matches[1] + '=' + math.eval(matches[1]);
                        } else {
                            log.error('Invalid expression:', matches[1]);
                        }
                    } catch (e) {
                        log.error('Invalid expression:', matches[1], '\n' + e);
                    }
                }

                return answer;
            }
        }
    });
    CalcBot.prototype.constructor = CalcBot;

    return CalcBot;
})();