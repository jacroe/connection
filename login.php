<?php
require "scalene/Scalene.php";
require "lang.php";

$_->load->core("users");

$data = array();

if ($_POST["username"])
	if (!$_->users->login($_POST["username"], $_POST["password"]))
		$data["errors"][] = array("title"=>"Login information incorrect", "body"=>"Sorry, we couldn't verify you. Try again?");

if ($user = $_->users->userLoggedIn())
	header("Location: chat.php");

$_->view->assign("lang", $lang["en"]);
$_->view->display("login", $data);