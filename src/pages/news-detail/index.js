Page({
	onLoad: function (options) {
		const src = options.url;
		this.setData({
			src,
		});
	},
	data: {
		src: "",
	},
});
