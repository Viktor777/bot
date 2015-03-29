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
        this.answer = 'Hello I\'m bot.';
        this.gitter = new Gitter(token);
        this.message = null;
        this.room = room || '';
    }

    /**
     *
     * @type {{run: Function, join: Function, onJoin: Function, onMessage: Function, send: Function, onFail: Function}}
     */
    Bot.prototype = {
        /**
         * Start bot
         */
        run: function () {
            log.info('Waiting ...');
            this.join()
                .then(this.onJoin.bind(this))
                .fail(this.onFail.bind(this));
        },
        /**
         * Connect to the room
         *
         * @returns {*|string}
         */
        join: function () {
            return this.gitter.rooms.join(this.room);
        },
        /**
         * Join handler
         *
         * @param room
         */
        onJoin: function (room) {
            log.info('Joined room:', room.name);
            room.listen().on('message', this.onMessage.bind(this));
        },
        /**
         * Message handler
         *
         * @param message
         */
        onMessage: function (message) {
            this.message = message.text;

            if (_message !== this.message) {
                log.info('Message:', this.message);
                this.join()
                    .then(this.send.bind(this))
                    .fail(this.onFail.bind(this));
            }
        },
        /**
         * Send message to the room
         *
         * @param room
         */
        send: function (room) {
            var answer = this.answer;

            if (typeof answer !== 'undefined' && answer !== null) {
                log.success('Answer:', answer);
                room.send(answer);
                _message = answer;
            }
            log.info('Waiting ...');
        },
        /**
         * Error handler
         *
         * @param error
         */
        onFail: function (error) {
            log.error('Not possible to join the room:', error);
        }
    };

    return Bot;
})();