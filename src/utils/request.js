function requestApi(params) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: "http://v.juhe.cn/toutiao/index",
			data: {
				key: "d10446c8032c43c12ffb5dd1f222414a",
				...params,
			},
			success: function (res) {
				const code = res.statusCode;
				if (code !== 200) {
					reject(new Error("网络请求错误，请稍后再试"));
				}
				resolve(res.data.result.data);
			},
			error: function (error) {
				reject(new Error("网络请求错误，请稍后再试"));
			},
		});
	});
}

module.exports = {
	requestApi,
};
