module.exports = {
    attachTo: attachTo
};

/** Attaches a custom .emit() method to the emitter
 * @param {object} emitter - The emitter to which the .emit() handler will be attached
 * @returns {boolean} - True if the method could be attached
 */
function attachTo(emitter) {
    return true;
}