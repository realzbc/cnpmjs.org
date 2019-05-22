'use strict';

var config = require('../config');
var isPrivateScopedPackage = require('../lib/common').isPrivateScopedPackage;

config.privatePackages = config.privatePackages || [];

exports.isPrivatePackage = function* (name) {
  var isPrivate = yield isPrivateScopedPackage(name);
  if (isPrivate) {
    return true;
  }
  if (config.privatePackages.indexOf(name) >= 0) {
    return true;
  }
  return false;
};
