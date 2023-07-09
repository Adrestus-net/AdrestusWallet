var mnem = new window.Mnemonic(128);
let mnem_arr=mnem.create();
var wallet = new walletbundle();
let address = wallet.generate_address("0", "04104afaf5a596a835d6d2039059a6a864af698a1611b6667b6bbaa68887af6f362b20bbac2b35be4bdd72bb6c2bd6b9e9820ab6e3ec9288c72471f7a9c4b69a65");
let b=3;

//no need standalone make sure encoding is utf8
// browserify src/crypto/Mnemonic.js --save utf-8-validate -o src/bundle/MnemonicBundle.js
//--remote-allow-origins=*
// browserify src/crypto/Mnemonic.js --save utf-8-validate --standalone mnembundle > src/bundle/MnemonicBundle.js

/*I just read through the answers and seems like nobody mentioned the use of the global variable scope? Which is usefull if you want to use the same code in node.js and in the browser.

    class Test
{
    constructor()
    {
    }
}
global.TestClass = Test;
Then you can access the TestClass anywhere.

<script src="bundle.js"></script>
<script>
    var test = new TestClass(); // Enjoy!
</script>
Note: The TestClass then becomes available everywhere. Which is the same as using the window variable.

    Additionally you can create a decorator that exposes a class to the global scope. Which is really nice but makes it hard to track where a variable is defined.*/

//merit,oval,sunset,kid,quit,model,flee,diagram,exile,lyrics,table,planet