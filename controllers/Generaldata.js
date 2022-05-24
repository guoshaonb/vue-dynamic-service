const GeneraldataModel = require('../models/GeneraldataModel')
const Common = require("../utils/common");

class Generaldata {

  /**
   * 获取数据列表
   * @param ctx
   *
   * @returns 数据列表数据
   */
  static async list(ctx) {
    let params = ctx.query;
    try {
      const data = await GeneraldataModel.list(params);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询数据列表成功`,
        data
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询数据列表失败`,
        data: err
      }
    }
  }

  /**
   * 获取真实数据
   * @param ctx
   *
   * @returns 数据列表数据
   */
  static async real(ctx) {
    let params = ctx.query;
    try {
      const data = await GeneraldataModel.real(params);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询数据列表成功`,
        data
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询数据列表失败`,
        data: err
      }
    }
  }

  /**
   * 查询数据详情
   * @param ctx id  数据ID
   *
   * @returns 数据的详情
   */
  static async detail(ctx) {
    // 数据ID
    let { id } = ctx.params;

    if (!Common.isIncludeId(ctx, id)) {
      return false;
    }

    try {

      let data = await GeneraldataModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `查询数据成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `查询数据失败`,
        data: err
      }
    }

  }

  /**
   * 创建数据
   * @param ctx user_id          用户id
   * @param ctx menu_id        菜单id
   * @param ctx data1 ~ data50       通用数据
   * @returns  成功创建数据返回数据详情数据，失败返回错误信息
   */
  static async create(ctx) {
    // 接收参数
    let {
      user_id, menu_id,
      data1, data2, data3, data4, data5, data6, data7, data8, data9, data10,
      data11, data12, data13, data14, data15, data16, data17, data18, data19, data20,
      data21, data22, data23, data24, data25, data26, data27, data28, data29, data30,
      data31, data32, data33, data34, data35, data36, data37, data38, data39, data40,
      data41, data42, data43, data44, data45, data46, data47, data48, data49, data50
    } = ctx.request.body;

    let params = {
      user_id, menu_id,
      data1, data2, data3, data4, data5, data6, data7, data8, data9, data10,
      data11, data12, data13, data14, data15, data16, data17, data18, data19, data20,
      data21, data22, data23, data24, data25, data26, data27, data28, data29, data30,
      data31, data32, data33, data34, data35, data36, data37, data38, data39, data40,
      data41, data42, data43, data44, data45, data46, data47, data48, data49, data50
    }

    if (!Common.isParamsFormat(ctx, {
      user_id, menu_id
    })) {
      return false;
    }

    try {

      // 创建数据
      const { id } = await GeneraldataModel.create(params);
      // 查询数据
      const data = await GeneraldataModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `创建数据成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `创建数据失败`,
        data: err
      }
    }

  }

  /**
  * 更新数据
  * @param ctx id               数据id
  * @param ctx user_id          用户id
  * @param ctx menu_id        菜单id
  * @param ctx data1 ~ data50       通用数据
  * @returns  成功创建数据返回数据详情数据，失败返回错误信息
  */
  static async update(ctx) {
    // 接收参数
    let { id } = ctx.params;
    let {
      user_id, menu_id,
      data1, data2, data3, data4, data5, data6, data7, data8, data9, data10,
      data11, data12, data13, data14, data15, data16, data17, data18, data19, data20,
      data21, data22, data23, data24, data25, data26, data27, data28, data29, data30,
      data31, data32, data33, data34, data35, data36, data37, data38, data39, data40,
      data41, data42, data43, data44, data45, data46, data47, data48, data49, data50
    } = ctx.request.body;
    let params = {
      user_id, menu_id,
      data1, data2, data3, data4, data5, data6, data7, data8, data9, data10,
      data11, data12, data13, data14, data15, data16, data17, data18, data19, data20,
      data21, data22, data23, data24, data25, data26, data27, data28, data29, data30,
      data31, data32, data33, data34, data35, data36, data37, data38, data39, data40,
      data41, data42, data43, data44, data45, data46, data47, data48, data49, data50
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
      await GeneraldataModel.update(id, params);
      let data = await GeneraldataModel.detail(id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `更新数据成功`,
        data
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `更新数据失败`,
        data: err
      }
    }
  }

  /**
   * 软删除数据数据（隐藏数据）
   * @param ctx id 数据ID
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
      await GeneraldataModel.delete(id, { is_del });

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `删除数据成功`
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `删除数据失败`,
        data: err
      }
    }

  }

  /**
   * 批量软删除数据数据（隐藏数据）
   * @param ctx id 数据ID
   * @param ctx is_del 是否软删除
   * @returns {Promise<boolean>}
   */
  static async deletes(ctx) {
    let { ids, is_del } = ctx.request.body;

    try {
      await GeneraldataModel.deletes(ids, { is_del });

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `批量删除数据成功`
      }

    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `批量删除数据失败`,
        data: err
      }
    }

  }

}

module.exports = Generaldata
