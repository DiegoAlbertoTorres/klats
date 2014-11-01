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

// alert("hit this file")

document.addEventListener("DOMContentLoaded", function() {
    alert("hi");
});

// var dispatchKeyboardEvent = function(target, initKeyboradEvent_args) {
//   var e = document.createEvent("KeyboardEvents");
//   e.initKeyboardEvent.apply(e, Array.prototype.slice.call(arguments, 1));
//   target.dispatchEvent(e);
// };
// var dispatchTextEvent = function(target, initTextEvent_args) {
//   var e = document.createEvent("TextEvent");
//   e.initTextEvent.apply(e, Array.prototype.slice.call(arguments, 1));
//   target.dispatchEvent(e);
// };
// var dispatchSimpleEvent = function(target, type, canBubble, cancelable) {
//   var e = document.createEvent("Event");
//   e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
//   target.dispatchEvent(e);
// };

// var canceled = !dispatchKeyboardEvent(element,
//     'keydown', true, true,  // type, bubbles, cancelable
//     null,  // window
//     'h',  // key
//     0, // location: 0=standard, 1=left, 2=right, 3=numpad, 4=mobile, 5=joystick
//     '');  // space-sparated Shift, Control, Alt, etc.
// dispatchKeyboardEvent(
//     element, 'keypress', true, true, null, 'h', 0, '');
// if (!canceled) {
//   if (dispatchTextEvent(element, 'textInput', true, true, null, 'h', 0)) {
//     element.value += 'h';
//     dispatchSimpleEvent(element, 'input', false, false);
//     // not supported in Chrome yet
//     // if (element.form) element.form.dispatchFormInput();
//     dispatchSimpleEvent(element, 'change', false, false);
//     // not supported in Chrome yet
//     // if (element.form) element.form.dispatchFormChange();
//   }
// }
// dispatchKeyboardEvent(
//     element, 'keyup', true, true, null, 'h', 0, '');

