<?php

class Translate extends Model
{
	private $apikey;

	public function __construct()
	{
		foreach($this->config["translate"] as $k=>$v)
		{
			$this->$k = $v;
		}
	}

	public function translate($text, $to, $from = null)
	{
		$text = urlencode($text);

		$url = "https://www.googleapis.com/language/translate/v2?q=$text&target=$to&key={$this->apikey}";
		if ($from) 
			$url .= "&source=$from";
		$json = json_decode(file_get_contents($url));

		return $json->data->translations[0];
	}

	public function detect_language($text)
	{
		$text = urlencode($text);

		$url = "https://www.googleapis.com/language/translate/v2/detect?q=$text&key={$this->apikey}";
		$json = json_decode(file_get_contents($url));

		return $json->data->detections[0][0];
	}
}