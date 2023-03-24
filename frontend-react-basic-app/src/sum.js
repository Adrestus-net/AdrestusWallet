var crypto = require('crypto');
var unique = require('uniq');

function myfunc(a, b) {
    var salt = crypto.randomBytes(16).toString('hex');
    return a + b;
}

module.exports = {
    myfunc,
};