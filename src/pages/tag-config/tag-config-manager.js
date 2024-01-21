const allTagList = require("./all-tags");
const SELECTED_TAG_LIST = "selectedTagList";
function getSelectedTagList() {
	return wx.getStorageSync(SELECTED_TAG_LIST) || [...allTagList];
}
function setSelectedTagList(selectedTagList) {
	wx.setStorageSync(SELECTED_TAG_LIST, selectedTagList);
}
module.exports = {
	getSelectedTagList,
	setSelectedTagList,
};
