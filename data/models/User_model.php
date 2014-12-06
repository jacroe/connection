<?php

class User extends Model
{
	public function get_user($userId)
	{
		if (is_numeric($userId))
			$rows = $this->database->get("users", "`id` = $userId");
		else
			$rows = $this->database->get("users", "`name` = '$userId'");

		return (object)($rows[0]);
	}
}