import keypair from "../crypto/Keypair"
import mnemonic from "../crypto/Mnemonic"
import WalletAddress from "../crypto/WalletAddress";
test('KeysCreation', () => {
    let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
    let passphrase = "p4ssphr4se"
    let seed = new mnemonic(256).createSeed(mnemonic_array, passphrase);
    let keys = new keypair(seed);
    var xaxis=keys.getPubPoint.geXAxis;
    var yaxis=keys.getPubPoint.getYAxis;

    expect("8555373944426081830687847710964792997898504290743993476397732812360676876989206845269434932820242747100413174295708316494603962024254570854147060142363219").toStrictEqual(keys.getPubBigInteger)
    expect(keys.getPublicKey).toBe("04a359cbf789702dd4d6da661e90c0c1c3bc13bb3a7588b9c5c093cf2c9f65678f3afe11d2fb05dbed6553f63a6bb5d9b66c1a52abb7daade24a31fd870922d253");
    expect(keys.getPrivateKey).toBe("4921641cc8d597c31f33c1bd40c766d4c030a8d4d8a1f053264fad45072c16c5");
    expect(xaxis).toBe("73885651435926854515264701221164520142160681037984229233067136520784684869519");
    expect(yaxis).toBe("26683047389995651185679566240952828910936171073908714048119596426948530852435");
});

test('WalletCreation', () => {
    let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
    let passphrase = "p4ssphr4se"
    let seed = new mnemonic(256).createSeed(mnemonic_array, passphrase);
    let keys = new keypair(seed);
    var address=new WalletAddress();
    expect(address.generate_address(Buffer.from("0"),keys.getPublicKey)).toBe("ADR-GDQJ-JJTL-4IWX-4CUH-J73M-IRJP-BA44-UFXC-BNGK-HB6B")
});