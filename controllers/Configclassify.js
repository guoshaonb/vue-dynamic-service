const ConfigclassifyModel = require('../models/ConfigclassifyModel')
const Common = require("../utils/common");

class Configclassify {

  /**
   * 获取配置分类列表
   * @param ctx
   *
   * @returns 配置分类列表数据
   */
  static async list(ctx) {
    let params = ctx.query;
    try {
      const data = await ConfigclassifyModel.list(params);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询配置分类列表成功`,
        data
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询配置分类列表失败`,
        data: err
      }
    }
  }

  /**
   * 查询配置分类详情
   * @param ctx id  配置分类ID
   *
   * @returns 配置分类的详情
   */
  static async detail(ctx) {
    // 配置分类ID
    let { id } = ctx.params;

    if (!Common.isIncludeId(ctx, id)) {
      return false;
    }

    try {

      let data = await ConfigclassifyModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询配置分类成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询配置分类失败`,
        data: err
      }
    }

  }

  /**
   * 创建配置分类
   * @param ctx user_id          用户id
   * @param ctx menu_id        菜单id
   * @param ctx class1 ~ class50       通用配置分类
   * @returns  成功创建配置分类返回配置分类详情数据，失败返回错误信息
   */
  static async create(ctx) {
    // 接收参数
    let {
      user_id, menu_id,
      class1, class2, class3, class4, class5, class6, class7, class8, class9, class10
    } = ctx.request.body;
    let params = {
      user_id, menu_id,
      class1, class2, class3, class4, class5, class6, class7, class8, class9, class10
    }
    if (!Common.isParamsFormat(ctx, params)) {
      return false;
    }

    try {

      // 创建配置分类
      const { id } = await ConfigclassifyModel.create(params);
      // 查询配置分类
      const data = await ConfigclassifyModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `创建配置分类成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `创建配置分类失败`,
        data: err
      }
    }

  }

  /**
  * 更新配置分类
  * @param ctx id               配置分类id
  * @param ctx user_id          用户id
  * @param ctx menu_id        菜单id
  * @param ctx class1 ~ class50       通用配置分类
  * @returns  成功创建配置分类返回配置分类详情数据，失败返回错误信息
  */
  static async update(ctx) {
    // 接收参数
    let { id } = ctx.params;
    let {
      user_id, menu_id,
      class1, class2, class3, class4, class5, class6, class7, class8, class9, class10
    } = ctx.request.body;
    let params = {
      user_id, menu_id,
      class1, class2, class3, class4, class5, class6, class7, class8, class9, class10
    }

    if (!Common.isIncludeId(ctx, id)) {
      return false;
    }

    if (!Common.isParamsFormat(ctx, {
      user_id, menu_id
    })) {
      return false;
    }

    try {
      await ConfigclassifyModel.update(id, params);
      let data = await ConfigclassifyModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `更新配置分类成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `更新配置分类失败`,
        data: err
      }
    }
  }

  /**
   * 软删除配置分类数据（隐藏数据）
   * @param ctx id 配置分类ID
   * @param ctx is_del 是否软删除
   * @returns {Promise<boolean>}
   */
  static async delete(ctx) {
    let { id } = ctx.params;
    let { is_del } = ctx.query;

    if (!Common.isIncludeId(ctx, id)) {
      return false;
    }

    try {
      await ConfigclassifyModel.delete(id, { is_del });

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `删除配置分类成功`
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `删除配置分类失败`,
        data: err
      }
    }

  }

}

module.exports = Configclassify
