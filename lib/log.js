var colors = require('colors');

/**
 * Module for logging different actions
 */
module.exports = Object.create({}, {
    info: {
        /**
         * Log info messages
         */
        value: function () {
            console.info(this.generate('Info', 'blue', arguments));
        }
    },
    success: {
        /**
         * Log results of success actions
         */
        value: function () {
            console.info(this.generate('Success', 'green', arguments));
        }
    },
    error: {
        /**
         * Log results of failed actions
         */
        value: function () {
            console.error(this.generate('Error', 'red', arguments));
        }
    },
    date: {
        /**
         * Date of logging
         *
         * @returns {string}
         */
        get: function () {
            return '[' + colors.gray((new Date()).toUTCString()) + ']';
        }
    },
    generate: {
        /**
         * Generate readable message
         *
         * @param label
         * @param color
         * @param message
         * @returns {string}
         */
        value: function (label, color, message) {
            return [
                this.date,
                label,
                colors[color](Array.prototype.slice.call(message, 0).join(' '))
            ].join(' ');
        }
    }
});