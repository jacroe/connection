<?php
require "scalene/Scalene.php";

header("Content-type: application/json");
if (!$user = $_->users->getUser())
	$response = "bad";
elseif (isset($_GET["json"]))
{
	$json = json_decode($_GET["json"]);

	switch($json->method)
	{
		case "messages.get":
			$_->channel->setup($user->channelId, $user->language);
			$data = $_->channel->get_messages();
			$response = "ok";
			break;
		case "messages.add":
			$_->channel->setup($user->channelId, $user->language);
			$_->channel->add_message($json->params->message, $user->id);
			$response = "ok";
			break;
		case "channel.users":
			$_->channel->setup($user->channelId, "");
			$data = $_->channel->get_users();
			$response = "ok";
			break;
		case "user.ping":
			$response = "ok";
			break;
		case "user.add":
			$_->channel->setup($json->params->channel, "");
			$_->channel->add_user($user->username);
			$response = "ok";
			break;
		case "language.list":
			$data = $_->translate->language_list($json->params->list, $user->language);
			$response = "ok";
			break;
		default:
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