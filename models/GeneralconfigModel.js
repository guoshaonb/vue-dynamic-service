const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Generalconfig = Sequelize.import('../schema/generalconfig');

Generalconfig.sync({ force: false });

class GeneralconfigModel {
    /**
     * 创建配置
     * @param data 创建配置的参数
     * @returns {Promise<void>}
     */
    static async create(data) {
        return await Generalconfig.create(data)
    }

    /**
     * 更新配置数据
     * @param id 配置ID
     * @param data 配置更新的属性参数
     */
    static async update(id, data) {
        return await Generalconfig.update(data, {
            where: {
                id
            }
        });
    }

    /**
     * 获取配置列表
     * @returns {Promise<*>}
     */
    static async list(params) {
        let ret = null;
        let exclude = ['is_del']
        let { page = 1, menu_id } = params;

        // 处理查询字段
        const getSelectWhere = () => {
            const whereObj = { is_del: 0 }
            const boforeWhere = {
                menu_id,
            }
            Object.keys(boforeWhere).forEach(item => {
                if (boforeWhere[item]) {
                    whereObj[item] = boforeWhere[item]
                }
            })
            return whereObj
        }

        const where = getSelectWhere()
        ret = await Generalconfig.findAndCountAll({
            limit: 10,//每页10条
            offset: (page - 1) * 10,
            'order': [
                ['id']
            ],
            where,
            attributes: { exclude: exclude }
        });

        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 10),
            }
        }
    }

    /**
     * 获取配置详情数据
     * @param id  配置ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await Generalconfig.findOne({
            where: {
                id,
                is_del: 0
            },
            attributes: { exclude: ['is_del'] }
        })
    }

    /**
     * 软删除配置（隐藏配置）
     * @param id 配置ID
     * @param data 配置ID
     */
    static async hidden(id, data) {
        return await Generalconfig.update(data, {
            where: {
                id,
            },
            fields: ['is_del']
        })
    }
}

module.exports = GeneralconfigModel
