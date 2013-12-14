/* NODE MODULES */

/** LOCAL OBJECT
 * @property {object} factory - A module for creating objects
 * @property {object} map - A module for adding an retrieving event bindings
 */
var EVENTERFACE = {
	factory: require('./factory'),
    maps: require('./maps')
}; 

/** MODULE INTERFACE 
 * @method {function} create - Creates a new evented interface, either as a routing channel or a RESTful API
 * @method {function} find - Finds an existing evented interface, either locally or remotely
 * @method {function} bind - Binds the events of an emitter object to the parties of interest
 */
module.exports = {
    create: create,
    find: find
};

/*----------------------------------------------------------------------------*/

/** Creates a new evented interface, either as a routing channel or a RESTful API
 * @param {object} options - Describes the features of the interface
 * @returns
 */
function create(options) {
    var newEventerface, 
        mapping,
        mappingOptions;

    switch (typeof options) {
    case 'undefined':
        mappingOptions = { 
            scope: 'local', 
            type: 'namespace'
        };
        break;
    case 'string':
        if (options.indexOf('/') === -1) {
            mappingOptions = { 
                name: options,
                scope: 'local', 
                type: 'namespace'
            };
        } else if (options.indexOf('/') === 0) {
            if (options.lastIndexOf('/') === 0) {
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

    console.log('Creating ' + mappingOptions.scope 
                + ' ' + mappingOptions.type 
                + ' "' + (mappingOptions.name || '') + '"');

    mapping = EVENTERFACE.maps.create(mappingOptions);
    newEventerface = EVENTERFACE.factory.createInterface(mapping);

    return newEventerface;
}

/** Finds an existing evented interface, either locally or remotely
 * @param {object} options - Information needed to find the interface
 * @returns
 */
function find(options, onFound) {
    var theEventerface,
        map;

    switch (typeof options) {
    case 'undefined':
        
        break;
    case 'string':
        if (options.indexOf('/') === -1) {
            
        } else if (options.indexOf('/') === 0) {
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
