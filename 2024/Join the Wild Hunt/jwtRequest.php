<?php

// For more information about JSON Web Tokens (JWTs), visit https://jwt.io/introduction

// create header as JSON
$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

// create payload as JSON
$payload = json_encode(['rank' => 'client']);

// encode the JSON header using Base64
$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

// encode the JSON payload using Base64
$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

// create the signature by hashing the encoded header and payload together
$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'dragon', true);

// encode the signature using Base64
$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

// append each section of the JWT together using periods ('.')
$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

//return the JWT to the client
echo $jwt;

?>