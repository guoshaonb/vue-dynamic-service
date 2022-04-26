class Common {
	
	/*
	 *   数据校验公用模块
	 */
	//判断前端传过来的值有没有包含空的
	static isParamsFormat(ctx, params) {

		//表单数据格式校验
		const validateData = (params) => {
			//用户名正则，4到16位（字母，数字，下划线，减号）
			var uPattern = /^[a-zA-Z0-9_-]{4,20}$/;
			//密码正则，6到20位（字母，数字，下划线，减号）
			var pPattern = /^[a-zA-Z0-9_-]{6,20}$/;
			//手机号正则，9位以上数字
			var reTele = /^1[3456789]\d{9}$/;
			//验证码正则，6位数字
			var reVerify = /^\d{6}$/;
			//邮箱正则
			var emailVerify = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			let valiList = [
				{ prop: "username", vali: uPattern, message: "用户名是4到20位数字、字母或下划线！" },
				{ prop: "password", vali: pPattern, message: "密码是6到20位数字、字母或下划线！" },
				{ prop: "telephone", vali: reTele, message: "请输入格式正确的手机号！" },
				{ prop: "verify_code", vali: reVerify, message: "请输入6位数字的验证码！" },
				{ prop: "email", vali: emailVerify, message: "请输入正确的邮箱格式！" },
			]

			//公用部分检测
			for (let key in params) {
				for (let i = 0; i < valiList.length; i++) {
					if (key == valiList[i].prop) {
						if (!valiList[i].vali.test(params[key])) {
							return valiList[i].message
						}
					}
				}
			}

			/**
		 	* --------------------------密码检测部分--------------------------
		 	*/

			//修改密码检测
			if(params.hasOwnProperty("passwordOld") && params.hasOwnProperty("passwordNew")){
				//如果输入的旧密码和新密码一致
				if (params.passwordOld == params.passwordNew) {
					return "旧密码不能与新密码一致！"
				}
			}
			
			return true
		}

		let errors = [];
		for (let item in params) {
			if (params[item] === undefined || params[item] == null || params[item] == "") {
				let index = errors.length + 1;
				errors.push("错误" + index + ": 参数: " + item + "不能为空")
			}
		}

		//判断数据是否为空
		if (errors.length > 0) {
			ctx.response.status = 412;
			ctx.body = {
				code: 412,
				message: "输入的信息不完整，请检查",
				message_detail: errors
			}
			return false;
		} else {
			//数据格式校验
			const isValidate = validateData(params)
			if (typeof isValidate == "string") {
				ctx.response.status = 412;
				ctx.body = {
					code: 412,
					message: isValidate
				}
				return false;
			} else {
				return isValidate
			}
		}

	}

	//判断id是否为空
	static isIncludeId(ctx, id) {
		if (!id) {
			ctx.response.status = 412;
			ctx.body = {
				code: 412,
				message: `ID不能为空`
			}

			return false;
		}

		if (isNaN(id)) {
			ctx.response.status = 412;
			ctx.body = {
				code: 412,
				message: `请传入正确的ID`
			}

			return false;
		}
		return true
	}

	/*
	 *   数据获取通用模块
	 */

	//echars图表展示：返回本周的新增数量
	static getCounts(data) {

		const list_data = Array(7).fill(0)
		//返回当前周的日期列表
		const wekk_list = getDates(() => {
			var currentDate = new Date()
			var timesStamp = currentDate.getTime();
			var currenDay = currentDate.getDay();
			var dates = [];
			for (var i = 0; i < 7; i++) {
				dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(
					/\//g, '-'));
			}
			return dates
		})
		for (let i = 0; i < wekk_list.length; i++) {
			let day_time = new Date(wekk_list[i])
			let day_year = day_time.getYear() + 1900
			let day_month = day_time.getMonth() + 1
			let day_date = day_time.getDate()
			let day_time_str = day_year + "-" + day_month + "-" + day_date
			for (let j = 0; j < data.length; j++) {
				let time = new Date(data[j].updatedAt)
				let r_year = time.getYear() + 1900
				let r_month = time.getMonth() + 1
				let r_date = time.getDate()
				let r_time_str = r_year + "-" + r_month + "-" + r_date
				day_time_str == r_time_str && ++list_data[i]
			}
		}
		return list_data

	}

	/*
	*   功能:实现VBScript的DateAdd功能.
	*   参数:interval,字符串表达式，表示要添加的时间间隔.
	*   参数:number,数值表达式，表示要添加的时间间隔的个数.
	*   参数:date,时间对象.
	*   返回:新的时间对象.
	*   var   now   =   new   Date();
	*   var   newDate   =   DateAdd( "d ",5,now);
	*---------------   DateAdd(interval,number,date)   -----------------
	*/
	static DateAdd(interval, number, date) {

		let result = null
		//返回指定日期格式

		switch (interval) {
			case "y":
				{
					date.setFullYear(date.getFullYear() + number);
					result = date;
				}
				break;
			case "q":
				{
					date.setMonth(date.getMonth() + number * 3);
					result = date;
				}
				break;
			case "m":
				{
					date.setMonth(date.getMonth() + number);
					result = date;
				}
				break;
			case "w":
				{
					date.setDate(date.getDate() + number * 7);
					result = date;
				}
				break;
			case "d":
				{
					date.setDate(date.getDate() + number);
					console.log("date", date)
					result = date;
				}
				break;
			case "h":
				{
					date.setHours(date.getHours() + number);
					result = date;
				}
				break;
			case "m":
				{
					date.setMinutes(date.getMinutes() + number);
					result = date;
				}
				break;
			case "s":
				{
					date.setSeconds(date.getSeconds() + number);
					result = date;
				}
				break;
			default:
				{
					date.setDate(d.getDate() + number);
					result = date;
				}
				break;
		}

		return ((date = result) => {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var hour = date.getHours();
			hour = hour < 10 ? ('0' + hour) : hour;
			var minute = date.getMinutes();
			minute = minute < 10 ? ('0' + minute) : minute;
			var second = date.getSeconds();
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d + (' ' + hour + ':' + minute + ':' + second);
		})()
	}

}

module.exports = Common
