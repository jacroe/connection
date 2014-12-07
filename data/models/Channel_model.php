<?php

class Channel extends Model
{
	private $id;
	private $channel_name;
	private $language;

	public function setup($name, $language)
	{
		$this->channel_name = $name;
		$this->id = $this->_get_id($name);
		$this->language = $language;
	}

	public function get_messages()
	{
		$messages = $this->_format_messages($this->database->get("messages", "`channelId` = {$this->id} ORDER BY `timestamp` LIMIT 20"));
		return $messages;
	}

	public function add_message($message, $userId)
	{
		$this->database->insert(
			"messages", 
			array(
				"channelId"=>$this->id,
				"userId"=>$userId,
				"message"=>$message,
				"language"=>$this->language,
				"timestamp"=>time()
			)
		);
	}

	public function get_users()
	{
		$users = array();

		$rows = $this->database->get("channelUserlist", "`channelId` = {$this->id}");
		foreach($rows as $row)
		{
			$u = $this->_get_user($row["userId"]);
			unset($u->id);
			$users[] = $u;
		}

		return $users;
	}

	public function add_user($username)
	{
		$user = $this->_get_user($username);
		if (!$this->database->numRows("channelUserlist", "`channelId` = {$this->id} AND `userId` = {$user->id}"))
			$this->database->insert("channelUserlist", array("channelId"=>$this->id, "userId"=>$user->id));
	}

	public function remove_user($username)
	{
		$user = $this->_get_user($username);
		$this->database->delete("channelUserlist", array("channelId"=>$this->id, "userId"=>$user->id));
	}

	private function _get_id($name)
	{
		if (!$this->database->numRows("channel", "`name` = '$name'"))
			$this->database->insert("channel", array("name"=>$name));

		$rows = $this->database->get("channel", "`name` = '$name'");
		return $rows[0]["id"];
	}

	public function _get_user($userId)
	{
		if (is_numeric($userId))
			$rows = $this->database->get("users", "`id` = $userId");
		else
			$rows = $this->database->get("users", "`username` = '$userId'");

		$user = (object)($rows[0]);
		$user->image = "http://www.gravatar.com/avatar/".md5($user->email)."/?s=33&d=identicon";
		unset($user->email);
		unset($user->password);

		return $user;
	}

	private function _format_messages($msgs)
	{
		$return = array();
		foreach($msgs as $m)
		{
			$m["user"] = $this->_get_user($m["userId"]);
			unset($m["user"]->id);
			unset($m["userId"]);
			$return[] = (object)$m;
		}

		foreach ($return as $m)
		{
			if (($m->language != $this->language))
			{
				if(!$this->database->numRows("messagesTranslated", "`messageId` = {$m->id} AND `language` = '{$this->language}'"))
				{
					$translation = $this->translate->translate($m->message, $this->language, $m->language);

					$this->database->insert(
						"messagesTranslated",
						array(
							"messageId"=>$m->id,
							"language"=>$this->language,
							"message"=>$translation->translatedText
						)
					);
				}
				$rows = $this->database->get("messagesTranslated", "`messageId` = {$m->id} AND `language` = '{$this->language}'");
				$translated_message = $rows[0];

				$m->original_message = $m->message;
				$m->original_language = $m->language;
				unset($m->language);
				$m->message = $translated_message["message"];
				$m->translated_language = $this->language;
			}
		}

		return $return;
	}
}