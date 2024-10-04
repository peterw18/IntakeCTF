<?php

$data = json_decode(file_get_contents('php://input'), true);

$defaultHash = "5f57ade42369b0f65c02a10f4357b3d81b3f4c12e5902560ec907e7842a9ae5c";
$givenHash = hash('sha256', $data["name1"] . $data["name2"] . $data["name3"] . $data["name4"] . $data["name5"]);

$base64UrlComponents = explode('.', $data["jwt"]);

$base64UrlHeader = $base64UrlComponents[0];
$base64UrlPayload = $base64UrlComponents[1];
$base64UrlSignature = $base64UrlComponents[2];

$decodedHeader = base64_decode($base64UrlHeader);
$decodedPayload = base64_decode($base64UrlPayload);

$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'dragon', true);
$verifiedBase64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

if ((($base64UrlSignature == $verifiedBase64UrlSignature) && ($decodedPayload == '{"rank":"admin"}')) && ($givenHash != $defaultHash)){
    echo "Congratulations for getting on the leaderboard! The flag for this challenge is: <i>Intake24{V2lsZGUgSmFnZA==}</i>";
}elseif($givenHash == $defaultHash){
        echo "Sorry, the leaderboard has not changed...";
} elseif($base64UrlSignature != $verifiedBase64UrlSignature || $decodedPayload != '{"rank":"admin"}'){
    echo "Sorry, only admins are permitted to edit the leaderboard...";
} else {
    echo "Sorry, nope.";
}


?>