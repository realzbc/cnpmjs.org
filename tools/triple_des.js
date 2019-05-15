var config = require('../config');
var decrypted = require('../lib/triple_des').decrypted;
var encrypted = require('../lib/triple_des').encrypted;

console.log('加密后数据:' + encrypted(config.tripleDesKey.key));

console.log('解密后数据:' + decrypted('iSqgTo4EKJ4TP/xLXcq/aQ=='));