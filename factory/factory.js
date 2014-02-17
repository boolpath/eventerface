/* NODE MODULES */
var eventEmitter = require('events').EventEmitter,
    emit = require('../emit'),
    on = require('../on');

/** MODULE INTERFACE 
 * @method {function} createEmitter - Creates an event emitter in a given mapping context
                                      by attaching custom handlers and methods
 */
module.exports = {
    createEmitter: createEmitter
}

/*----------------------------------------------------------------------------*/

/** Creates an event emitter in a given mapping context by attaching custom handlers and methods
 * @param {string} mapping - The event mapping system where the emitter will be created
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