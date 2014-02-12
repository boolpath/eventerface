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
    switch (typeof options) {
    case 'undefined':
        // #create(): local namespace
        mappingOptions = { 
            scope: 'local', 
            type: 'namespace'
        };
        break;
    case 'string':
        if (options.indexOf('/') === -1) {
            // #create(app): local namespace 'app'
            mappingOptions = { 
                name: options,
                scope: 'local', 
                type: 'namespace'
            };
        } else if (options.indexOf('/') === 0) {
            if (options.lastIndexOf('/') === 0) {
            // #create(/app): global namespace 'app'
                mappingOptions = {
                    name: options.split('/')[1],
                    scope: 'global',
                    type: 'namespace'
                };
            }
        }
        break;
    case 'object':
        
        break;
    default:
        break;
    }

    console.log('Creating ' + mappingOptions.scope, mappingOptions.type, mappingOptions.name || '');

    // Create the event mapping object accoding to the specified options
        mapping = EVENTERFACE.maps.create(mappingOptions);
    // Create the eventerface using the mapping object
        newEventerface = EVENTERFACE.factory.createInterface(mapping);

    // Return the created eventerface through a callback or by reference
    if (mappingOptions.scope === 'global' && typeof callback === 'function') {
        EVENTERFACE.maps.find(mappingOptions, function (eventerface) {
            callback(eventerface);
        });
    } else {
        return newEventerface;
    }
}

/** Finds an existing evented interface, either locally or remotely
 * @param {object} options - Information needed to find the eventerface
 * @param {function} onFound - A callback to invoke when the eventerface is found
 */
function find(options, onFound) {
    var map;

    switch (typeof options) {
    case 'undefined':
        
        break;
    case 'string':
        if (options.indexOf('/') === -1) {
            
        } else if (options.indexOf('/') === 0) {
            // #find(/app): global namespace 'app'
            if (options.lastIndexOf('/') === 0) {
                map = {
                    name: options.split('/')[1],
                    scope: 'global',
                    type: 'namespace' 
                };
            }
        }
        break;
    case 'object':
        
        break;
    default:
        break;
    }

    EVENTERFACE.maps.find(map, onFound);
}
