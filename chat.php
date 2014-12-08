<?php
require "scalene/Scalene.php";
require "lang.php";

if (!$user = $_->users->getUser())
	header("Location: login.php");

$_->view->assign("user", $user);

if (array_key_exists($user->language, $lang))
	$_->view->assign("lang", $lang[$user->language]);
else
	$_->view->assign("lang", $lang["en"]);

$_->channel->setup($user->channelId, $user->language);
$_->view->assign("channelname", $_->channel->get_name());

$_->view->display("chat");