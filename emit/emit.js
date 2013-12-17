/* NODE MODULES */

/** LOCAL OBJECT 
 * @property {} - 
 */
var EMIT = {
	
};

/** MODULE INTERFACE 
 * @method {function} - 
 */
module.exports = {
    bind: bind
};

/*----------------------------------------------------------------------------*/

/** Attaches a custom .emit() method to the emitter
 * @param {object} emitter - The emitter to which the .emit() handler will be attached
 * @param {string} map - The namespace where the event mapping is to be done
 * @returns {boolean} - True if the method could be attached
 */
function bind(emitter, map) {
    if (typeof emitter.emit !== 'function') {
        return false;
    }
    emitter.ownEmit = emitter.emit;

    emitter.emit = function (eventName, message) { 
        map.emit(eventName, message, emitter); 
    }

    return true;
}