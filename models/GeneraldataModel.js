const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Generaldata = Sequelize.import('../schema/generaldata');
const Generalconfig = Sequelize.import('../schema/generalconfig');

Generaldata.sync({ force: false });

class GeneraldataModel {
  /**
   * 创建数据
   * @param data 创建数据的参数
   * @returns {Promise<void>}
   */
  static async create(data) {
    return await Generaldata.create(data)
  }

  /**
   * 更新数据数据
   * @param id 数据ID
   * @param data 数据更新的属性参数
   */
  static async update(id, data) {
    return await Generaldata.update(data, {
      where: {
        id
      }
    });
  }

  /**
   * 获取数据列表
   * @returns {Promise<*>}
   */
  static async list(params) {
    let ret = null;
    let exclude = ['is_del']
    let { page = 1, menu_id, selectField, inputValue } = params;

    // 处理查询字段
    const getSelectWhere = () => {
      const whereObj = { is_del: 0 }
      const boforeWhere = {
        menu_id
      }
      Object.keys(boforeWhere).forEach(item => {
        if (boforeWhere[item]) {
          whereObj[item] = boforeWhere[item]
        }
      })

      return whereObj
    }

    const where = getSelectWhere()
    if (selectField) {
      where[selectField] = {
        [Op.like]: inputValue ? ('%' + inputValue + '%') : ''
      }
    }
    ret = await Generaldata.findAndCountAll({
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
   * 获取真实数据
   * @returns {Promise<*>}
   */
  static async real(params) {
    let ret = null;
    let exclude = ['is_del']
    let { page = 1, menu_id } = params;

    // 处理查询字段
    const getSelectWhere = () => {
      const whereObj = { is_del: 0 }
      const boforeWhere = {
        menu_id
      }
      Object.keys(boforeWhere).forEach(item => {
        if (boforeWhere[item]) {
          whereObj[item] = boforeWhere[item]
        }
      })

      return whereObj
    }

    const where = getSelectWhere()

    ret = await Generaldata.findAndCountAll({
      limit: 10,//每页10条
      offset: (page - 1) * 10,
      'order': [
        ['id']
      ],
      where,
      attributes: { exclude: exclude }
    });

    //获取配置选项
    let fields = []
    const configList = await GeneraldataModel.configlist(params)
    const data = configList?.data?.[0]?.dataValues
    Object.keys(data).forEach(item => {
      if (item.includes('c_')) {
        const field = data[item]?.split('`')?.[0]?.split(';')?.[0]?.split(',')?.[1]
        fields[`${item.replace('c_', 'data')}`] = field
      }
    })

    for (const item of ret.rows) {
      Object.keys(item).forEach(key => {
        if (key.includes('data')) {
          Object.keys(item[key]).forEach(ite => {
            if (item[key][ite] == '0') {
              delete item[key][ite]
            }
            if (fields.hasOwnProperty(ite)) {
              item[key][fields[ite]] = item[key][ite]
              delete item[key][ite]
            }
          })

        }
      })
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
   * 获取配置列表
   * @returns {Promise<*>}
   */
  static async configlist(params) {
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
   * 获取数据详情数据
   * @param id  数据ID
   * @returns {Promise<Model>}
   */
  static async detail(id) {
    return await Generaldata.findOne({
      where: {
        id,
        is_del: 0
      },
      attributes: { exclude: ['is_del'] }
    })
  }

  /**
   * 软删除数据（隐藏数据）
   * @param id 数据ID
   * @param data 数据ID
   */
  static async hidden(id, data) {
    return await Generaldata.update(data, {
      where: {
        id,
      },
      fields: ['is_del']
    })
  }

  /**
   * 批量软删除数据（隐藏数据）
   * @param id 数据ID
   * @param data 数据ID
   */
  static async hiddens(ids, data) {
    return await Generaldata.update(data, {
      where: {
        id: {
          [Op.in]: ids
        }
      },
      fields: ['is_del']
    })
  }
}

module.exports = GeneraldataModel
