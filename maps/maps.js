/* NODE MODULES */
var net = require('net'),
    fs = require('fs');

/** LOCAL OBJECT 
 * @property {} - 
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
 *@method {function} - 
 */
module.exports = {
    create: create,
    find: find 
};

/*----------------------------------------------------------------------------*/

/** Creates a new object for mapping multiple events to multiple listeners
 * @param {object} options - Describes the mapping to be done
 * @returns {object} map - The created map
 */
function create(options) {
    var type = options.type,
        scope = options.scope,
        map;

    if (scope === 'local') {
        if (type === 'namespace') { // #create(): local namespace
            map = MAPS.create.local.namespace();
        }
    } else if (scope === 'global') {
        if (type === 'namespace') { // #create('app'): global namespace 'app'
            map = MAPS.create.global.namespace(options.name);
        } else if (type === 'channel') {

        }
    } else if (scope === 'distributed') { // #create('channel://port')
        if (type === 'channel') {
            map = MAPS.create.distributed.channel(options.port);
        } else if (type === 'station') {

        } else if (type === 'api') {

        }
    }

    return map;
}

/** Finds the mapping context of an evented interface, either locally or remotely
 * @param {object} options - Information needed to find the interface mapping
 * @returns
 */
function find(options, onFound) {
    var type = options.type,
        scope = options.scope;

    if(scope === 'local') {
        if (type === 'namespace') {
            
        }
    } else if (scope === 'global') {
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