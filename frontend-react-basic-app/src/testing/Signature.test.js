import keypair from "../crypto/Keypair"
import mnemonic from "../crypto/Mnemonic"
import ECDSASignature from "../crypto/ECDSASignature"


//copyt this values to java function verifySecp256ECDSASignFromeNodJStest and EckeyPairTest.class
test('SignatureTest', () => {

    let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
    let passphrase = "p4ssphr4se"
    let seed = new mnemonic(256).createSeed(mnemonic_array, passphrase);
    let keys = new keypair(seed);

    var xaxis = keys.getPubPoint.geXAxis;
    var yaxis = keys.getPubPoint.getYAxis;

    expect(keys.getPublicKey).toBe("04a359cbf789702dd4d6da661e90c0c1c3bc13bb3a7588b9c5c093cf2c9f65678f3afe11d2fb05dbed6553f63a6bb5d9b66c1a52abb7daade24a31fd870922d253");
    expect(xaxis).toBe("73885651435926854515264701221164520142160681037984229233067136520784684869519");
    expect(yaxis).toBe("26683047389995651185679566240952828910936171073908714048119596426948530852435");

    var message = "dd6d5849a507fc670db1c9ce77fea2166658e1c9b697b33ee9e1d07c03290da3"
    var sig = new ECDSASignature();
    var signature = sig.sign(keys.getKeypair, message);

    expect(signature.recoveryParam).toBe(0);
    expect(signature.r.toString()).toBe("30179190089666276834887403079562508974417649980904472865724382004973443579854");
    expect(signature.s.toString()).toBe("14029798542497621816798343676332730497595770105064178818079147459382128035034");

    var res = sig.verify(message, signature);
    expect(res).toBe(true);
});

test('SignatureTestWithNohash', () => {

    let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
    let passphrase = "p4ssphr4se"
    let seed = new mnemonic(256).createSeed(mnemonic_array, passphrase);
    let keys = new keypair(seed);

    var xaxis = keys.getPubPoint.geXAxis;
    var yaxis = keys.getPubPoint.getYAxis;

    expect(keys.getPublicKey).toBe("04a359cbf789702dd4d6da661e90c0c1c3bc13bb3a7588b9c5c093cf2c9f65678f3afe11d2fb05dbed6553f63a6bb5d9b66c1a52abb7daade24a31fd870922d253");
    expect(xaxis).toBe("73885651435926854515264701221164520142160681037984229233067136520784684869519");
    expect(yaxis).toBe("26683047389995651185679566240952828910936171073908714048119596426948530852435");

    var message = "dd6d5849a507fc670db1c9ce77fea2166658e1c9b697b33ee9e1d07c03290da3"
    var sig = new ECDSASignature();
    var signature = sig.sign(keys.getKeypair, message)
    var res = sig.verify(message, signature);
    expect(res).toBe(true);
});