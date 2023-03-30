let elliptic = require('elliptic');
const crypto = require("crypto");
const mnemonic = require("../crypto/Mnemonic");
var keypair = require("../crypto/Keypair");
var Signature=require("../crypto/ECDSASignature")
let ec = new elliptic.ec('secp256k1');
const hash = crypto.createHash('sha256');

let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
let passphrase = "p4ssphr4se"
let seed = new mnemonic(256).createSeed(mnemonic_array, passphrase);
let keys = new keypair(seed);

var message="e713ba6967eb576b9938386aa5b3e8fa2ed8db9f5f049a5eed98e5e047be547d"
const buff = Buffer.from(message, "utf-8");
var arr = Array.prototype.slice.call(buff, 0)
var signer=new Signature();
let signature =signer.signwithNohash(keys.getKeypair,arr );


var v=signature.recoveryParam;
var r=signature.r.toString()
var s=signature.s.toString()

var recid = ec.getKeyRecoveryParam(message, signature, keys.getPublic,'hex');
let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
let pubKeyRecovered = ec.recoverPubKey(hexToDecimal(message), signature, signature.recoveryParam, "hex");
let compressed=pubKeyRecovered.encode("hex");
let validSig = signer.verifywithNohash(message, signature, pubKeyRecovered);

let g=2;