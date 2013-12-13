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
                name: options.name,
                scope: 'local', 
                type: 'namespace'
            };
        } 
        break;
    case 'object':
        
        break;
    default:
        break;
    }

    mapping = EVENTERFACE.maps.create(mappingOptions);
    newEventerface = EVENTERFACE.factory.createInterface(mapping);

    return newEventerface;
}

/** Finds an existing evented interface, either locally or remotely
 * @param
 * @returns
 */
function find() {
    
}
