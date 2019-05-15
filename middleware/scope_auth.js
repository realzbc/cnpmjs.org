/**
 *scope操作接口需要权限控制
 *web端没有登录态
 *通过secure key
 *by zhangbangcheng
 *date 2019/05/15
*/

'use strict';

var debug = require('debug')('cnpmjs.org:middleware:scope_auth');
var config = require('../config');
var decrypted = require('../lib/triple_des').decrypted;

module.exports = function* (next) {
  var body = this.request.body || {};
  debug('%s %s with %j', this.method, this.url, body);

  if (!body.key) {//not exist
    this.status = 403;
    return this.body = {
      message: 'scope相关操作权限不足, ip: ' + this.ip
    };
  } else {
    var plainText = decrypted(body.key);
    if (plainText !== config.tripleDesKey.key) {
      this.status = 403;
      return this.body = {
        message: 'scope相关操作权限不足, ip: ' + this.ip
      };
    }
    yield next;
  }
};