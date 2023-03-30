var crypto = require('crypto')
let elliptic = require('elliptic');
let ec = new elliptic.ec('secp256k1');
const hash = crypto.createHash('sha256');
var assert = require('assert');
var mnemonic=require("./Mnemonic")
var adr_keypair=require("./Keypair")
var wallet=require("./WalletAddress")
const WalletAddress = require("./WalletAddress");


var mnmemo=new mnemonic(128).create();
const ALGORITHM='SHA-512'
var SALT='mnemonic'
var derivedKey
var mnemonic_array = "sample sail jungle learn general promote task puppy own conduct green affair";//.split("");
var passphrase_array = "p4ssphr4se";//.split("");
var mnmemo=new mnemonic(128).createSeed(mnemonic_array,passphrase_array)
var custom_keypair=new adr_keypair(mnmemo)
var xaxis=custom_keypair.getPubPoint.geXAxis;
var address=new WalletAddress();
var addres=address.generate_address(Buffer.from("0"),custom_keypair.getPublic_key)
var SALT=SALT.concat(passphrase_array);
var derivedKey=crypto.pbkdf2Sync(mnemonic_array, SALT, 2048, 512, ALGORITHM)
var val=derivedKey.toString('hex').substring(0,128)


let keyPair = ec.keyFromPrivate(val);
//let keyPair = ec.genKeyPair();
let privKey = keyPair.getPrivate("hex");
var pubPoint = keyPair.getPublic();
let pubKey = keyPair.getPublic().encode("hex");
var x = pubPoint.getX();
var y = pubPoint.getY();
var pub = { x: x.toString(), y: y.toString() };

var message="dd6d5849a507fc670db1c9ce77fea2166658e1c9b697b33ee9e1d07c03290da3"
hash.update(message);
var msgHash=hash.digest('hex');
let signature =keyPair.sign(msgHash);

var r=signature.r.toString()
var s=signature.s.toString()

var recid = ec.getKeyRecoveryParam(message, signature, keyPair.getPublic(),'hex');
let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
let pubKeyRecovered = ec.recoverPubKey(hexToDecimal(message), signature, signature.recoveryParam, "hex");
let compressed=pubKeyRecovered.encode("hex");
let validSig = ec.verify(message, signature, pubKeyRecovered);
var key = ec.keyFromPublic(pubKey, 'hex');

var res=key.verify(message, signature)


/*var key = ec.genKeyPair();
var msg = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
signature = key.sign(msg);
recid = ec.getKeyRecoveryParam(msg, signature, key.getPublic());
r =  ec.recoverPubKey(msg, signature, recid);
assert(key.getPublic().eq(r), 'the keys should match');*/

var f=3;
function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}
