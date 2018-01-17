var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');
const crypto = require('crypto');
const rajeev = crypto.createECDH('secp256k1');
const tirtha = crypto.createECDH('secp256k1');

rajeev.setPrivateKey('5450b56c1e299ed624fffe5f44160a6a28039f68ba9cdb081b446ff25dc7c765', 'hex');

tirtha.setPrivateKey('b1afa1202dd8fe77c420906f89f362acf06d31733657ed713657f4826b787a9e', 'hex');

var rajeevpubkey = rajeev.getPublicKey();
console.log(JSON.parse(rajeevpubkey.toString()));

var tirthapubkey = tirtha.getPublicKey();
console.log(tirthapubkey);

const rajeev_secret = rajeev.computeSecret(tirtha.getPublicKey());
const tirtha_secret = tirtha.computeSecret(rajeev.getPublicKey());

console.log(rajeev_secret.equals(tirtha_secret));

/*
var message = 'Message from Rajeev to Tirtha';
var encrypted = rajeev.encrypt(message);
 
// encrypted will contain an encrypted buffer only Bob can decrypt 
 
var decrypted = tirtha
  .decrypt(encrypted)
  .toString();
// decrypted will be 'some secret message' 
*/
