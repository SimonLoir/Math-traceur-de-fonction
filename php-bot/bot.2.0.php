<?php

if (isset($_GET['hub_challenge'])) exit($_GET['hub_challenge']);

include "Class/bot.php";
include "access_token.php"; //$access_token

$input = file_get_contents('php://input');

$base_input = $input;

$bot = new bot($access_token);

if ($input == null) exit('still ok');

$input = json_decode($input)->entry[0]->messaging[0];

$is_echo = isset($input->message->is_echo);

$text = isset($input->message->text);

$is_payload = isset($input->postback);

$sender = $input->sender->id;

$bot->sender = $sender;

if (($text) && !$is_echo) {

    file_put_contents('test.txt', $input);

    if (!$text) {
        $message = $input->postback->payload;
    } else {
        $message = $input->message->text;
    }

    /*if ($sender != "2201055416586831") {
        $bot->sendText('Ce bot est en maintenance :-(');
        exit('Ce bot est en maintenance :-(');
    }*/

    $message = strtolower($message);

    $greetings = ["start", "salut", "bonjour", "hello"];

    $bot->typing();

    if (in_array($message, $greetings)) {
        $bot->sendText("Salut, je suis SMath, un bot capable de t'aider en math ;-) \nTu peux m'utiliser comme une simple calculatrice. Il te suffit d'écrire un calcul et tu obtiendras une réponse ;-)\n\nSi tu veux utiliser un vrai grapheur, va sur https://math.simonloir.be ;-)");
    } else if (strpos($message, "trace ") !== false) {
        $bot->sendText('Voici ce que je peux tracer pour toi : ');

        $bot->typing();
        ini_set('default_socket_timeout', 5);
        try {
            $bot->sendImage("https://simonloir-test.firebaseapp.com/app?draw=true&function=" . urlencode(str_replace('trace ', "", $message)));
        } catch (\Throwable $th) {
            $bot->sendText(json_encode($th));
        }
        $bot->sendText("La création de l'image peut prendre quelques secondes.");
        $bot->stopTyping();
    } else {
        $result = file_get_contents("https://simonloir-test.firebaseapp.com/app?compute&function=" . urlencode(str_replace('trace ', "", $message)));
        $bot->sendText("Voici le résulat que j'obtiens : " . $result);
    }
}
?>