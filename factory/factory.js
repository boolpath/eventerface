var eventEmitter = require('events').EventEmitter,
    emit = require('../emit'),
    on = require('../on');

module.exports = {
    createEmitter: createEmitter
}

/** Creates a new event emitter object by attaching custom handlers and methods
 * @param {object} emitter - The base event emitter to be customized
 * @returns {object} newEmitter - The new event emitter object
 */
function createEmitter(emitter) {
    var newEmitter = emitter || new eventEmitter();
    emit.attachTo(newEmitter);
    on.attachTo(newEmitter);

    return newEmitter;
}