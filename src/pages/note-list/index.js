const noteStorage = require("../../utils/storage");

Page({
	data: {
		noteList: [],
	},
	onShow() {
		this.loadNoteList();
	},
	loadNoteList() {
		const noteList = noteStorage.getNoteList();
		this.setData({
			noteList,
		});
	},

	onClickNote: function (target) {
		const noteId = target.currentTarget.dataset["noteId"];
		wx.navigateTo({
			url: "/pages/note/index?noteId=" + noteId,
		});
		console.log(target);
	},
	onCreateNote: function () {
		const id = noteStorage.createNote();
		console.log(id);
		wx.navigateTo({
			url: "/pages/note/index?noteId=" + id,
		});
	},
});
