#!/usr/bin/env node
//var test=require("node:test");
//var assert =require("assert");
const java = require("java");
function myfunc2() {
    //return __dirname +"/adrestus-crypto-1.0-SNAPSHOT-jar-with-dependencies.jar";
    var va=typeof java
    return va;
    java.classpath.push(__dirname +"/adrestus-crypto-1.0-SNAPSHOT-jar-with-dependencies.jar");
    /*java.classpath.push(__dirname + "\\" + "adrestus-crypto-1.0-SNAPSHOT-jar-with-dependencies.jar");
    java.classpath.push(__dirname + "\\" + "lucene-core-7.4.0.jar");
    java.classpath.push(__dirname + "\\" + "lucene-analyzers-common-7.4.0.jar");
    java.classpath.push(__dirname + "\\" + "lucene-queryparser-7.4.0.jar");
    var list1 = java.newInstanceSync("java.util.ArrayList");
    var idx = java.newInstanceSync("org.apache.lucene.store.RAMDirectory");
    var analyzer = java.newInstanceSync("org.apache.lucene.analysis.standard.StandardAnalyzer");
    var si = list1.size();
//var clazz = java.findClassSync("WalletAddressExport");*/
    var mnemonic = "sample sail jungle learn general promote task puppy own conduct green affair";
    var passphrase = "p4ssphr4se";
    var result = java.callStaticMethodSync("io.Adrestus.crypto.WalletAddressExport", "getAddressFromMnemonic", mnemonic, passphrase);
    return result;
    return __dirname;
}
/*test('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual("ADR-ABAZ-ZEZO-MKGN-MQKJ-N3IF-P7QT-3MJX-ZFSM-RHOW-DZ7J", myfunc2());
});*/
myfunc2()
module.exports = {
    myfunc2,
    externals: {
        'C:\\Users\\User\\Documents\\GitHub\\AdrestusWallet\\frontend-react-basic-app\\node_modules\\java\\build\\Release\\nodejavabridge_bindings.node': 'java'
    }
};
