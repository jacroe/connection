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
								'title' : ucfirst(msg.user.username)
							})
						),
						$('<div>').attr('class', 'messages').html([
							$('<p>').html(msg.message),
							$('<time>').attr('datetime', html5_time(msg.timestamp)).text(pretty_time(msg.timestamp))
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
		languages = [];
		$("#userlist img").remove();
		$.each(data.data, function(key, value) {
			$("#userlist").append('<img src="' + value.image + '" alt="' + value.username +'"/> ');
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
	return '<li id=' + msg.id + ' class="other"><div class=avatar><img src="' + msg.user.image + '" title="' + ucfirst(msg.user.username) + '" /></div> <div class="messages"><p>' + msg.message + '</p></div></li>';
}

function languages_template(langs) {
	returnText = "";
	$.each(langs, function(key, lang) {
		returnText += '<img src=inc/images/' + lang + '.png alt=' + lang.toUpperCase() + ' title=' + lang.toUpperCase() + ' /> ';
	})
	return returnText
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

function ucfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}