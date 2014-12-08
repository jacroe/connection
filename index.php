<?php
require "scalene/Scalene.php";
require "lang.php";

$_->view->assign("lang", $lang["en"]);
$_->view->display("index");