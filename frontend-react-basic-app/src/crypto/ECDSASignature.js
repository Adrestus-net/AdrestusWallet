var EC = require('elliptic').ec;
const crypto = require("crypto");

function ECDSASignature() {
    ECDSASignature.prototype.sign = function sign(keypair, message) {
        let hash = crypto.createHash('sha256');
        hash.update(message);
        var msgHash = hash.digest('hex');
        let signature = keypair.sign(msgHash);
        return signature
    }

    ECDSASignature.prototype.verify = function verify(message, signature) {
        var ec = new EC('secp256k1');
        let hash = crypto.createHash('sha256');
        hash.update(message);
        var msgHash = hash.digest('hex');

        let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
        let pubKeyRecovered = ec.recoverPubKey(hexToDecimal(msgHash), signature, signature.recoveryParam, "hex");

        return ec.verify(msgHash, signature, pubKeyRecovered);
    }

    ECDSASignature.prototype.signwithNohash = function signwithNohash(keypair, message) {
        let signature = keypair.sign(message);
        return signature
    }

    ECDSASignature.prototype.verifywithNohash = function verifywithNohash(message, signature) {
        var ec = new EC('secp256k1');
        let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
        let pubKeyRecovered = ec.recoverPubKey(hexToDecimal(message), signature, signature.recoveryParam, "hex");
        return ec.verify(message, signature, pubKeyRecovered);
    }
}

module.exports = ECDSASignature;