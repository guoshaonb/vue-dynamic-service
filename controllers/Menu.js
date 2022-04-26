const MenuModel = require('../models/MenuModel')
const CategoryModel = require('../models/CatalogueModel')
const Common = require("../utils/common");

class Menu {
    /**
     * 获取菜单列表
     * @param ctx
     *
     * @returns 菜单列表数据
     */
     static async list(ctx) {
        let params = ctx.query;
        try {
            const data = await MenuModel.list(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询菜单列表成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `查询菜单列表失败`,
                data: err
            }
        }
    }

    /**
     * 查询菜单详情
     * @param ctx id  菜单ID
     *
     * @returns 菜单的详情
     */
    static async detail(ctx) {
        // 菜单ID
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        try {

            let data = await MenuModel.detail(id);

            if (data !== null) {
                // 浏览次数增加1
                let browser = data.browser + 1;
                await MenuModel.update(id, {
                    browser
                })
            }

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询菜单成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `查询菜单失败`,
                data: err
            }
        }

    }

    /**
     * 创建菜单
     * @param ctx name            菜单名称
     *
     * @returns  成功创建菜单返回菜单详情数据，失败返回错误信息
     */
    static async create(ctx) {
        // 接收参数
        let { name, catalogueId } = ctx.request.body;

        let params = {
            name,
            catalogueId
        }

        // 检测参数是否存在为空
        if (!Common.isParamsFormat(ctx, params)) {
            return false;
        }

        try {

            // 查询目录是否存在
            let detail = await CategoryModel.detail(catalogueId);
            if (!detail) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    message: `目录ID：${catalogueId}，不存在！`
                }

                return false;
            }

            // 创建菜单
            const { id } = await MenuModel.create(params);
            // 查询菜单
            const data = await MenuModel.detail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `创建菜单成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `创建菜单失败`,
                data: err
            }
        }
    }

    /**
     * 更新菜单数据
     * @param ctx name 菜单名称
     *
     * @returns 更新成功则返回更新后的菜单数据，失败返回更新失败的原因
     */
     static async update(ctx) {
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        // 接收参数
        let { name, catalogueId } = ctx.request.body;

        let params = {
            name,
            catalogueId,
        }

        try {
            await MenuModel.update(id, params);
            let data = await MenuModel.detail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `更新菜单成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `更新菜单失败`,
                data: err
            }
        }
    }

    /**
     * 软删除菜单数据（隐藏数据）
     * @param ctx id 菜单ID
     * @param ctx is_del 是否软删除
     * @returns {Promise<boolean>}
     */
    static async hidden(ctx) {
        let { id } = ctx.params;
        let { is_del } = ctx.query;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        try {
            await MenuModel.hidden(id, { is_del });

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `删除菜单成功`
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `删除菜单失败`,
                data: err
            }
        }

    }

}

module.exports = Menu
