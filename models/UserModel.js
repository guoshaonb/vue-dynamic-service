const db = require('../config/db')
const Sequelize = db.sequelize
const Op = Sequelize.Op
const User = Sequelize.import('../schema/user.js')

User.sync({ force: false });

class UserModel {
  /**
   * 创建用户
   * @param user
   * @returns {Promise<boolean>}
   */
  static async create(user) {
    let { username, password, email, roles_id } = user;

    await User.create({
      username,
      password,
      email,
      roles_id
    })
    return true
  }

  /**
   * 更新用户数据
   * @param id  用户ID
   * @param data  用户的状态
   * @returns {Promise.<boolean>}
   */
  static async update(id, data) {
    await User.update(data, {
      where: {
        id
      },
      fields: ['email']
    });
    return true
  }

  /**
   * 修改用户密码
   * @param username  用户名
   * @returns {Promise.<boolean>}
   */
  static async updpass(username, data) {
    await User.update(data, {
      where: {
        username: {
          // 模糊查询
          [Op.like]: '%' + username
        },
      },
      fields: ['password']
    });
    return true
  }

  /**
   * 查询用户列表
   * @returns {Promise<*>}
   */
  static async list(params) {
    let ret = null;
    let exclude = ['is_del']
    let { page = 1, username } = params;

    // 处理查询字段
    const getSelectWhere = () => {
      const whereObj = { is_del: 0 }
      const boforeWhere = {
        username
      }
      Object.keys(boforeWhere).forEach(item => {
        if (boforeWhere[item]) {
          whereObj[item] = boforeWhere[item]
        }
      })
      return whereObj
    }

    const where = getSelectWhere()
    ret = await User.findAndCountAll({
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
   * 查询用户信息
   * @param username  姓名
   * @returns {Promise.<*>}
   */
  static async username(username) {
    return await User.findOne({
      where: {
        username
      }
    })
  }

  /**
   * 获取用户详情数据
   * @param id  用户ID
   * @returns {Promise<Model>}
   */
  static async detail(id) {
    return await User.findOne({
      where: {
        id,
        is_del: 0
      },
      attributes: { exclude: ['is_del'] }
    })
  }

  /**
  * 软删除用户（隐藏菜单）
  * @param id 用户ID
  * @param data 用户参数
  */
  static async hidden(id, data) {
    return await User.update(data, {
      where: {
        id,
      },
      fields: ['is_del']
    })
  }
}

module.exports = UserModel
