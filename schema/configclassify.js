const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('configclassify', {
    // 配置ID
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    // 用户id
    user_id: {
      type: DataTypes.STRING(100),
      field: 'user_id',
      allowNull: false,
      default: 0
    },
    // 菜单id
    menu_id: {
      type: DataTypes.STRING(100),
      field: 'menu_id',
      allowNull: false,
      default: 0
    },
    // 配置
    class1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class1',
      defaultValue: 0
    },
    class2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class2',
      defaultValue: 0
    },
    class3: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class3',
      defaultValue: 0
    },
    class4: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class4',
      defaultValue: 0
    },
    class5: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class5',
      defaultValue: 0
    },
    class6: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class6',
      defaultValue: 0
    },
    class7: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class7',
      defaultValue: 0
    },
    class8: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class8',
      defaultValue: 0
    },
    class9: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class9',
      defaultValue: 0
    },
    class10: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'class10',
      defaultValue: 0
    },
    // 是否软删除
    is_del: {
      type: DataTypes.BOOLEAN,
      field: 'is_del',
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
      }
    }
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 true MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })
}