const GeneralconfigModel = require('../models/GeneralconfigModel')
const Common = require("../utils/common");
const Request = require("../utils/request");
const Translation = require("../utils/translation");

class Generalconfig {

  /**
   * 获取配置列表
   * @param ctx
   *
   * @returns 配置列表数据
   */
  static async list(ctx) {
    let params = ctx.query;
    try {
      const data = await GeneralconfigModel.list(params);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询配置列表成功`,
        data
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询配置列表失败`,
        data: err
      }
    }
  }

  /**
   * 查询配置详情
   * @param ctx id  配置ID
   *
   * @returns 配置的详情
   */
  static async detail(ctx) {
    // 配置ID
    let { id } = ctx.params;

    if (!Common.isIncludeId(ctx, id)) {
      return false;
    }

    try {

      let data = await GeneralconfigModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询配置成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询配置失败`,
        data: err
      }
    }

  }

  /**
   * 创建配置
   * @param ctx user_id          用户id
   * @param ctx menu_id        菜单id
   * @param ctx c_1 ~ c_50       通用配置
   * @returns  成功创建配置返回配置详情数据，失败返回错误信息
   */
  static async create(ctx) {
    // 接收参数
    let {
      user_id, menu_id,
      c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8, c_9, c_10,
      c_11, c_12, c_13, c_14, c_15, c_16, c_17, c_18, c_19, c_20,
      c_21, c_22, c_23, c_24, c_25, c_26, c_27, c_28, c_29, c_30,
      c_31, c_32, c_33, c_34, c_35, c_36, c_37, c_38, c_39, c_40,
      c_41, c_42, c_43, c_44, c_45, c_46, c_47, c_48, c_49, c_50
    } = ctx.request.body;
    let params = {
      user_id, menu_id,
      c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8, c_9, c_10,
      c_11, c_12, c_13, c_14, c_15, c_16, c_17, c_18, c_19, c_20,
      c_21, c_22, c_23, c_24, c_25, c_26, c_27, c_28, c_29, c_30,
      c_31, c_32, c_33, c_34, c_35, c_36, c_37, c_38, c_39, c_40,
      c_41, c_42, c_43, c_44, c_45, c_46, c_47, c_48, c_49, c_50
    }
    if (!Common.isParamsFormat(ctx, params)) {
      return false;
    }

    try {

      // 创建配置
      const { id } = await GeneralconfigModel.create(params);
      // 查询配置
      const data = await GeneralconfigModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `创建配置成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `创建配置失败`,
        data: err
      }
    }

  }

  /**
  * 更新配置
  * @param ctx id               配置id
  * @param ctx user_id          用户id
  * @param ctx menu_id        菜单id
  * @param ctx c_1 ~ c_50       通用配置
  * @returns  成功创建配置返回配置详情数据，失败返回错误信息
  */
  static async update(ctx) {
    // 接收参数
    let { id } = ctx.params;
    let {
      user_id, menu_id,
      c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8, c_9, c_10,
      c_11, c_12, c_13, c_14, c_15, c_16, c_17, c_18, c_19, c_20,
      c_21, c_22, c_23, c_24, c_25, c_26, c_27, c_28, c_29, c_30,
      c_31, c_32, c_33, c_34, c_35, c_36, c_37, c_38, c_39, c_40,
      c_41, c_42, c_43, c_44, c_45, c_46, c_47, c_48, c_49, c_50
    } = ctx.request.body;
    let params = {
      user_id, menu_id,
      c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8, c_9, c_10,
      c_11, c_12, c_13, c_14, c_15, c_16, c_17, c_18, c_19, c_20,
      c_21, c_22, c_23, c_24, c_25, c_26, c_27, c_28, c_29, c_30,
      c_31, c_32, c_33, c_34, c_35, c_36, c_37, c_38, c_39, c_40,
      c_41, c_42, c_43, c_44, c_45, c_46, c_47, c_48, c_49, c_50
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
      await GeneralconfigModel.update(id, params);
      let data = await GeneralconfigModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `更新配置成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `更新配置失败`,
        data: err
      }
    }
  }

  /**
   * 软删除配置数据（隐藏数据）
   * @param ctx id 配置ID
   * @param ctx is_del 是否软删除
   * @returns {Promise<boolean>}
   */
  static async hidden(ctx) {
    let { id } = ctx.params;
    let { is_del } = ctx.query;

    if (!Common.isIncludeId(ctx, id)) {
      return false;
    }

    try {
      await GeneralconfigModel.hidden(id, { is_del });

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `删除配置成功`
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `删除配置失败`,
        data: err
      }
    }

  }


  /**
   * 根据内容翻译
   * @param ctx
   *
   * @returns 返回翻译的数据
   */
  static async translate(ctx) {

    // 把单词转换为字段,如：i love you -->> iLoveYou
    const strTransition = (str) => {
      let s = str
      let a = s.split(" ");
      let o = a[0]?.toString()?.toLowerCase();
      for (let i = 1; i < a.length; i++) {
        o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
      }
      return o
    }

    let params = ctx.query;
    if (!params.q) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        message: `缺少查询参数`
      }
    }
    try {
      let result = await Translation.translate(params.q)
      let data = result ? strTransition(result) : null
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `翻译成功`,
        data
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `翻译失败`,
        data: err
      }
    }
  }

}

module.exports = Generalconfig
