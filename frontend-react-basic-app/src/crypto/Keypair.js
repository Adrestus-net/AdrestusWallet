var elliptic = require('elliptic');
var ec = new elliptic.ec('secp256k1');
var Point=require("./PubPoint")
module.exports =class Keypair{


    ec
    Keypair
    private_key
    public_key

    PubPoint

    Y_Axis
    constructor(random) {
        this.Keypair = ec.keyFromPrivate(random);
        this.private_key=this.Keypair.getPrivate("hex");
        this.public_key=this.Keypair.getPublic("hex")
        this.PubPoint = new Point(this.Keypair.getPublic().getX().toString(),this.Keypair.getPublic().getY().toString());
    }

    get getKeypair() {
        return this.Keypair;
    }

    get getPublicKey() {
        return this.public_key;
    }

    get getPrivateKey() {
        return this.private_key;
    }

    get getPubPoint() {
        return this.PubPoint;
    }
}