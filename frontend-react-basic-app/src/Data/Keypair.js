var elliptic = require('elliptic');
var ec = new elliptic.ec('secp256k1');
var Point=require("../crypto/PubPoint")
module.exports =class Keypair{
    #private_key
    #public_key

    #PubPoint

    #Y_Axis
    constructor(random) {
        let keyPair = ec.keyFromPrivate(random);
        this.#private_key=keyPair.getPrivate("hex");
        this.#public_key=keyPair.getPublic("hex")
        this.#PubPoint = new Point(keyPair.getPublic().getX().toString(),keyPair.getPublic().getY().toString());
    }
    get getPublic_key() {
        return this.#public_key;
    }

    get getPrivateKey() {
        return this.#private_key;
    }

    get getPubPoint() {
        return this.#PubPoint;
    }
}