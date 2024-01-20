const NOTE_ID_LIST = "noteList";
const NOTE_CONTENT_PREFIX = "noteContent";

function getNoteIdList() {
	return wx.getStorageSync(NOTE_ID_LIST) || [];
}

function getNoteList() {
	const noteIdList = getNoteIdList();
	const noteList = [];
	for (let noteId of noteIdList) {
		noteList.push({
			noteId: noteId,
			content: getNoteContent(noteId),
		});
	}
	return noteList;
}

function setNoteIdList(noteIdList) {
	wx.setStorageSync(NOTE_ID_LIST, noteIdList || []);
}

function getNoteContent(noteId) {
	return wx.getStorageSync(NOTE_CONTENT_PREFIX + noteId);
}

function setNoteContent(noteId, content) {
	try {
		wx.setStorageSync(NOTE_CONTENT_PREFIX + noteId, content);
	} catch (error) {
		console.log("设置了一个便签内容失败");
	}
}

function createNote() {
	const newNoteId = Date.now();
	const noteIdList = getNoteIdList();
	noteIdList.push(newNoteId);
	setNoteIdList(noteIdList);
	setNoteContent(newNoteId, newNoteId);
	return newNoteId;
}

function deleteNote(noteId) {
	// 删除note内容
	wx.removeStorageSync(NOTE_CONTENT_PREFIX + noteId);
	// 移除noteId
	const noteIdList = getNoteIdList();
	noteIdList.splice(noteIdList.indexOf(noteId), 1);
	setNoteIdList(noteIdList);
}

module.exports = {
	getNoteIdList,
	getNoteList,
	getNoteContent,
	setNoteContent,
	createNote,
	deleteNote,
};
