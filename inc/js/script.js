$(document).ready(function() {
	
});

function start_timers() {
	setInterval(function() {
		load_messages();
	}, 1000);
}

function load_messages(channel, language) {
	$.get("api.php", {json:JSON.stringify({"method":"messages.get","params":{"channel":"test","language":"en"}})}).done(function(data) {
		$.each(data.data, function(key, value) {
			if(!$("#" + value.id).length) {
				$("#chatMessages").append(messages_template(value));
			}
		})
	});
}

function messages_template(msg) {
	d = new Date(0);
	d.setUTCSeconds(msg.timestamp);
	time = d.getHours() + ':' + d.getMinutes();
	return "<p id=" + msg.id + "><span class=msg-name>" + msg.user.name + "</span> <span class=msg-date>(" + time + ")</span> &ndash; " + msg.message + "</p>";
}