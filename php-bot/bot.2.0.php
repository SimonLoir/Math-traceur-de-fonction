<?php

if (isset($_GET['hub_challenge'])) exit($_GET['hub_challenge']);

include "Class/bot.php";
include "access_token.php"; //$access_token

$input = file_get_contents('php://input');

$bot = new bot($access_token);

if ($input == null) exit('still ok');

$input = json_decode($input)->entry[0]->messaging[0];

$is_echo = isset($input->message->is_echo);

$text = isset($input->message->text);

$is_payload = isset($input->postback);

$sender = $input->sender->id;

$bot->sender = $sender;

if (($text || $is_payload) && !$is_echo) {

    file_put_contents('test.txt', $input);

    if (!$text) {
        $message = $input->postback->payload;
    } else {
        $message = $input->message->text;
    }

    if ($sender != "2201055416586831") {
        $bot->sendText('Ce bot est en maintenance :-(');
        exit('Ce bot est en maintenance :-(');
    }

    $message = strtolower($message);

    $greetings = ["start", "salut", "bonjour", "hello"];

    if (in_array($message, $greetings)) {
        $bot->sendText("Salut, je suis SMath, un bot capable de t'aider en math ;-) \nVoici quelques fonctions utiles : \n\ntrace x²+6x+3 tracera la fonction x²+6x+3\nracines x²+6x+3 retournera les racines de la fonction x²+6x+3\npour x = 3 dans x²+6x+3 retournera f(3))");
    } else if (strpos($message, "trace ") !== false) {
        $result = file_get_contents("https://us-central1-simonloir-test.cloudfunctions.net/app?function=" . urlencode(str_replace('trace ', "", $message)));
        include "Class/image_builder.php";

        $x_result = json_decode($result, true);
        $sha1 = sha1($x_result["jsMath"]);

        $builder = new image_builder(null, $sha1 . ".png", $x_result);
        $x_result = $x_result["jsMath"];
        $builder->build($x_result);

        $bot->sendText('Voici ce que je peux tracer pour toi : ');
        $bot->sendImage('https://math.simonloir.be/php-bot/' . $sha1 . ".png");
    }
}


?>