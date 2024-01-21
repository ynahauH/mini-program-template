const tagManager = require("./tag-config-manager");
const allTagList = require("./all-tags");
Page({
	data: {
		selectedTagList: [],
		unselectedTagList: [],
	},
	onLoad() {
		// this.updateTagList();
		this.loadTagConfig();
	},
	updateTagList(selectedTagList) {
		// 根据全部的tag和已选择的tag计算未选的tag
		const selectedKeySet = selectedTagList
			.map((item) => {
				return item.key;
			})
			.reduce((accumulator, currentagKey) => {
				return accumulator.add(currentagKey);
			}, new Set());
		const unselectedTagList = [];
		for (const tagItem of allTagList) {
			if (selectedKeySet.has(tagItem.key)) continue;
			unselectedTagList.push(tagItem);
		}
		this.setData({
			selectedTagList,
			unselectedTagList,
		});
	},
	onRemoveTag(event) {
		const index = event.currentTarget.dataset["tagIndex"];
		this.data.selectedTagList.splice(index, 1);
		this.updateTagList(this.data.selectedTagList);
	},
	onAddTag(event) {
		const index = event.currentTarget.dataset["tagIndex"];
		this.data.selectedTagList.push(this.data.unselectedTagList[index]);
		this.updateTagList(this.data.selectedTagList);
	},
	loadTagConfig() {
		const selectedTagList = tagManager.getSelectedTagList();
		this.updateTagList(selectedTagList);
	},
	onSave() {
		tagManager.setSelectedTagList(this.data.selectedTagList);
		wx.navigateBack();
	},
});
