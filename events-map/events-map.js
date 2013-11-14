/* NODE MODULES */

/** LOCAL OBJECT
 *
 */
var MAP = {
	
};

/** MODULE INTERFACE 
 * @method {function} - 
 */
module.exports = {
    create: create
};

/*----------------------------------------------------------------------------*/

/** Creates a mapping of events and event listeners
 * @returns {object}
 * @property {object} trees - An object for storing non-directed events
 * @property {object} routes - An object for storing directed events
 */
function create() {
	var newMap = {
		trees: {},
		routes: {}
	};
	return newMap;
}