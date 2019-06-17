'use strict';

var packageService = require('../services/package');

// admin or module's maintainer can modified the module
module.exports = function* editable(next) {
  var username = this.user && this.user.name;
  var moduleName = this.params.name || this.params[0];
  if (username && moduleName) {
    if (this.user.isAdmin) {
      return yield next;
    }
    //detect user admin_scope 
    var scopeName = moduleName.split('/')[0];
    if(this.user.admin_scopes.indexOf(scopeName) >= 0) {
      return yield next;
    }
    var isMaintainer = yield packageService.isMaintainer(moduleName, username);
    if (isMaintainer) {
      return yield next;
    }
  }

  this.status = 403;
  var message = 'not authorized to modify ' + moduleName;
  if (username) {
    message = username + ' ' + message;
  }
  message = '[forbidden] ' + message;
  this.body = {
    error: message,
    reason: message,
  };
};
