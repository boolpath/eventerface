/** LOCAL OBJECT
 * @property {object} factory - A module for creating objects
 * @property {object} map - A module for adding an retrieving event bindings
 */
var EVENTERFACE = {
	factory: require('./factory'),
    maps: require('./maps')
}; 

/** MODULE INTERFACE 
 * @method {function} create - Creates a new evented interface, either as a routing channel or a RESTlike API
 * @method {function} find - Finds an existing evented interface, either locally or remotely
 * @method {function} bind - Binds the events of an emitter object to the parties of interest
 */
module.exports = {
    create: create,
    find: find
};

/*----------------------------------------------------------------------------*/

/** Creates a new evented interface, either as a routing channel or a RESTlike API
 * @param {object} options - Describes the features of the interface
 * @param {function} callback - A function to call when the eventerface is created
 * @returns {object} newEventerface - The eventerface object if a callback was no provided
 */
function create(options, callback) {
    var newEventerface, // Holds the created eventerface
        mappingOptions, // Describes the type of mapping according to the options parameter
        mapping;        // The event mapping object created according to mappingOptions

    // Inspect options
    if (typeof options === 'undefined') {
        // #create(): local namespace
        mappingOptions = { 
            scope: 'local', 
            type: 'namespace'
        };
    } else if (typeof options === 'string') {
        if (options.indexOf('/') === -1) {
            // #create(app): global namespace 'app'
            if (options.indexOf(':') === -1) {
                mappingOptions = { 
                    name: options,
                    scope: 'global', 
                    type: 'namespace'
                };
            } 
        } else if (options.indexOf('/') === 0) {
            if (options.lastIndexOf('/') === 0) {
            
            }
        } else {
            var parts = options.split('://');
            if (['channel', 'station', 'api'].indexOf(parts[0]) >= 0) {
                mappingOptions = { 
                    scope: 'distributed', 
                    type: parts[0],
                    port: parts[1]
                };
            }
        }
    } else if (typeof options === 'object') {

    }

    // console.log('Creating ' + mappingOptions.scope, mappingOptions.type, mappingOptions.name || '');

    // Create the event mapping object accoding to the specified options
    mapping = EVENTERFACE.maps.create(mappingOptions);

    // Return the created eventerface through a callback or by reference
    if (mappingOptions.scope === 'local') {
        return {
            emitter: function () {
                return EVENTERFACE.factory.createEmitter(mapping);
            }
        };
    } else if (mappingOptions.scope === 'global') {
        EVENTERFACE.maps.find(mappingOptions, function (eventerface) {
            if (typeof callback === 'function') {
                callback(eventerface);
            }
        });
    } else if (mappingOptions.scope === 'distributed') {
        if (typeof callback === 'function') {
            callback(mapping);
        }
    }
}

/** Finds an existing evented interface, either locally or remotely
 * @param {object} options - Information needed to find the eventerface
 * @param {function} onFound - A callback to invoke when the eventerface is found
 */
function find(options, onFound) {
    var mapping;

    if (typeof options === 'string') {
        // #find(app): global namespace 'app'
        if (options.indexOf('/') === -1) {
            if (options.indexOf(':') === -1) {
                mapping = {
                    name: options,
                    scope: 'global',
                    type: 'namespace' 
                };
            }
        } else if (options.indexOf('/') === 0) {
            if (options.lastIndexOf('/') === 0) {
                
            }
        } else {
            // #find(prefix://host:port): distributed <prefix> (channel, station or api)
            var parts = options.split('://'),
                target = parts[1].split(':');
            if (['channel', 'station', 'api'].indexOf(parts[0]) >= 0) {
                mapping = { 
                    scope: 'distributed', 
                    type: parts[0],
                    host: target[0],
                    port: target[1]
                };
            }
        }
    } else if (typeof options === 'object') {

    }

    EVENTERFACE.maps.find(mapping, onFound);
}