$(document).ready(function() {
	if (document.URL.split("/")[document.URL.split("/").length-1] === "chat.php")
	{
		$.get("api.php", {json:JSON.stringify({"method":"user.add"})});
		start_timers();

		Mousetrap.reset();
		Mousetrap.bind(['ctrl+enter', 'enter'], function() {
			post_message($("#postMessage").val());
			$("#postMessage").val("");
			return false;
		});

		document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
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

function post_message(message) {
	$.get("api.php", {json:JSON.stringify({"method":"messages.add", "params":{"message":message}})});
}

function load_messages() {
	$.get("api.php", {json:JSON.stringify({"method":"messages.get"})}).done(function(data) {
		$.each(data.data, function(key, value) {
			if(!$("#" + value.id).length) {
				atBottom = isAtBottom();
				$("#chatMessages").append(messages_template(value));
				if (atBottom) // We were at the bottom, so push it on down
					document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
			}
		})
	});
}

function load_users() {
	$.get("api.php", {json:JSON.stringify({"method":"channel.users"})}).done(function(data) {
		languages = [];
		$("#userlist img").remove();
		$.each(data.data, function(key, value) {
			$("#userlist").append("<img src='" + value.image + "' alt='" + value.username +"'/> ");
			if (languages.indexOf(value.language) == -1)
				languages.push(value.language);
		});
		$("#languageList p").html(languages_template(languages));
	});
}

function messages_template(msg) {
	d = new Date(0);
	d.setUTCSeconds(msg.timestamp);
	time = pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2);
	return "<p id=" + msg.id + "><span class=msg-name>" + msg.user.username + "</span> <span class=msg-date>(" + time + ")</span> &ndash; " + msg.message + "</p>";
}

function languages_template(langs) {
	returnText = "";
	$.each(langs, function(key, lang) {
		returnText += "<img src=inc/images/" + lang + ".png alt=" + lang.toUpperCase() + " title=" + lang.toUpperCase() + " /> "
	})
	return returnText
}

function isAtBottom() {
	cmDiv = document.getElementById('chatMessages');
	return cmDiv.clientHeight + cmDiv.scrollTop == cmDiv.scrollHeight;
}

function pad (str, max) { // http://stackoverflow.com/a/6466243/3413608
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}