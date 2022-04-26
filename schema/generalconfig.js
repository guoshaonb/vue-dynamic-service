const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('generalconfig', {
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
        c_1: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_1',
            defaultValue: 0
        },
        c_2: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_2',
            defaultValue: 0
        },
        c_3: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_3',
            defaultValue: 0
        },
        c_4: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_4',
            defaultValue: 0
        },
        c_5: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_5',
            defaultValue: 0
        },
        c_6: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_6',
            defaultValue: 0
        },
        c_7: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_7',
            defaultValue: 0
        },
        c_8: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_8',
            defaultValue: 0
        },
        c_9: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_9',
            defaultValue: 0
        },
        c_10: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_10',
            defaultValue: 0
        },
        c_11: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_11',
            defaultValue: 0
        },
        c_12: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_12',
            defaultValue: 0
        },
        c_13: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_13',
            defaultValue: 0
        },
        c_14: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_14',
            defaultValue: 0
        },
        c_15: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_15',
            defaultValue: 0
        },
        c_16: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_16',
            defaultValue: 0
        },
        c_17: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_17',
            defaultValue: 0
        },
        c_18: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_18',
            defaultValue: 0
        },
        c_19: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_19',
            defaultValue: 0
        },
        c_20: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_20',
            defaultValue: 0
        },
        c_21: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_21',
            defaultValue: 0
        },
        c_22: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_22',
            defaultValue: 0
        },
        c_23: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_23',
            defaultValue: 0
        },
        c_24: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_24',
            defaultValue: 0
        },
        c_25: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_25',
            defaultValue: 0
        },
        c_26: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_26',
            defaultValue: 0
        },
        c_27: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_27',
            defaultValue: 0
        },
        c_28: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_28',
            defaultValue: 0
        },
        c_29: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_29',
            defaultValue: 0
        },
        c_30: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_30',
            defaultValue: 0
        },
        c_31: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_31',
            defaultValue: 0
        },
        c_32: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_32',
            defaultValue: 0
        },
        c_33: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_33',
            defaultValue: 0
        },
        c_34: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_34',
            defaultValue: 0
        },
        c_35: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_35',
            defaultValue: 0
        },
        c_36: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_36',
            defaultValue: 0
        },
        c_37: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_37',
            defaultValue: 0
        },
        c_38: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_38',
            defaultValue: 0
        },
        c_39: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_39',
            defaultValue: 0
        },
        c_40: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_40',
            defaultValue: 0
        },
        c_41: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_41',
            defaultValue: 0
        },
        c_42: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_42',
            defaultValue: 0
        },
        c_43: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_43',
            defaultValue: 0
        },
        c_44: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_44',
            defaultValue: 0
        },
        c_45: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_45',
            defaultValue: 0
        },
        c_46: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_46',
            defaultValue: 0
        },
        c_47: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_47',
            defaultValue: 0
        },
        c_48: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_48',
            defaultValue: 0
        },
        c_49: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_49',
            defaultValue: 0
        },
        c_50: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'c_50',
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