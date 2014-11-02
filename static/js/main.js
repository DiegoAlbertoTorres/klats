// $(function() {
//     var users = unhash_users();
//     $("#tags").autocomplete({
//       source: users
//     });
//   });

// function unhash_users(){
//   var names = [];
//   var users = chrome.storage.local.users;
//   for (u in users){
//       names.push(u.name);
//   }
//   return names;
// }

// function grab_user(){
//   var name = document.getElementById("tags").select();
//   var hash = Math.abs(name.hashCode()).toString(16);
//   var friend = chrome.storage.local.users[hash];
//   alert(friend);
//   return;
// }



// String.prototype.hashCode = function() {
//   var hash = 0, i, chr, len;
//   if (this.length == 0) return hash;
//   for (i = 0, len = this.length; i < len; i++) {
//     chr   = this.charCodeAt(i);
//     hash  = ((hash << 5) - hash) + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };