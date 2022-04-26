const db = require('../config/db');
const Sequelize = db.sequelize;
const Catalogue = Sequelize.import('../schema/catalogue');
const Menu = Sequelize.import('../schema/menu');

Catalogue.sync({ force: false });

class CatalogueModel {
    /**
     * 创建目录
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data) {
        return await Catalogue.create(data)
    }

    /**
     * 更新目录数据
     * @param id  目录ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async update(id, data) {
        await Catalogue.update(data, {
            where: {
                id
            },
            fields: ['name', 'parent_id', 'icon', 'z_index', 'is_del']
        });
        return true
    }

    /**
     * 获取目录列表
     * @returns {Promise<*>}
     */
    static async list(params) {
        let ret = null;
        let exclude = ['is_del']
        let { page = 1, include, name } = params;

        ret = await Catalogue.findAndCountAll({
            limit: 10,//每页10条
            offset: (page - 1) * 10,
            where: {
                is_del: 0
            },
            'order': [
                ['id']
            ],
            attributes: { exclude: exclude }
        });

        let data = null

        if (include === 'tree') {
            // 获取完目录数据后，进行树结构遍历
            data = CatalogueModel.catalogueTree(
                ret.rows
            );
            data = data.filter(item => name ? item.name == name : true)
        } else {
            data = ret.rows
        }

        return {
            code: 200,
            data,
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
     * 目录列表创建树结构
     * @param list 目录列表
     * @returns {*}
     */
    static catalogueTree(list) {
        // 对源数据深度克隆
        let cloneData = JSON.parse(JSON.stringify(list))
        //循环所有项
        let tree = cloneData.filter(father => {
            let branchArr = cloneData.filter(child => {
                //返回每一项的子级数组
                return father.id == child.parent_id
            });

            if (branchArr.length > 0) {
                //如果存在子级，则给父级添加一个children属性，并赋值
                father.children = branchArr;
            }
            //返回第一层
            return father.parent_id == 0;
        });
        //返回树形数据
        return tree
    }

    // 查询ID目录下的所有菜单
    static async menu(id) {
        return await Catalogue.findAll({
            where: {
                id,
            },
            include: [{
                model: Menu
            }]
        })
    }

    /**
     * 获取目录详情数据
     * @param id  页面ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await Catalogue.findOne({
            where: {
                id,
                is_del: 0
            },
            attributes: { exclude: ['is_del'] }
        })
    }

    /**
    * 软删除目录（隐藏数据）
    * @param id 目录D
    * @param data 目录参数
    */
    static async hidden(id, data) {
        return await Catalogue.update(data, {
            where: {
                id,
            },
            fields: ['is_del']
        })
    }

}

module.exports = CatalogueModel
