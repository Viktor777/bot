var Gitter = require('node-gitter'),
    colors = require('colors');

module.exports = (function () {
    var TOKEN = 'ee5289006bf1d3f378fcb6f79bdbca771add627f',
        _message = '';

    function Bot(room) {
        this.gitter = new Gitter(TOKEN);
        this.room = room || '';
        this.message = {};
    }

    Bot.prototype = Object.create({}, {
        run: {
            value: function () {
                console.info('Waiting ...'.blue);
                this.join()
                    .then(this.onJoin.bind(this))
                    .fail(this.onFail.bind(this));
            }
        },
        join: {
            value: function () {
                return this.gitter.rooms.join(this.room);
            }
        },
        onJoin: {
            value: function (room) {
                room.listen().on('message', this.onMessage.bind(this));
            }
        },
        onMessage: {
            value: function (message) {
                this.message = message;

                if (_message !== message.text) {
                    console.info(colors.blue('Message:', message.text));
                    this.join()
                        .then(this.send.bind(this))
                        .fail(this.onFail.bind(this));
                }
            }
        },
        send: {
            value: function (room) {
                var answer = this.answer;

                if (typeof answer !== 'undefined' && answer !== null) {
                    console.info(colors.green('Answer:', this.answer));
                    room.send(this.answer);
                    _message = this.answer;
                }
                console.info('Waiting ...'.blue);
            }
        },
        answer: {
            get: function () {
                return this.message.text;
            }
        },
        onFail: {
            value: function (error) {
                console.error(colors.red('Not possible to join the room:', error));
            }
        }
    });

    return Bot;
})();