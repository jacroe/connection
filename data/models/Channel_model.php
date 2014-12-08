<?php

class Channel extends Model
{
	private $id;
	private $channel_name;
	private $language;

	public function setup($channel, $language)
	{
		if (is_numeric($channel)) // Channel already exists if we have a numeric
		{
			$rows = $this->database->get("channel", "`id` = $channel");
			$this->channel_name = $rows[0]["name"];
			$this->id = $channel;
		}
		else // May exist, may not.
		{
			$this->channel_name = $channel;
			$this->id = $this->_lookup_id($channel);
		}
		$this->language = $language;
	}

	public function get_messages()
	{
		$messages = $this->_format_messages($this->database->get("messages", "`channelId` = {$this->id} ORDER BY `timestamp` DESC LIMIT 20"));
		$messages = array_reverse($messages);
		return $messages;
	}

	public function add_message($message, $userId)
	{
		if ($message != "")
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
	}

	public function get_users()
	{
		$users = array();

		$rows = $this->database->get("users", "`channelId` = {$this->id}");
		foreach($rows as $row)
		{
			$user = (object)($row);
			$user->image = "http://www.gravatar.com/avatar/".md5($user->email)."/?s=33&d=identicon";
			unset($user->email);
			unset($user->password);
			unset($user->id);
			$users[] = $user;
		}

		return $users;
	}

	public function add_user($username)
	{
		$this->remove_user($username); // Remove from any other channel, just to be safe
		$this->database->update("users", array("channelId"=>$this->id), "`username` = '$username'");
	}

	public function remove_user($username)
	{
		$this->database->update("users", array("channelId"=>null), "`username` = '$username'");
	}

	public function get_id()
	{
		return $this->id;
	}

	public function get_name()
	{
		return $this->channel_name;
	}

	private function _lookup_id($name)
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