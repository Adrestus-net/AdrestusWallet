import WalletAddress from "../crypto/WalletAddress";
import keypair from "../crypto/Keypair"
import mnemonic from "../crypto/Mnemonic"
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var assert = require('assert');
const SIZE=100;
test('Generate Wallet Test', () => {
    var address=new WalletAddress();
    let mnemonic_array = "spot yellow hope tornado lawsuit dutch moral gate learn control wood cook";
    let passphrase = "12345678"
    let seed = new mnemonic(128).createSeed(mnemonic_array, passphrase);
    let keys = new keypair(seed);
    expect(address.generate_address("0",keys.getPubBigInteger)).toBe("ADR-GAYP-S3KA-XZ26-QA45-RTGV-ZKBV-MY4J-5YBM-7IVL-VBHZ")
});