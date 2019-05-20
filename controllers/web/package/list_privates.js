'use strict';

var packageService = require('../../../services/package');
var scopeService = require('../../../services/scope');
var config = require('../../../config');

module.exports = function* listPrivates() {
  var tasks = {};
  var allPrivateScopes = yield scopeService.getAllScopes();
  
  for (var i = 0; i < config.scopes.length; i++) {
    var scope = config.scopes[i];
    tasks[scope] = packageService.listPrivateModulesByScope(scope);
  }
  /**
   * add scopes from db
   */
  for(var j = 0; j < allPrivateScopes.length; j++) {
    var dbScope = allPrivateScopes[j].name;
    tasks[dbScope] = packageService.listPrivateModulesByScope(dbScope);
  }
  if (config.privatePackages && config.privatePackages.length > 0) {
    tasks['no scoped'] = packageService.listModules(config.privatePackages);
  }

  var scopes = yield tasks;
  yield this.render('private', {
    title: 'private packages',
    scopes: scopes
  });
};
