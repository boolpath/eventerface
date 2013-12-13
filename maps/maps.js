/* NODE MODULES */
var net = require('net'),
    fs = require('fs');

/** LOCAL OBJECT 
 * @property {} - 
 */
var MAPS = {
    local: [],
    basepath: __dirname + '/../sockets/',
    create: {
        namespace: {
            local: require('./namespace/local.js'),
            global: require('./namespace/global.js')
        }
    }
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
    var type = options.type,
        map;

    switch (options.scope) {
    case 'local':
        if (type === 'namespace') {
            map = MAPS.create.namespace.local(options.name);
        }
        break;
    case 'global':
        if (type === 'namespace') {
            map = globalNamespace(options.name);
        } else if (type === 'channel') {

        }
        break;
    case 'distributed':
        if (type === 'channel') {

        } else if (type === 'station') {

        } else if (type === 'api') {

        }
        break;
    default:
        break;
    }

    return map;
}

/** Creates a simple global mapper that routes every event to its listeners
 * @param {string} name - The name of the map
 * @returns {object} map - The global map created
 */
function globalNamespace(name) {
    var map = {
        name: name || 'globalNamespace',
        events: {},     // A set of the emitted events
        trees: {}       // A set of arrays of listeners of events
    };
    var path = MAPS.basepath + name + '.sock';

    // Check if a UNIX socket has been created previously and unlink it
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    } 

    // Create a UNIX socket server
    net.createServer(function (socket) {
        
    }).listen(path, function () {
        console.log('Unix socket created: ' + name + '.sock');
    });

    // Map emitted events to all listeners by emitting the event on each of them
    map.emit = function () {

    };

    // Register a listener to a particular event
    map.on = function () {

    };

    return map;
}