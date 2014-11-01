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

window.onload = function() {
	//~search_name('kevin jiang');
	setInterval(scrape, 1000);
};

function scrape(){
	var d = new Date();
	var dataPoint = {};
	var users = [];
	$("._42fz").each(function(){
		var user = {};
		// User name
		user.name = $(this).find("div._55lr").html();
		// Status
		user.status = $(this).find("div._5t35").html();
		users.push(user);
	});
	dataPoint.users = users;
	dataPoint.timestamp = d.getTime();
	console.log(dataPoint);
}

function search_name(name) {
	var searchbox = document.getElementsByClassName('inputtext inputsearch textInput');
	click_element(searchbox[0]);
	searchbox[0].value = name;
	var keyEvent = document.createEvent('KeyboardEvent');
	keyEvent.initKeyboardEvent('keydown', true, false, null, 0, false, 0, false, 13, 0);
	searchbox[0].dispatchEvent(keyEvent);
};

