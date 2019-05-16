/**
 * scope
 * added by zhangbangcheng
 * date 2019/5/15
 */
'use strict';

/**
 * Module dependencies.
 */

/**
 CREATE TABLE IF NOT EXISTS `scope` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
`gmt_create` datetime NOT NULL COMMENT 'create time',
`name` varchar(214) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'scope name',
`admin` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'scope admin',
`user` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'username',
`description` longtext COMMENT 'scope description',
PRIMARY KEY (`id`),
UNIQUE KEY `uk_scope_name_user` (`name`,`user`),
KEY `idx_name` (`name`),
KEY `idx_user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='scope';
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Scope', {
    name: {
      type: DataTypes.STRING(214),
      allowNull: false,
      comment: 'scope name',
    },
    admin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'scope admin',
    },
    user: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'username',
    }
  }, {
      tableName: 'scope',
      comment: 'scope',
      indexes: [
        {
          unique: true,
          fields: ['name', 'user'],
        },
        {
          fields: ['name'],
        },
        {
          fields: ['user'],
        }],
      classMethods: require('./_scope_class_methods'),
    });
};
