'use strict';

exports.listUserScopes = function* (user) {
  var rows = yield this.findAll({
    attributrs: ['name'],
    where: {
      user: user
    }
  });
  return rows.map(function (row) {
    return row.name;
  });
};

exports.listAdminScopes = function* (admin) {
  var rows = yield this.findAll({
    attributrs: ['name'],
    where: {
      admin: admin
    }
  });
  return rows.map(function (row) {
    return row.name;
  });
};

exports.addScopeWithSingleUser = function* (name, user, admin) {
  var row = yield this.find({
    where: {
      user: user,
      name: name
    }
  });
  if (!row) {
    row = yield this.build({
      user: user,
      name: name,
      admin: admin
    }).save();
  }
  return row;
};

exports.addScopeWithMultiUser = function* (name, users, admin) {
  return yield users.map(function (user) {
    return this.addScopeWithSingleUser(name, user, admin);
  }.bind(this));
};

exports.removeScope = function* (name) {
  yield this.destroy({
    where: {
      name: name
    }
  });
};

exports.listAllUsersByScopeName = function* (name) {
  var rows = yield this.findAll({
    where: {
      name: name
    }
  });
  return rows;
};