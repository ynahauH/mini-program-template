const noteStorage = require("../../utils/storage");
Page({
	data: {
		noteId: "",
	},
	onLoad: function (options) {
		const noteId = options.noteId;
		console.log("options", options);
		this.data.noteId = noteId;
		if (!noteId) {
			wx.showToast({
				title: "错误",
			});
		}
		this.initEditorContent();
	},
	onInput: function (event) {
		noteStorage.setNoteContent(this.data.noteId, event.detail);
	},
	getNoteEditor: function () {
		return new Promise((resolve, reject) => {
			wx.createSelectorQuery()
				.select("#note-editor")
				.context(function (res) {
					resolve(res.context);
				})
				.exec();
		});
	},
	initEditorContent: async function () {
		// 获取editor context
		const contents = noteStorage.getNoteContent(this.data.noteId);
		const editor = await this.getNoteEditor();
		console.log("contents:", contents);
		editor.setContents(contents);
	},
	onClickBold: async function () {
		const editor = await this.getNoteEditor();
		editor.format("bold");
	},
	onClickItalic: async function () {
		const editor = await this.getNoteEditor();
		console.log("editor:", editor);
		editor.format("italic");
	},
	onClickUnderLine: async function () {
		const editor = await this.getNoteEditor();
		editor.format("underline");
	},
});
