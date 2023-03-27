import WalletAddress from "../crypto/WalletAddress";
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var assert = require('assert');
const SIZE=100;
test('Generate Wallet Test', () => {
    var address=new WalletAddress();
    expect(address.generate_address(Buffer.from("0"),"04104afaf5a596a835d6d2039059a6a864af698a1611b6667b6bbaa68887af6f362b20bbac2b35be4bdd72bb6c2bd6b9e9820ab6e3ec9288c72471f7a9c4b69a65")).toBe("ADR-GBQW-FKOL-XRJH-2YZ7-UN5S-SGAG-AJJH-4U2Z-TBLY-OOV2")
    //assert.equal(address.generate_address(Buffer.from("0"),"04104afaf5a596a835d6d2039059a6a864af698a1611b6667b6bbaa68887af6f362b20bbac2b35be4bdd72bb6c2bd6b9e9820ab6e3ec9288c72471f7a9c4b69a65"),"ADR-GBQW-FKOL-XRJH-2YZ7-UN5S-SGAG-AJJH-4U2Z-TBLY-OOV2");
});

test('Generate Multiple Wallet and check lenth length', () => {
    var address=new WalletAddress();
    for(let i=0;i<SIZE;i++) {
        var keyPair = ec.genKeyPair();
        expect(address.generate_address(Buffer.from("0"), keyPair.getPublic().encode("hex")).length).toBe(53);
    }
});