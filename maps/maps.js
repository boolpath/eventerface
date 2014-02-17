/* NODE MODULES */
var net = require('net'),
    fs = require('fs');

/** LOCAL OBJECT 
 * @property {local} - The module in charge of creating local namespaces
 * @property {global} - The module in charge of creating global namespaces and channels
 * @property {distributed} - The module in charge of creating distributed channels, stations and APIs
 */
var MAPS = {
    local: [],
    create: {
        local: {
            namespace: require('./namespace/local.js')
        },
        global: {
            namespace: require('./namespace/global.js')
        },
        distributed: {
            channel: require('./channel/distributed.js')
        }
    },
    find: require('./find.js')
};

/** MODULE INTERFACE
 *@method {function} create - Creates a mapping object for a local, global or distributed evented interface
 *@method {function} find - Finds an existing evented interface, either locally or remotely
 */
module.exports = {
    create: create,
    find: find 
};

/*----------------------------------------------------------------------------*/

/** Creates a mapping object for a local, global or distributed evented interface
 * @param {object} options - Describes the type and scope of the mapping to be done
 */
function create(options) {
    var type = options.type,    // namespace, channel, station, api
        scope = options.scope,  // local, global or distributed
        map;

    if (scope === 'local') {        // (same file)
        if (type === 'namespace') { // #create(): local namespace
            map = MAPS.create.local.namespace();
        }
    } else if (scope === 'global') {    // (same file system)
        if (type === 'namespace') {     // #create('app'): global namespace 'app'
            map = MAPS.create.global.namespace(options.name);
        } else if (type === 'channel') {

        }
    } else if (scope === 'distributed') {   // (different file systems)
        if (type === 'channel') {           // #create('channel://port')
            map = MAPS.create.distributed.channel(options.port);
        } else if (type === 'station') {

        } else if (type === 'api') {

        }
    }

    return map;
}

/** Finds an existing evented interface, either locally or remotely
 * @param {object} options - Information needed to find the evented interface 
 * @param {function} onFound - A callback to invoke when the evented interface is found
 */
function find(options, onFound) {
    var type = options.type,
        scope = options.scope;

    if (scope === 'global') {
        if (type === 'namespace') {
            MAPS.find.globalNamespace(options.name, onFound);
        } else if (type === 'channel') {

        }
    } else if (scope === 'distributed') {
        if (type === 'channel') {
            MAPS.find.distributed.channel(options, onFound);
        } else if (type === 'station') {

        } else if (type === 'api') {

        }
    }
}