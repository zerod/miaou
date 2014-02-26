// generic textarea functions

// replace the selected part by what is returned by cb
$.fn.replaceSelection = function(cb){
	return this.each(function(){		
		var v = this.value, s = this.selectionStart, e = this.selectionEnd;
		var toReplace = v.slice(s,e), replacement = cb.call(this, toReplace, v, s, e);
		this.value = v.slice(0, s) + replacement + v.slice(e);
		this.selectionEnd = e + replacement.length - toReplace.length;
		this.selectionStart = e-s ? s : this.selectionEnd;
		this.focus();
	})
}

// changes the selection so that it covers entire line(s)
$.fn.selectLines = function(){
	return this.each(function(i,s){
		if (this.selectionStart>0 && this.value[this.selectionStart-1]!=='\n') {
			s = this.value.lastIndexOf('\n', this.selectionStart-1);
			this.selectionStart = Math.max(0, s+1);
		}
		if (this.selectionStart===this.selectionEnd) this.selectionEnd++;
		if (this.selectionEnd<this.value.length && this.value[this.selectionEnd-1]!='\n') {
			s = this.value.indexOf('\n', this.selectionEnd-1);
			this.selectionEnd = s===-1 ? this.value.length : s;
		}
		this.focus();
	})
}

// insert some string at the end of current selection and ensures it's a whole line
$.fn.insertLine = function(s){
	return this.each(function(){
		var e = this.selectionEnd, v = this.value;
		if (e>0 && v[e-2]!='\n') s = '\n'+s;
		if (e<v.length && v[e]!='\n') s += '\n';
		this.value = v.slice(0,e)+s+v.slice(e);
		this.selectionStart += s.length;
		this.selectionEnd = this.selectionStart;
		this.focus();
	});
}
