<?php
require "scalene/Scalene.php";

if (!$user = $_->users->userLoggedIn())
	header("Location: login.php");

$_->view->assign("user", $user);
$_->view->display("chat");