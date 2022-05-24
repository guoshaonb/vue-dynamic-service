const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Configclassify = Sequelize.import('../schema/configclassify');

Configclassify.sync({ force: false });

class ConfigclassifyModel {
  /**
   * 创建配置分类
   * @param data 创建配置分类的参数
   * @returns {Promise<void>}
   */
  static async create(data) {
    return await Configclassify.create(data)
  }

  /**
   * 更新配置分类数据
   * @param id 配置分类ID
   * @param data 配置分类更新的属性参数
   */
  static async update(id, data) {
    return await Configclassify.update(data, {
      where: {
        id
      }
    });
  }

  /**
   * 获取配置分类列表
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
    ret = await Configclassify.findAndCountAll({
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
   * 获取配置分类详情数据
   * @param id  配置分类ID
   * @returns {Promise<Model>}
   */
  static async detail(id) {
    return await Configclassify.findOne({
      where: {
        id,
        is_del: 0
      },
      attributes: { exclude: ['is_del'] }
    })
  }

  /**
   * 软删除配置分类（隐藏配置分类）
   * @param id 配置分类ID
   * @param data 配置分类ID
   */
  static async delete(id, data) {
    return await Configclassify.update(data, {
      where: {
        id,
      },
      fields: ['is_del']
    })
  }
}

module.exports = ConfigclassifyModel
