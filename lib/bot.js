var Gitter = require('node-gitter'),
    log = require('./log');

/**
 * Abstract module for a regular bot
 */
module.exports = (function () {
    var _message = '';

    /**
     * Create new regular bot
     *
     * @param token
     * @param room
     * @constructor
     */
    function Bot(token, room) {
        this.gitter = new Gitter(token);
        this.room = room || '';
        this.message = {};
    }

    /**
     *
     * @type {Object}
     */
    Bot.prototype = Object.create(Object.prototype, {
        run: {
            /**
             * Start bot
             */
            value: function () {
                log.info('Waiting ...');
                this.join()
                    .then(this.onJoin.bind(this))
                    .fail(this.onFail.bind(this));
            }
        },
        join: {
            /**
             * Connect to the room
             *
             * @returns {*|string}
             */
            value: function () {
                return this.gitter.rooms.join(this.room);
            }
        },
        onJoin: {
            /**
             * Join handler
             *
             * @param room
             */
            value: function (room) {
                log.info('Joined room:', room.name);
                room.listen().on('message', this.onMessage.bind(this));
            }
        },
        onMessage: {
            /**
             * Message handler
             *
             * @param message
             */
            value: function (message) {
                this.message = message;

                if (_message !== message.text) {
                    log.info('Message:', message.text);
                    this.join()
                        .then(this.send.bind(this))
                        .fail(this.onFail.bind(this));
                }
            }
        },
        send: {
            /**
             * Send message to the room
             *
             * @param room
             */
            value: function (room) {
                var answer = this.answer;

                if (typeof answer !== 'undefined' && answer !== null) {
                    log.success('Answer:', this.answer);
                    room.send(this.answer);
                    _message = this.answer;
                }
                log.info('Waiting ...');
            }
        },
        answer: {
            /**
             * Answer for an expression
             *
             * @returns {*}
             */
            get: function () {
                return this.message.text;
            }
        },
        onFail: {
            /**
             * Error handler
             *
             * @param error
             */
            value: function (error) {
                log.error('Not possible to join the room:', error);
            }
        }
    });

    return Bot;
})();