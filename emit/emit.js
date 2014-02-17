/** MODULE INTERFACE 
 * @method {function} bind - Binds an emitter's #emit method to an event mapping context
 */
module.exports = {
    bind: bind
};

/*----------------------------------------------------------------------------*/

/** Binds an emitter's #emit method to an event mapping context
 * @param {object} emitter - The emitter whose #emit method wil be bound
 * @param {string} map - The mapping context to which the #emit method wil be bound
 * @returns {boolean} - True if the method could be attached
 */
function bind(emitter, map) {
    if (typeof emitter.emit !== 'function') {
        return false;
    }
    // Save a reference to the emitter's #emit method
    emitter.ownEmit = emitter.emit;

    // Expose a new #emit method that routes the events to the specified map
    emitter.emit = function (eventName, message) { 
        map.emit(eventName, message, emitter); 
    }

    return true;
}