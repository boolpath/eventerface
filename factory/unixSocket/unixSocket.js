/* NODE MODULES */
var net = require('net'),
    fs = require('fs');

/** LOCAL OBJECT 
 * @property {} - 
 */
var LOCAL = {
    
};

/** MODULE INTERFACE
 *@method {function} - 
 */
module.exports = {
    create: create,
    listen: listen
};

/*----------------------------------------------------------------------------*/

/** 
 * @param
 * @returns
 */
function create(name) {
    var path = __dirname + '/../../sockets/' + name + '.sock';
    
    fs.stat(path, function (err) {
        if (!err) { fs.unlinkSync(path); }

        net.createServer(function () {
            console.log('New connection to unix socket ' + name);
        }).listen(path, function () {
            console.log('Unix socket created on ' + path);
        });
    });

}

/** 
 * @param
 * @returns
 */
function listen(name) {
    
}