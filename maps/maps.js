/* NODE MODULES */

/** LOCAL OBJECT 
 * @property {} - 
 */
var MAPS = {
    local: []
};

/** MODULE INTERFACE
 *@method {function} - 
 */
module.exports = {
    create: create  
};

/*----------------------------------------------------------------------------*/

/** Creates a new object for mapping multiple events to multiple listeners
 * @param {object} options - Describes the mapping to be done
 * @returns {object} map - The created map
 */
function create(options) {
    var map;

    switch (options.reach) {
    case 'local':
        map = localMap(options.name);
        break;
    default:
        break;
    }

    return map;
}

/** Creates a simple local mapper that routes every event to its listeners
 * @param {string} name - The name of the map
 * @returns {object} map - The local map created
 */
function localMap(name) {
    var map = {
        name: name || 'localMap',
        events: {},     // A set of the emitted events
        trees: {}       // A set of arrays of listeners of events
    };

    // Check if the map already exists
    if (MAPS.local[map.name]) {
        return false;
    } else {
        MAPS.local[map.name] = map;
    }

    // Map emitted events to all listeners by emitting the event on each of them
    map.emit = function(eventName, message, emitter) {
        // Register the event if this is the first time it is emitted
        var eventEmitter = map.events[eventName];
        if (!eventEmitter) {
            eventEmitter = emitter;
        }

        // If there are any registered listeners to this particular event:
        var eventListeners = map.trees[eventName];
        if (eventListeners) {
            eventListeners.forEach(function(listener) {
                if (typeof listener === 'object' && eventEmitter !== listener &&
                    typeof listener.emit === 'function') {
                    listener.own_emit(eventName, message, true);
                }
            });     
        }
    }

    // Register a listener to a particular event
    map.on = function(eventName, message, listener) {
        if (!(map.trees[eventName] instanceof Array)) {
            map.trees[eventName] = [];
        }
        map.trees[eventName].push(listener);
    }

    return map;
}