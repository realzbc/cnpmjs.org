var crypto = require('crypto');
var utility = require('utility');
var models = require('../models');
var common = require('./common');
var config = require('../config');
var getUserInfoByEmail = require('../lib/common').getUserInfoByEmail;

var User = models.User;
var Scope = models.Scope;

exports.getScopeByName = function* (name) {
  var list = yield Scope.listAllUsersByScopeName(name);

  if (!list || list.length === 0) {
    return null;
  }

  return list;
};

exports.saveScope = function* (name, admin, users) {
  //ensure admin in user table
  var adminObj = yield exports.ensureUserExist(admin);
  var userList = yield users.map(function (userEmail) {
    return this.ensureUserExist(userEmail);
  }.bind(this));

  var userNameList = userList.map(function(user){
    return user.name;
  });
  yield Scope.removeScope(name);
  
  yield Scope.addScopeWithMultiUser(name, userNameList, adminObj.name);

  return yield Scope.listAllUsersByScopeName(name);
};

exports.ensureUserExist = function* (email) {
  var info = getUserInfoByEmail(email);

  var userGetted = yield User.findByName(info.name);

  if (!userGetted) {
    var salt = crypto.randomBytes(30).toString('hex');
    yield User.add({
      name: info.name,
      email: info.email,
      salt: salt,
      password_sha: utility.sha1('0' + salt),
      ip: '0',
      isNpmUser: false
    });
    return yield User.findByName(info.name);
  }
  return userGetted;
};

exports.deleteScope = function* (name) {
  yield Scope.removeScope(name);
};

exports.getAllScopes = function* () {
  var sql = 'SELECT DISTINCT(name) FROM scope';
  return yield models.query(sql);
};