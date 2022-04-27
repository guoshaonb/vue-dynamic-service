const db = require('../config/db');
const Sequelize = db.sequelize;
const Menu = Sequelize.import('../schema/menu');

Menu.sync({ force: false });

class MenuModel {
    /**
     * 创建菜单
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data) {
        return await Menu.create(data)
    }

    /**
     * 更新菜单数据
     * @param id  菜单ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async update(id, data) {
        await Menu.update(data, {
            where: {
                id
            },
            fields: ['name', 'type', 'parent_id', 'icon', 'z_index', 'is_del']
        });
        return true
    }

    /**
     * 获取菜单列表
     * @returns {Promise<*>}
     */
    static async list(params) {
        let ret = null;
        let exclude = ['is_del']
        let { page = 1, include, name } = params;

        ret = await Menu.findAndCountAll({
            limit: 10,//每页10条
            offset: (page - 1) * 10,
            where: {
                is_del: 0
            },
            'order': [
                ['z_index']
            ],
            attributes: { exclude: exclude }
        });

        let data = null

        if (include === 'tree') {
            // 获取完菜单数据后，进行树结构遍历
            data = MenuModel.MenuTree(
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
     * 菜单列表创建树结构
     * @param list 菜单列表
     * @returns {*}
     */
    static MenuTree(list) {
        // 根据对象的属性进行排序
        function sortBy(field) {
            //根据传过来的字段进行排序
            return (x, y) => {
                return x[field] - y[field]
            }
        }

        // 对源数据深度克隆
        let cloneData = JSON.parse(JSON.stringify(list))
        //循环所有项
        let tree = cloneData.filter(father => {
            let branchArr = cloneData.filter(child => {
                //返回每一项的子级数组
                return father.id == child.parent_id
            });
            branchArr = branchArr.sort(sortBy('z_index'))
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

    /**
     * 获取菜单详情数据
     * @param id  页面ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await Menu.findOne({
            where: {
                id,
                is_del: 0
            },
            attributes: { exclude: ['is_del'] }
        })
    }

    /**
     * 获取菜单子级数据
     * @param id  菜单ID
     * @returns {Promise<Model>}
     */
    static async menu(id) {
        return await Menu.findOne({
            where: {
                parent_id: id,
                is_del: 0
            },
            attributes: { exclude: ['is_del'] }
        })
    }

    /**
    * 软删除菜单（隐藏数据）
    * @param id 菜单D
    * @param data 菜单参数
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
