var channel = "test";
var language;
$(document).ready(function() {
	$('#prefs').modal();


});

function start_timers() {
	load_users();
	load_messages();
	setInterval(function() {
		load_messages();
	}, 1000);
	setInterval(function() {
		load_users();
	}, 3000);
}

function prefs_save() {
	username = $("#username").val();
	language = $("#language").val();
	start_timers();
}

function load_messages() {
	$.get("api.php", {json:JSON.stringify({"method":"messages.get","params":{"channel":channel,"language":language}})}).done(function(data) {
		$.each(data.data, function(key, value) {
			if(!$("#" + value.id).length) {
				$("#chatMessages").append(messages_template(value));
			}
		})
	});
}

function load_users() {
	$.get("api.php", {json:JSON.stringify({"method":"channel.users","params":{"channel":channel,"language":language}})}).done(function(data) {
		languages = [];
		$("#userlist p").remove();
		$.each(data.data, function(key, value) {
			$("#userlist").append("<p>" + value.name + " <img src=inc/images/" + value.language + ".png /></p>");
			if (languages.indexOf(value.language) == -1)
				languages.push(value.language);
		});
		$("#languageList p").html(languages_template(languages));
	});
}

function messages_template(msg) {
	d = new Date(0);
	d.setUTCSeconds(msg.timestamp);
	time = d.getHours() + ':' + d.getMinutes();
	return "<p id=" + msg.id + "><span class=msg-name>" + msg.user.name + "</span> <span class=msg-date>(" + time + ")</span> &ndash; " + msg.message + "</p>";
}

function languages_template(langs) {
	returnText = "";
	$.each(langs, function(key, lang) {
		returnText += "<img src=inc/images/" + lang + ".png alt=" + lang.toUpperCase() + " title=" + lang.toUpperCase() + " />"
	})
	return returnText
}