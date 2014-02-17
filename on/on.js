/** MODULE INTERFACE 
 * @method {function} bind - Binds an emitter's #on method to an event mapping context
 */
module.exports = {
    bind: bind
};

/*----------------------------------------------------------------------------*/

/** Binds an emitter's #on method to an event mapping context
 * @param {object} emitter - The emitter whose #on method wil be bound
 * @param {string} map - The mapping context to which the #on method wil be bound
 * @returns {boolean} - True if the handler could be attached
 */
function bind(emitter, map) {
	if (typeof emitter.on !== 'function') {
        return false;
    }
    // Save a reference to the emitter's #on method
    emitter.ownOn = emitter.on;

    // Expose a new #on method that subscribes the events to the specified map
    emitter.on = function (eventName, message) {
        map.on(eventName, message, emitter); 
        emitter.ownOn.apply(emitter, [].slice.apply(arguments));
    }

    return true;
}