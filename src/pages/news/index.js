const { requestApi } = require("../../utils/request");
const tagManager = require("../tag-config/tag-config-manager");
Page({
	data: {
		currentTag: "top",
		newsCategoryMap: {},
		newsTag: [],
		currentIndex: 0,
		newsList: [],
	},
	onShow: function () {
		this.initNewsTag();
		// this.initNewsList()
	},
	initNewsTag() {
		const newsTagList = tagManager.getSelectedTagList();
		console.log("jj", newsTagList);
		this.setData({
			newsTag: newsTagList,
			currentTag: newsTagList[0].key,
		});
	},
	initNewsList: async function () {
		try {
			const newsList = await requestApi({
				type: this.data.currentTag,
			});
			this.setData({
				newsList: newsList,
			});
			console.log(this.data.newsList);
		} catch (error) {
			WebGLTexture.showToast({
				title: `获取新闻失败： ${error.message}`,
			});
		}
	},
	onclickNewsTag: function (event) {
		const currentTag = event.currentTarget.dataset["tagKey"];
		this.setData({
			currentTag,
		});
		// this.initNewsList();
	},
	onclickNewsDetail: function (event) {
		const url = event.currentTarget.dataset["newsSrc"];
		wx.navigateTo({
			url: "/pages/news-detail/index?url=" + url,
		});
	},
	onSwiperChange: function (detail) {
		console.log("onSwiperChange", detail.detail.current);
		const currentTag = this.data.newsTag[detail.detail.current].key;
		this.setData({
			currentTag,
		});
		this.selectNewsCategory(currentTag);
	},
	async selectNewsCategory(newsCategoryKey) {
		try {
			const newsList = await this.initNewsList();
			const newsCategoryMap = this.data.newsCategoryMap;
			newsCategoryMap[newsCategoryKey] = newsList;
			this.setData({
				newsList,
				currentTag,
			});
		} catch (error) {
			wx.showToast({
				title: "获取新闻列表失败，请稍后再试",
				icon: "none",
			});
		}
	},
	onclickEdit() {
		wx.navigateTo({
			url: "/pages/tag-config/index",
		});
	},
});
