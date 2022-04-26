const CatalogueModel = require('../models/CatalogueModel')
const Common = require("../utils/common");

class Catalogue {
    /**
     * 获取目录列表
     * @params ctx include 包含内容
     *
     * @returns 目录列表数据
     */
     static async list(ctx) {
        let params = ctx.query;
        try {
            let data = await CatalogueModel.list(params)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `获取目录列表成功！`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取目录列表失败`,
                data: err
            }
        }
    }


    /**
     * 查询ID目录下的所有菜单
     *
     * @returns 目录列表数据
     */
    static async menu(ctx) {
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        try {
            const data = await CatalogueModel.menu(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询成功！`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取目录列表失败`,
                data: err
            }
        }
    }

    /**
     * 查询目录详情数据
     * @param ctx id 目录ID
     *
     * @returns 目录详情
     */
    static async detail(ctx) {
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!Common.isIncludeId(ctx, id)) {
            return false;
        }

        try {
            let data = await CatalogueModel.detail(id);
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
                message: `获取目录列表失败`,
                data: err
            }
        }
    }

    /**
     * 创建目录
     * @param ctx name         目录名称
     * @param ctx icon         目录icon图标
     * @param ctx parent_id    父目录ID
     * @param ctx z_index      权重
     *
     * @returns 成功创建目录返回目录详情数据，失败返回错误信息
     */
    static async create(ctx) {
        let { name, icon, parent_id, z_index } = ctx.request.body;

        let params = {
            name,
            icon,
            parent_id
        }

        // 检测参数是否存在为空
        if (!Common.isParamsFormat(ctx, params)) {
            return false;
        }

        try {
            params.z_index = z_index || "10";
            params.parent_id = parent_id || 0;
            const { id } = await CatalogueModel.create(params);
            const data = await CatalogueModel.detail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `创建目录成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `创建目录失败`,
                data: err
            }
        }

    }
    
    /**
     * 更新目录数据
     * @param ctx id 目录ID
     * @param ctx name         目录名称
     * @param ctx icon         目录icon图标
     * @param ctx parent_id    父目录ID
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

        let { name, icon, parent_id, z_index = 10 } = ctx.request.body;
        let params = {
            name,
            icon,
            parent_id,
            z_index
        }

        try {

            await CatalogueModel.update(id, params);
            let data = await CatalogueModel.detail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `更新目录成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `更新目录失败`,
                data: err
            }
        }

    }

    /**
     * 软删除目录数据（隐藏数据）
     * @param ctx id 目录ID
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
            // 检测改目录下是否有菜单关联，如果有菜单关联则报出不能删除错误
            let hasMenu = await CatalogueModel.menu(id);
            if (hasMenu && hasMenu[0].menus.length > 0) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    message: `此目录下有菜单关联，不能删除`
                }

                return false;

            } else {
                await CatalogueModel.hidden(id, {is_del});
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

module.exports = Catalogue
