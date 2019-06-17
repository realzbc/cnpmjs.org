'use strict';

module.exports = function *unpublishable(next) {
  //
  var name = this.params.name || this.params[0];
  if(!(this.user.isAdmin || this.user.admin_scopes.indexOf(name.split('/')[0]) >= 0)) {
    this.status = 403;
    const error = '[no_perms] Only administrators can unpublish module';
    this.body = {
      error,
      reason: error,
    };
    return;
  }

  yield next;
};
