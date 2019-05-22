'use strict';

const packageService = require('../../../services/package');
const scopeService = require('../../../services/scope');
const config = require('../../../config');

// GET /-/short
// List public all packages names only
module.exports = function* () {
  if (this.query.private_only) {
    var allPrivateScopes = yield scopeService.getAllScopes();
    const tasks = [];
    for (let i = 0; i < config.scopes.length; i++) {
      const scope = config.scopes[i];
      tasks.push(packageService.listPrivateModulesByScope(scope));
    }

    for(var j = 0; j < allPrivateScopes.length; j++) {
      var dbScope = allPrivateScopes[j].name;
      tasks.push(packageService.listPrivateModulesByScope(dbScope));
    }

    if (config.privatePackages && config.privatePackages.length > 0) {
      tasks.push(packageService.listModules(config.privatePackages));
    }

    const results = yield tasks;
    const names = [];
    for (const rows of results) {
      for (const row of rows) {
        names.push(row.name);
      }
    }
    this.body = names;
    return;
  }

  this.body = yield packageService.listAllPublicModuleNames();
};
