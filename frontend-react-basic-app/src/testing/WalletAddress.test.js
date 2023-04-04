import WalletAddress from "../crypto/WalletAddress";
import keypair from "../crypto/Keypair"
import mnemonic from "../crypto/Mnemonic"
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var assert = require('assert');
const SIZE=100;
test('Generate Wallet Test', () => {
    var address=new WalletAddress();
    let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
    let passphrase = "p4ssphr4se"
    let seed = new mnemonic(256).createSeed(mnemonic_array, passphrase);
    let keys = new keypair(seed);
    expect("8555373944426081830687847710964792997898504290743993476397732812360676876989206845269434932820242747100413174295708316494603962024254570854147060142363219").toStrictEqual(keys.getPubBigInteger)
    expect(address.generate_address("0","8555373944426081830687847710964792997898504290743993476397732812360676876989206845269434932820242747100413174295708316494603962024254570854147060142363219")).toBe("ADR-GBXZ-Z5UR-3UVR-6XUE-NP4N-VDVA-BE3S-TLOL-GEYS-VLBJ")
    expect(address.generate_address("0","04a359cbf789702dd4d6da661e90c0c1c3bc13bb3a7588b9c5c093cf2c9f65678f3afe11d2fb05dbed6553f63a6bb5d9b66c1a52abb7daade24a31fd870922d253")).toBe("ADR-GDQJ-JJTL-4IWX-4CUH-J73M-IRJP-BA44-UFXC-BNGK-HB6B")
});

test('Generate Multiple Wallet and check length length', () => {
    var address=new WalletAddress();
    for(let i=0;i<SIZE;i++) {
        var keyPair = ec.genKeyPair();
        expect(address.generate_address("0", keyPair.getPublic().encode("hex")).length).toBe(53);
    }
});