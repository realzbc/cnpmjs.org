/**
 * use crypto-js lib
 * added by zhangbangcheng
 * date 2019/05/15
 */

var CryptoJS = require("crypto-js");

var config = require('../config');

/*
  tripleDesKey: {
    keyText: 'biznpm@biztech$#365#$',
    ivText: '01234567',
    key: 'cnpm-scope-auth'
  }
 */
var key = CryptoJS.enc.Utf8.parse(config.tripleDesKey.keyText),
  iv = CryptoJS.enc.Utf8.parse(config.tripleDesKey.ivText);


exports.encrypted = function (str) {
  return CryptoJS.TripleDES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

exports.decrypted = function (encrypted) {
  var decrypted = CryptoJS.TripleDES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};