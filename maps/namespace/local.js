/** Creates a simple local mapper that routes every event to its listeners
 * @returns {object} map - The created event mapping context
 */
module.exports = function () {
    var map = {
        trees: {}       // A set of arrays of listeners of events
    };

    // Map emitted events to all listeners by emitting the event on each of them
    map.emit = function (eventName, message, emitter) {
        // If there are any registered listeners to this particular event:
        var eventListeners = map.trees[eventName];
        if (eventListeners) {
            // Send the event to each listener
            eventListeners.forEach(function (listener) {
                if (typeof listener === 'object' && emitter !== listener &&
                    typeof listener.emit === 'function') {
                    listener.ownEmit(eventName, message);
                }
            });     
        }
    }

    // Register a listener to a particular event
    map.on = function (eventName, message, listener) {
        if (!(map.trees[eventName] instanceof Array)) {
            map.trees[eventName] = [];
        }
        map.trees[eventName].push(listener);
    }

    return map;
}