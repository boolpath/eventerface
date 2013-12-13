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
            map = MAPS.create.local.namespace(options.name);
        }
        break;
    case 'global':
        if (type === 'namespace') {
            map = MAPS.create.global.namespace(options.name);
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