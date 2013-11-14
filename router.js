var factory = require('./factory');

module.exports = {
    bind: bind
};

/** Binds the events of an emitter object to the parties of interest
 * @param {object} emitter - The object whose events are to be routed
 * @returns {object} boundEmitter - A new event emitter with the proper binding
 */
function bind(emitter) {
    var boundEmitter = factory.createEmitter(emitter);
    return boundEmitter;
}