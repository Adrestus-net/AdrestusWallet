var crypto = require('crypto')
var RIPEMD160 = require('ripemd160')
const hash = crypto.createHash('sha256');
var ripemd160stream = new RIPEMD160()
var base32 = require('hi-base32');
var adr_keypair=require("../Data/Keypair")


adr_keypair=new adr_keypair("sad","sda")
var avart=adr_keypair.getPublic_key
const SEPERATOR = "-";
const ADR_CHECKSUM = "ADR"+SEPERATOR;
const version = Buffer.from('0');
const ADR_CHECKSUM_BYTES = 4;


const key="04104afaf5a596a835d6d2039059a6a864af698a1611b6667b6bbaa68887af6f362b20bbac2b35be4bdd72bb6c2bd6b9e9820ab6e3ec9288c72471f7a9c4b69a65";

var sha256PublicKeyHash=hash.update(key).digest();

var ripemd160StepOneHash=new RIPEMD160().update(sha256PublicKeyHash).digest();

//var versionPrefixedRipemd160Hash=version.concat(ripemd160StepOneHash);
//var versionPrefixedRipemd160Hash=arrayCopy(version, 0, Buffer.from(ripemd160StepOneHash), 0, version.length);
var versionPrefixedRipemd160Hash=Buffer.concat([version,ripemd160StepOneHash],version.length+ripemd160StepOneHash.length);
var stepThreeChecksum=generateChecksum(versionPrefixedRipemd160Hash);
//var msgHash=hash.digest('hex');
//"84913b4fd6fd4ea406890cc29dffaa55d5843945"
var concatStepThreeAndStepSix=Buffer.concat([versionPrefixedRipemd160Hash,stepThreeChecksum],versionPrefixedRipemd160Hash.length+stepThreeChecksum.length);
var HG=concatStepThreeAndStepSix.toString('hex')
var encoded = base32.encode(concatStepThreeAndStepSix);

var final=preety_print(encoded);
var g=3;

function generateChecksum(versionPrefixedRipemd160Hash){
    let hash = crypto.createHash('sha256');
    let sha3StepThreeHash=hash.update(versionPrefixedRipemd160Hash).digest();
    let arr2=[];
    arrayCopy(sha3StepThreeHash, 0, arr2, 0, ADR_CHECKSUM_BYTES);
    return Buffer.from(arr2);
}

function arrayCopy(src, srcIndex, dest, destIndex, length) {
    dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
}

function preety_print(encoded){
    let res=ADR_CHECKSUM.concat(encoded)
    let parts = encoded.match(/.{1,4}/g);
    let encoded_seperators = parts.join(SEPERATOR);
    let final=ADR_CHECKSUM.concat(encoded_seperators);
    return final;
}

