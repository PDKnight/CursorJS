var CursorJS = {
	img: new Image(),
	els: [],
	mouseOffset: {
		x: 5,
		y: 5
	},
	addedImg: false,
	checkForIE: function() {
		return (/MSIE/i.test(navigator.userAgent)
				|| /rv:11.0/i.test(navigator.userAgent));
	},
	setDisplay: function() {
		this.img.style.display = null;
		this.img.style.display =
			this.els.indexOf(true) > -1 ? null : 'none';
	},
	getMouseCoords: function(e) {
		var mx = 0, my = 0;
		if (this.checkForIE())
			mx = event.clientX + document.body.scrollLeft,
			my = event.clientY + document.body.scrollTop;
		else
			mx = e.pageX,my = e.pageY;
		if (mx < 0) mx = 0;
		if (my < 0) my = 0;
		return [mx, my];
	},
	mouseOver: function(e, id) {
		this.els[id] = true;
		this.setDisplay();
		var coords = this.getMouseCoords(e);
		this.img.style.left = (coords[0]+this.mouseOffset.x) + 'px';
		this.img.style.top = (coords[1]+this.mouseOffset.y) + 'px';
	},
	mouseOut: function(e, id) {
		this.els[id] = false;
		this.setDisplay();
	},
	mouseMove: function(e) {
		var coords = this.getMouseCoords(e);
		this.img.style.left = (coords[0]+this.mouseOffset.x) + 'px';
		this.img.style.top = (coords[1]+this.mouseOffset.y) + 'px';
	},
	addEvent: function(el, name, func, bool) {
		if (el == null || typeof name != 'string'
				|| typeof func != 'function'
				|| typeof bool != 'boolean')
			return;
		if (el.addEventListener)
			el.addEventListener(name, func, false);
		else if (el.attachEvent)
			el.attachEvent('on' + name, func);
		else
			el['on' + name] = func;
	},
	addEl: function(el) {
		var evts = ['over','out','move'],
			id = this.els.length;
		this.els.push(false);
		this.el = el;
		this.addEvent(el, 'mouseover', function(e) {
			this.mouseOver(e, id) }.bind(this), false);
		this.addEvent(el, 'mouseout', function(e) {
			this.mouseOut(e, id) }.bind(this), false);
		this.addEvent(el, 'mousemove', function(e) {
			this.mouseMove(e) }.bind(this), false);
		if (typeof el['style'] != 'undefined')
			el.style.cursor = 'none';
	},
	enable: function(src) {
		this.img.src = src;
		this.img.style.display = 'none';
		this.img.style.position = 'absolute';
		this.img.style.cursor = 'none';
		this.addEvent(this.img, 'mousemove', function(e) {
			this.mouseMove(e) }.bind(this), false);
		if (!this.addedImg)
			document.body.appendChild(this.img),
			this.addedImg = true;
	}
}


/*** BIND FUNCTION FOR OLD BROWSERS **********************/
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs   = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP    = function() {},
				fBound  = function() {
					return fToBind.apply(this instanceof fNOP
								 ? this
								 : oThis,
								 aArgs.concat(Array.prototype.slice.call(arguments)));
				};

		if (this.prototype) {
			// native functions don't have a prototype
			fNOP.prototype = this.prototype; 
		}
		fBound.prototype = new fNOP();

		return fBound;
	};
}