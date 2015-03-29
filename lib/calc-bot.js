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
     * @param regular
     * @constructor
     */
    function CalcBot(token, room, regular) {
        Bot.call(this, token, room);

        this.regular = regular || /\bcalc\s+([\d+\-/()*]+)/gm;
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
                var matches = this.message.match(this.regular),
                    answer = [],
                    expression = null,
                    result = null;

                if (Array.isArray(matches)) {
                    matches.forEach(function (v) {
                        expression = v.replace(/^\w+\s+/, '');

                        try {
                            result = math.eval(expression);

                            if (isFinite(result)) {
                                answer.push(expression + '=' + result);
                            } else {
                                log.error('Invalid expression:', expression);
                            }
                        } catch (e) {
                            log.error('Invalid expression:', expression, '\n' + e);
                        }
                    });
                }

                return answer.length ? answer.join('\n') : null;
            }
        }
    });
    CalcBot.prototype.constructor = CalcBot;

    return CalcBot;
})();