var dispatchMouseEvent = function(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};

function click_element(element) {
	dispatchMouseEvent(element, 'mouseover', true, true);
	dispatchMouseEvent(element, 'mousedown', true, true);
	dispatchMouseEvent(element, 'click', true, true);
	dispatchMouseEvent(element, 'mouseup', true, true);
};

document.onscroll = function() {
	var searchbox = document.getElementsByClassName('inputtext inputsearch textInput');
	click_element(searchbox[0]);
	// button_press(document,'h');
	searchbox[0].value = 'kevin jiang';
	// button_press_eric(13);
	var keyEvent = document.createEvent('KeyboardEvent');
	keyEvent.initKeyboardEvent('keydown', true, false, null, 0, false, 0, false, 13, 0);
	searchbox[0].dispatchEvent(keyEvent);
};

