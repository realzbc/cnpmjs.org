'use strict';

var config = require('../config');
var common = require('../lib/common');

config.privatePackages = config.privatePackages || [];

exports.isPrivatePackage = function* (name) {
  var isPrivate = yield common.isPrivateScopedPackage(name);
  if (isPrivate) {
    return true;
  }
  if (config.privatePackages.indexOf(name) >= 0) {
    return true;
  }
  return false;
};
