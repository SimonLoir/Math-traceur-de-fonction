<?php
class bot
{
    public $token;
    public $sender;
    public $url = "https://graph.facebook.com/v2.12/";
    public $graph;
    public $user_data;
    public $is_debug;
    public function __construct($access_token, $debug = false)
    {
        $this->token = $access_token;
        $this->is_debug = $debug;
    }

    public function getUserData()
    {
        if (!isset($this->user_data)) {
            $data = file_get_contents($this->url . $this->sender . "/?fields=first_name,last_name,profile_pic&access_token=" . $this->token);
            $this->user_data = json_decode($data, false);
        }
        return $this->user_data;
    }

    public function userize($text)
    {
        if (!strpos($text, "{{"))
            return $text;
        return preg_replace_callback("/\{\{(.[^\{]+)\}\}/", function ($matches) {
            if ($matches[1] == "first_name") {
                return $this->getUserData()->first_name;
            } else if ($matches[1] == "last_name") {
                return $this->getUserData()->last_name;
            }
            return "";
        }, $text);
    }

    public function sendText($text)
    {
        $text = $this->userize($text);
        $this->sendToFacebook(json_encode([
            "messaging_type" => 'RESPONSE',
            "recipient" => [
                "id" => $this->sender
            ],
            "message" => [
                "text" => $text
            ]
        ]));
    }

    public function typing()
    {
        $this->sendToFacebook(json_encode([
            "recipient" => [
                "id" => $this->sender
            ],
            "sender_action" => "typing_on"
        ]));
        sleep(1);
    }

    public function stopTyping()
    {
        $this->sendToFacebook(json_encode([
            "recipient" => [
                "id" => $this->sender
            ],
            "sender_action" => "typing_off"
        ]));
    }

    public function sendButtonTemplate($text, $buttons)
    {
        $text = $this->userize($text);
        $this->sendToFacebook(json_encode(
            [
                "messaging_type" => 'RESPONSE',
                "recipient" => [
                    "id" => $this->sender
                ],
                "message" => [
                    "attachment" => [
                        "type" => "template",
                        "payload" => [
                            "template_type" => "button",
                            "text" => $text,
                            "buttons" => json_decode($buttons)
                        ]
                    ]
                ]
            ]
        ));
    }

    public function sendImage($url)
    {
        $this->sendToFacebook(json_encode([
            "messaging_type" => 'RESPONSE',
            "recipient" => [
                "id" => $this->sender
            ],
            "message" => [
                "attachment" => [
                    "type" => "image",
                    "payload" => [
                        "url" => $url
                    ]
                ]
            ]
        ]));
    }

    public function sendToFacebook($content, $other = false, $method = "POST")
    {
        $options = [
            "http" => [
                "method" => $method,
                "content" => $content,
                "header" => "Content-Type: application/json\r\n"
            ]
        ];
        $context = stream_context_create($options);
        if ($other == false) {
            $api = "messages";
        } else {
            $api = $other;
        }
        $response = file_get_contents("{$this->url}me/{$api}?access_token={$this->token}", false, $context);
        if ($this->is_debug == true) {
            file_put_contents("requests.log", "
                <div class=\"outcoming\">
                    $response
                </div>
            ", FILE_APPEND | LOCK_EX);
        }
        return $response;
    }
}
?>