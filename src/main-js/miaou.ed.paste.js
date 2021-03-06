// handle pasting in the input
miaou(function(ed){

	var input = document.getElementById('input');
	if (!input) return;

	document.addEventListener('paste', function(e){
		console.log('paste event');
		ed.stateBeforePaste = {
			selectionStart:input.selectionStart, selectionEnd:input.selectionEnd, value:input.value
		};
		var initialText = input.value; // because I can't seem to be able to prevent paste
		var files = e.clipboardData.files;
		if (!files.length && e.clipboardData.items) {
			files = [].map.call(e.clipboardData.items, function(item){
				return item.getAsFile();
			});
		}
		var	tbl,
			txt = e.clipboardData.getData('text/plain');
		if (txt) {
			tbl = ed.tbl.textAsTable(txt);
			console.log("tbl:", tbl);
		}
		for (var i=0; i<files.length; i++) {
			if (!files[i]) continue;
			if (/^image\//i.test(files[i].type)) {
				if (tbl) {
					ed.tbl.askAboutPastedTable(tbl, files[i], initialText);
				} else {
				     ed.uploadFile(files[i]);
				}
				return false;
			}
		}
		var pasted = txt;
		if (ed.code.onPasted(pasted)) return;
		if (tbl) {
			ed.tbl.askAboutPastedTable(tbl, null, initialText);
		}
	});

});
