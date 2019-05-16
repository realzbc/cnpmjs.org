var debug = require('debug')('cnpmjs.org:middleware:scope_controller');
var config = require('../../../config');
var scopeService = require('../../../services/scope');
var common = require('../../../lib/common');

exports.scopeCheck = function* (next) {
  var body = this.request.body || {};
  debug('%s %s with %j', this.method, this.url, body);
  var name = body.name;
  if (!name) {
    this.status = 404;
    return this.body = {
      message: 'scope name is null, ip: ' + this.ip
    };
  }

  if (common.isPrivateScopedPackage(name)) {
    this.status = 403;
    return this.body = {
      message: '与全局scopes列表冲突, ip: ' + this.ip
    };
  }

  var res = yield scopeService.getScopeByName(name);

  if (res) {
    this.status = 403;
    return this.body = {
      message: name + ' 已被占用，试试别的名字吧'
    };
  }
  this.body = {
    message: 'success',
    name: name
  };
};

exports.saveScope = function* (next) {
  var body = this.request.body || {};
  var name = body.name,
    admin = body.admin,
    users = body.users;
  if (!name) {
    this.status = 404;
    return this.body = {
      message: 'scope name is null, ip: ' + this.ip
    };
  }
  if (!admin) {
    this.status = 404;
    return this.body = {
      message: 'admin is null, ip: ' + this.ip
    };
  }
  if (!users) {
    this.status = 404;
    return this.body = {
      message: 'users is null, ip: ' + this.ip
    };
  }
  var res = yield scopeService.saveScope(name, admin, users.split(','));

  this.body = {
    message: 'success',
    res: res
  };
};

exports.get = function* (next) {
  var body = this.request.body || {};
  var name = body.name;

  if (!name) {
    this.status = 404;
    return this.body = {
      message: 'scope name is null, ip: ' + this.ip
    };
  }

  var res = yield scopeService.getScopeByName(name);

  this.body = {
    message: 'success',
    res: res
  };
};

exports.del = function* (next) {
  var body = this.request.body || {};
  var name = body.name;
  if (!name) {
    this.status = 404;
    return this.body = {
      message: 'scope name is null, ip: ' + this.ip
    };
  }
  var res = yield scopeService.getScopeByName(name);
  if (res) {
    yield scopeService.deleteScope(name);
    this.body = {
      message: 'success'
    }
  } else {
    this.status = 404;
    this.body = {
      message: 'scope not exist, ip: ' + this.ip
    };
  }
};