/* NODE MODULES */

/** LOCAL OBJECT
 * @property {object} factory - A module for creating objects
 * @property {object} map - A module for adding an retrieving event bindings
 */
var ROUTER = {
	factory: require('./factory')
}; 

/** MODULE INTERFACE 
 * @method {function} bind - Binds the events of an emitter object to the parties of interest
 */
module.exports = {
    bind: bind
};

/*----------------------------------------------------------------------------*/

/** Binds the events of an emitter object to the parties of interest in a particular namespace
 * @param {object} emitter - The object whose events are to be bound
 * @param {string} namespace - The namespace where the event mapping is to be done
 * @returns {object} boundEmitter - A new event emitter with the proper binding
 */
function bind(emitter, namespace) {
    var boundEmitter = ROUTER.factory.createEmitter(emitter, namespace);
    return boundEmitter;
}