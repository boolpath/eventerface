/* NODE MODULES */

/** LOCAL OBJECT
 *
 */
var MAP = {
	
};

/** MODULE INTERFACE 
 * @method {function} - 
 */
module.exports = {
    create: create
};

/*----------------------------------------------------------------------------*/

/** Creates a mapping of events and event listeners
 * @returns {object}
 * @property {object} trees - An object for storing non-directed events
 * @property {object} routes - An object for storing directed events
 */
function create() {
    var newMap = (function() {
        var events = {}, trees = {}, routes = {};

        return {
            emit: function(event, message, emitter) {
                if(!events[event]) {
                    events[event] = emitter;
                }
                
                if(trees[event]) {
                    console.log("Listeners on "+event);
                    trees[event].forEach(function(listener) {
                        listener.emit(event, message, true);
                    });    	
                }
            },
            on: function(event, message, listener) {
                if(!(trees[event] instanceof Array)) {
                    trees[event] = [];
                }
                trees[event].push(listener);
            }
        };
    }());
    return newMap;
}