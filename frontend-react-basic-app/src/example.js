//import assert from "assert";
//import {wallbundle} from "../src/bundle/WalletBundle.js";

import TransactionDB from './Storage/TransactionDB.js';
import CredentialsDB from './Storage/CredentialsDB.js';
var db = await TransactionDB.create();
var db2 = await TransactionDB.create();
var cdb = await CredentialsDB.create();
let sd = await db.save("a1", "key");
let sd1 = await db.save("a2", "key2");
var res = await db.get("a1");
var res2 = await db2.get("a1");
var arr = await db.getAll();
var res3 = await cdb.get("a1");
let bool=await cdb.isExist("a1")
console.assert(db, new TransactionDB())
let keys = new mybundle2('fd8cee9c1a3f3f57ab51b25740b24341ae093c8f697fde4df948050d3acd1700f6379d716104d2159e4912509c40ac81714d833e93b822e5ba0fadd68d5568a2');
console.log(keys.getPublicKey)
var wallet = new mybundle3();
var address = wallet.generate_address("0", "04104afaf5a596a835d6d2039059a6a864af698a1611b6667b6bbaa68887af6f362b20bbac2b35be4bdd72bb6c2bd6b9e9820ab6e3ec9288c72471f7a9c4b69a65");
var sig = new signaturebundle();
var message = "dd6d5849a507fc670db1c9ce77fea2166658e1c9b697b33ee9e1d07c03290da3"
var signature = sig.sign(keys.getKeypair, message);
var res = sig.verify(message, signature);
let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
let passphrase = "p4ssphr4se";
var mnem = new mnembundle(256);
var seed = mnem.createSeed(mnemonic_array, passphrase);
var g = 4;

