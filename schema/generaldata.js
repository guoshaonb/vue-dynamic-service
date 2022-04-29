const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('generaldata', {
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
    data1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data1',
      defaultValue: 0
    },
    data2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data2',
      defaultValue: 0
    },
    data3: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data3',
      defaultValue: 0
    },
    data4: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data4',
      defaultValue: 0
    },
    data5: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data5',
      defaultValue: 0
    },
    data6: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data6',
      defaultValue: 0
    },
    data7: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data7',
      defaultValue: 0
    },
    data8: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data8',
      defaultValue: 0
    },
    data9: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data9',
      defaultValue: 0
    },
    data10: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data10',
      defaultValue: 0
    },
    data11: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data11',
      defaultValue: 0
    },
    data12: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data12',
      defaultValue: 0
    },
    data13: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data13',
      defaultValue: 0
    },
    data14: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data14',
      defaultValue: 0
    },
    data15: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data15',
      defaultValue: 0
    },
    data16: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data16',
      defaultValue: 0
    },
    data17: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data17',
      defaultValue: 0
    },
    data18: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data18',
      defaultValue: 0
    },
    data19: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data19',
      defaultValue: 0
    },
    data20: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data20',
      defaultValue: 0
    },
    data21: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data21',
      defaultValue: 0
    },
    data22: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data22',
      defaultValue: 0
    },
    data23: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data23',
      defaultValue: 0
    },
    data24: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data24',
      defaultValue: 0
    },
    data25: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data25',
      defaultValue: 0
    },
    data26: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data26',
      defaultValue: 0
    },
    data27: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data27',
      defaultValue: 0
    },
    data28: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data28',
      defaultValue: 0
    },
    data29: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data29',
      defaultValue: 0
    },
    data30: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data30',
      defaultValue: 0
    },
    data31: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data31',
      defaultValue: 0
    },
    data32: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data32',
      defaultValue: 0
    },
    data33: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data33',
      defaultValue: 0
    },
    data34: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data34',
      defaultValue: 0
    },
    data35: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data35',
      defaultValue: 0
    },
    data36: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data36',
      defaultValue: 0
    },
    data37: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data37',
      defaultValue: 0
    },
    data38: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data38',
      defaultValue: 0
    },
    data39: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data39',
      defaultValue: 0
    },
    data40: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data40',
      defaultValue: 0
    },
    data41: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data41',
      defaultValue: 0
    },
    data42: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data42',
      defaultValue: 0
    },
    data43: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data43',
      defaultValue: 0
    },
    data44: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data44',
      defaultValue: 0
    },
    data45: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data45',
      defaultValue: 0
    },
    data46: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data46',
      defaultValue: 0
    },
    data47: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data47',
      defaultValue: 0
    },
    data48: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data48',
      defaultValue: 0
    },
    data49: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data49',
      defaultValue: 0
    },
    data50: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'data50',
      defaultValue: 0
    },
    // 是否软删除
    is_del: {
      type: DataTypes.BOOLEAN,
      field: 'is_del',
      allowNull: false,
      defaultValue: false,
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