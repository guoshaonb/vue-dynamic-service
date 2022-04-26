const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Menu = Sequelize.import('../schema/menu');
const Catalogue = Sequelize.import('../schema/catalogue');

Catalogue.hasMany(Menu); // 将会添加 catalogue_id 到 MenuModel 模型
Menu.belongsTo(Catalogue, { foreignKey: 'catalogueId' });

Menu.sync({ force: false });

class MenuModel {
    /**
     * 创建菜单
     * @param data 创建菜单的参数
     * @returns {Promise<void>}
     */
    static async create(data) {
        return await Menu.create(data)
    }

    /**
     * 更新菜单数据
     * @param id 菜单ID
     * @param data 菜单更新的属性参数
     */
    static async update(id, data) {
        return await Menu.update(data, {
            where: {
                id
            },
            fields: ['name', 'catalogueId', 'is_del']
        });
    }

    /**
     * 获取菜单列表
     * @returns {Promise<*>}
     */
    static async list(params) {
        let ret = null;
        let exclude = ['is_del']
        let { page = 1, catalogueId, name } = params;

        if (catalogueId) {
            ret = await Menu.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    catalogueId: catalogueId,
                    is_del: 0
                },
                include: [{
                    model: Catalogue,
                    where: { catalogueId: Sequelize.col('menu.catalogueId') }
                }],
                'order': [
                    ['id']
                ],
                attributes: { exclude: exclude }
            });
        } else if (name) {
            ret = await Menu.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    name,
                    is_del: 0
                },
                include: [{
                    model: Catalogue,
                    where: { catalogueId: Sequelize.col('menu.catalogueId') }
                }],
                'order': [
                    ['id']
                ],
                attributes: { exclude: exclude }
            });
        } else {
            ret = await Menu.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                'order': [
                    ['id']
                ],
                where: {
                    is_del: 0
                },
                include: [{
                    model: Catalogue,
                    where: { catalogueId: Sequelize.col('menu.catalogueId') }
                }],
                attributes: { exclude: exclude }

            });
        }

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
     * 获取菜单详情数据
     * @param id  菜单ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await Menu.findOne({
            where: {
                id,
                is_del: 0
            },
            include: [{
                model: Catalogue,
                where: { catalogueId: Sequelize.col('menu.catalogueId') }
            }],
            attributes: { exclude: ['is_del'] }
        })
    }

    /**
     * 软删除菜单（隐藏菜单）
     * @param id 菜单ID
     * @param data 菜单ID
     */
    static async hidden(id, data) {
        return await Menu.update(data, {
            where: {
                id,
            },
            fields: ['is_del']
        })
    }
}

module.exports = MenuModel
