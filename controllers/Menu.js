const MenuModel = require('../models/MenuModel')
const Common = require("../utils/common");

class Menu {
    /**
     * 获取菜单列表
     * @params ctx include 包含内容
     *
     * @returns 菜单列表数据
     */
    static async list(ctx) {
        let params = ctx.query;
        try {
            let data = await MenuModel.list(params)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `获取菜单列表成功！`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取菜单列表失败`,
                data: err
            }
        }
    }

    /**
     * 查询菜单详情数据
     * @param ctx id 菜单ID
     *
     * @returns 菜单详情
     */
    static async detail(ctx) {
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        try {
            let data = await MenuModel.detail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取菜单列表失败`,
                data: err
            }
        }
    }

    /**
     * 创建菜单
     * @param ctx name         菜单名称
     * @param ctx icon         菜单icon图标
     * @param ctx parent_id    父菜单ID
     * @param ctx z_index      权重
     *
     * @returns 成功创建菜单返回菜单详情数据，失败返回错误信息
     */
    static async create(ctx) {
        let { name, type, icon, parent_id = 0, z_index = 1 } = ctx.request.body;

        let params = {
            name,
            type,
            icon,
            parent_id,
            z_index
        }

        // 检测参数是否存在为空
        if (!Common.isParamsFormat(ctx, params)) {
            return false;
        }

        try {
            const { id } = await MenuModel.create(params);
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
     * @param ctx id 菜单ID
     * @param ctx name         菜单名称
     * @param ctx icon         菜单icon图标
     * @param ctx parent_id    父菜单ID
     * @param ctx z_index      权重
     *
     * @returns 更新成功返回更新后的数据，失败返回错误信息
     */
    static async update(ctx) {
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        let { name, type, icon, parent_id, z_index = 1 } = ctx.request.body;
        let params = {
            name,
            type,
            icon,
            parent_id,
            z_index
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
            // 检测改菜单下是否有子级关联，如果有子级关联则报出不能删除错误
            let hasMenu = await MenuModel.menu(id);
            if (hasMenu) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    message: `此菜单下有子级关联，不能删除`
                }
            } else {
                await MenuModel.hidden(id, { is_del });
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    message: `删除成功`
                }
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `删除失败`,
                data: err
            }
        }

    }

}

module.exports = Menu
