<?php
$body = file_get_contents("php://input");

require 'access_token.php';

try {

    $array = json_decode($body)->entry[0]->messaging[0];

    $is_echo = isset($array->message->is_echo);
    $text = isset($array->message->text);
    $sender = $array->sender->id;


    if ($text && !$is_echo) {
        $image = null;
        $command = $array->message->text;
        $greatings = ["hi", "salut", "coucou", "bonjour", "hello"];
        file_put_contents('x', strpos($command, "trace "));
        if (strpos($command, "trace ") !== false) {
            $result = file_get_contents("https://simonloir-test.firebaseapp.com/app?function=" . urlencode(str_replace('trace ', "", $command)));
            file_put_contents('test', $result);

            include "Class/image_builder.php";
            $x_result = json_decode($result, true);
            $funcs = [$x_result["jsMath"]];
            $p = $x_result["processed"];
            $sha1 = sha1($x_result["processed"]);
            $image = $sha1;
            $builder = new image_builder(null, $sha1 . ".png", $x_result);
            $x_result = $x_result["raw"];
            $builder->build($x_result);
            $text = "Voici ce que je peux tracer ;-)\nOuvrir dans smath : https://math.simonloir.be/public/drawer.html#" . urlencode(json_encode($funcs));
        } elseif (in_array(strtolower($command), $greatings)) {
            $text = "Salut, je suis SMath, un bot capable de t'aider en math ;-) \n Voici quelques fonctions utiles : \n\ntrace x²+6x+3 tracera la fonction x²+6x+3\nracines x²+6x+3 retournera les racines de la fonction x²+6x+3\npour x = 3 dans x²+6x+3 retournera f(3)";
        } else {
            $text = "Je n'ai pas compris votre requête :-(";
        }

        $options = [
            "http" => [
                "method" => "POST",
                "content" => json_encode([
                    "recipient" => [
                        "id" => $sender
                    ],
                    "message" => [
                        "text" => $text

                    ]
                ]),
                "header" => "Content-Type: application/json\r\n"
            ]
        ];

        $context = stream_context_create($options);

        file_get_contents("https://graph.facebook.com/v2.11/me/messages?access_token=$access_token", false, $context);
        if ($image != null) {
            $options = [
                "http" => [
                    "method" => "POST",
                    "content" => json_encode([
                        "recipient" => [
                            "id" => $sender
                        ],
                        "message" => [
                            "attachment" => [
                                "type" => "image",
                                "payload" => [
                                    "url" => "https://simonloir.be/smath-php/" . $image . ".png"
                                ]
                            ]
                        ]
                    ]),
                    "header" => "Content-Type: application/json\r\n"
                ]
            ];

            $context = stream_context_create($options);

            file_get_contents("https://graph.facebook.com/v2.11/me/messages?access_token=$access_token", false, $context);

        }
    } else {

    }
} catch (Exception $e) {
    file_put_contents('error', $e);
}

?>