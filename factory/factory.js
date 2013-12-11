/* NODE MODULES */
var eventEmitter = require('events').EventEmitter,
    emit = require('../emit'),
    on = require('../on'),
    unixSocket = require('./unixSocket');

/** LOCAL OBJECT
 * @property {object} maps - The set of event mapping namespaces
 */
var FACTORY = {
	maps: {}
}; 

/** MODULE INTERFACE 
 * @method {function} - 
 */
module.exports = {
    createInterface: createInterface,
    createEmitter: createEmitter
}

/*----------------------------------------------------------------------------*/

/** 
 * @param
 * @returns
 */
function createInterface(mapping) {
    var newEventerface = {
        emitter: function () {
            return createEmitter(mapping);
        }
    };

    return newEventerface;
}

/** Creates a new event emitter object by attaching custom handlers and methods
 * @param {string} mapping - The event mapping system to be used
 * @returns {object} mappedEmitter - The new, mapped event emitter object
 */
function createEmitter(mapping) {
	var tempEmitter = new eventEmitter(),
        mappedEmitter;
    
    emit.bind(tempEmitter, mapping);
    on.bind(tempEmitter, mapping);

    mappedEmitter = {
    	emit: tempEmitter.emit,
    	on: tempEmitter.on
    };

    return mappedEmitter;
}
