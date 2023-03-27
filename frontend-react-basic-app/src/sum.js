
function myfunc(a, b) {
    /*const ALGORITHM='sha512'
    var SALT='mnemonic'
    var derivedKey
    var mnemonic_array = "sample sail jungle learn general promote task puppy own conduct green affair";//.split("");
    var passphrase_array = "p4ssphr4se";//.split("");
    var SALT=SALT.concat(passphrase_array);
    var derivedKey=crypto.pbkdf2Sync(mnemonic_array, SALT, 2048, 512, ALGORITHM)
    var val=derivedKey.toString('hex')
    var key = ec.genKeyPair();*/
    return a+b;
}


module.exports = {
    myfunc,
};