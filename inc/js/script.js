var oldLangList = [];

$(document).ready(function() {
	if (document.URL.split("/")[document.URL.split("/").length-1] === "chat.php")
	{
		$.get("api.php", {json:JSON.stringify({"method":"user.add"})});
		start_timers();

		Mousetrap.reset();
		Mousetrap.bind(['ctrl+enter', 'enter'], function() {
			post_message();
			return false;
		});

		document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
	}
});

function start_timers() {
	load_users();
	load_messages();
	setInterval(function() {
		load_messages();
		load_users();
	}, 2000);
}

function post_message() {
	$.get("api.php", {json:JSON.stringify({"method":"messages.add", "params":{"message":$("#postMessage").val()}})});
	$("#postMessage").val("");
}

function load_messages() {
	$.get("api.php", {json:JSON.stringify({"method":"messages.get"})}).done(function(data) {
		$.each(data.data, function(key, msg) {
			if(!$("#" + msg.id).length) {
				atBottom = isAtBottom();
				$(function() {
					$('<li>').attr('id', msg.id).attr('class', (msg.user.username === user ? 'self' : 'other')).html([
						$('<div>').attr('class', "avatar").html(
							$('<img>').attr({
								'src' : msg.user.image,
								'title' : msg.user.username.ucfirst()
							})
						),
						$('<div>').attr('class', 'messages').html([
							$('<p>').attr('title', ("original_message" in msg) ? msg.original_message : "").html(msg.message),
							$('<time>').attr('datetime', html5_time(msg.timestamp)).text(msg.user.username.ucfirst() + " • " + pretty_time(msg.timestamp))
						])
					]).appendTo('#chatBox ol');
				});
				if (atBottom) // We were at the bottom, so push it on down
					document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
			}
		})
	});
}

function load_users() {
	$.get("api.php", {json:JSON.stringify({"method":"channel.users"})}).done(function(data) {
		newLangList = [];
		$("#userlist img").remove();
		$.each(data.data, function(key, value) {
			$("#userlist").append('<img src="' + value.image + '" alt="' + value.username +'"/> ');
			if (newLangList.indexOf(value.language) == -1)
				newLangList.push(value.language);
		});
		if (!oldLangList.equals(newLangList.sort())) {
			$.get("api.php", {json:JSON.stringify({"method":"language.list", "params":{"list":newLangList}})}).done(function(langListFullName) {
					$("#languageList p").html(langListFullName.data.join(", "));
			});
		}
		oldLangList = newLangList;
	});
}

function html5_time(timestamp) {
	d = new Date(0);
	d.setUTCSeconds(timestamp);
	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + 'T' + pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2);
}

function pretty_time(timestamp) {
	d = new Date(0);
	d.setUTCSeconds(timestamp);
	hour = d.getHours() % 12;
	if (!hour)
		hour = 12;
	return hour + ':' + pad(d.getMinutes(), 2) + (d.getHours() >= 12 ? 'pm' : 'am');
}

function isAtBottom() {
	cmDiv = document.getElementById('chatBox');
	return cmDiv.clientHeight + cmDiv.scrollTop == cmDiv.scrollHeight;
}

function pad (str, max) { // http://stackoverflow.com/a/6466243/3413608
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

String.prototype.ucfirst = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

// http://stackoverflow.com/a/14853974/3413608
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
	// if the other array is a falsy value, return
	if (!array)
		return false;

	// compare lengths - can save a lot of time 
	if (this.length != array.length)
		return false;

	for (var i = 0, l=this.length; i < l; i++) {
		// Check if we have nested arrays
		if (this[i] instanceof Array && array[i] instanceof Array) {
			// recurse into the nested arrays
			if (!this[i].equals(array[i]))
				return false;
		}
		else if (this[i] != array[i]) { 
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}