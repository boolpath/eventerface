/* NODE MODULES */
var eventEmitter = require('events').EventEmitter,
    emit = require('../emit'),
    on = require('../on'),
	map = require('../events-map'),
    unixSocket = require('./unixSocket');

/** LOCAL OBJECT
 * @property {object} maps - The set of event mapping namespaces
 */
var FACTORY = {
	maps: {}
}; 
FACTORY.maps['default'] = createMap();

/** MODULE INTERFACE 
 * @method {function} - 
 */
module.exports = {
    create: create,
    createEmitter: createEmitter
}

/*----------------------------------------------------------------------------*/

/** 
 * @param
 * @returns
 */
function create(options) {
    var newEventerface = {},
        namespace = options.namespace || 'eventerface';

    switch (options.type) {
    case 'router':
        if (options.reach === 'local') {
            unixSocket.create(namespace);
            newEventerface.bind = function (emitter) {
                return unixSocket.bind(namespace, emitter);
            }
        }
        break;
    default:
        break;
    }

    return newEventerface;
}

/** Creates a new event emitter object by attaching custom handlers and methods
 * @param {object} emitter - The base event emitter to be customized
 * @param {string} namespace - The namespace where the event mapping is to be done
 * @returns {object} newEmitter - The new event emitter object
 */
function createEmitter(emitter, namespace) {
	var tempEmitter = emitter || new eventEmitter(), eventMap,
        thisNamespace = (typeof namespace === 'string') ? namespace : 'default';
        
    if(!FACTORY.maps[thisNamespace]) {
    	createMap(thisNamespace);
    }
    eventMap = FACTORY.maps[thisNamespace];

    emit.bind(tempEmitter, eventMap);
    on.bind(tempEmitter, eventMap);

    var newEmitter = {
    	emit: tempEmitter.emit,
    	on: tempEmitter.on
    };
    return newEmitter;
}

/** Creates a new mapping of events and event listeners
 * @param {string} namespace - The name of the new map namespace. 
 * @returns {object}
 * @property {object} trees - An array for storing non-directed events
 * @property {object} routes - An array for storing directed events
 */
function createMap(namespace) {
	var mapName = namespace || 'default';
	if(typeof mapName !== 'string') {
		throw {name: 'NamespaceError', message: 'Parameter "namespace" must be a string.'};
	}
	else if(FACTORY && typeof FACTORY.maps[mapName] !== 'undefined') { 
		throw {name: 'NamespaceError', message: 'Namespace map '+mapName+' already exists.'};
	}

    FACTORY.maps[mapName] = map.create();
    return FACTORY.maps[mapName];
}
