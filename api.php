<?php
require "scalene/Scalene.php";

header("Content-type: application/json");
if (isset($_GET["json"]))
{
	$json = json_decode($_GET["json"]);

	switch($json->method)
	{
		case "messages.get":
			$_->channel->setup($json->params->channel, $json->params->language);
			$data = $_->channel->get_messages();
			$response = "ok";
			break;
		case "message.add":
			$_->channel->setup($json->params->channel, $json->params->language);
			$user = $_->user->get_user($json->params->userId);
			$_->channel->add_message($json->params->message, $user->id);
			$response = "ok";
			break;
		case "channel.users":
			$_->channel->setup($json->params->channel, "");
			$data = $_->channel->get_users();
			$response = "ok";
			break;
		case "user.ping":
			$response = "ok";
			break;
		case "user.add":
			$response = "bad";
			break;
	}
}
else
	$response = "bad";

$return = new stdClass;
if (isset($data))
	$return->data = $data;
$return->response = $response;
echo json_encode($return);