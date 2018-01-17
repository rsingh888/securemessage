var testIdentity= {
            type: 'ethereum',
            display: '0xE092bc53aC92067aD133dA39F11776563Aac632f',
            privateKey: 'b1afa1202dd8fe77c420906f89f362acf06d31733657ed713657f4826b787a9e',
            publicKey: '046e9550bf756c9944639bd33d5a6f73edb50acf1ab49f556e8898052a208acb76339f2be30bbc3fa07e5ba3494c0cc70bd2',
            foreign: false
        };
var message = "foobar";
var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');

    /**
     * encrypt the message with the publicKey of identity
     * @param  {{privateKey: ?string, publicKey: string}} identity
     * @param  {string} message
     * @return {string}
     */
    var encrypt = function(identity, message) {

        /*
         * this key is used as false sample, because bitcore would crash when alice has no privateKey
         */
        var privKey = new bitcore.PrivateKey('5450b56c1e299ed624fffe5f44160a6a28039f68ba9cdb081b446ff25dc7c765');
        var alice = ECIES().privateKey(privKey).publicKey(new bitcore.PublicKey(identity.publicKey));
        var encrypted = alice.encrypt(message);

        return encrypted.toString('hex');
    };

    /**
     * decrypt the message with the privateKey of identity
     * @param  {{privateKey: ?string, publicKey: string}}   identity
     * @param  {string}   encrypted
     * @return {string}   message
     */
    var decrypt = function(identity, encrypted) {
        var privKey = new bitcore.PrivateKey(identity.privateKey);
        var alice = ECIES().privateKey(privKey);

        var decryptMe = new Buffer(encrypted, 'hex');

        var decrypted = alice.decrypt(decryptMe);
        return decrypted.toString('ascii');
    };



var enc = encrypt(testIdentity, message);
var dec = decrypt(testIdentity, enc);

console.log(enc);
console.log(dec);
if(dec!=message){
  console.log('error');
}else{
  console.log('sucess');
}