var ECIES = require('bitcore-ecies');
var bitcore = require('bitcore-lib');
var PrivateKey = bitcore.PrivateKey;

var rajeevKey = '5450b56c1e299ed624fffe5f44160a6a28039f68ba9cdb081b446ff25dc7c765';
var tirthaKey = 'b1afa1202dd8fe77c420906f89f362acf06d31733657ed713657f4826b787a9e';

var tirthaPublicKey = new bitcode.PublicKey('7d002e17d81e8f8d263b72c852e1c206940ef6ec')
var rajeevPublicKey = new bitcode.PublicKey('e092bc53ac92067ad133da39f11776563aac632f')
//var encryptedForBob = bobPublicKey.encrypt(message);

var rajeev= ECIES()
  .privateKey(rajeevKey)
  .publicKey(tirthaPublicKey);

var message = 'Message from Rajeev to Tirtha';
var encrypted = rajeev.encrypt(message);

// encrypted will contain an encrypted buffer only Bob can decrypt

var tirtha = ECIES()
  .privateKey(tirthaKey)
  .publicKey(rajeevPublicKey);
var decrypted = tirtha
  .decrypt(encrypted)
  .toString();
// decrypted will be 'some secret message'