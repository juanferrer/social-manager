<?php

header('Access-Control-Allow-Origin: *');

require 'twitteroauth/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

$CONSUMER_KEY = 'omHu0C1KXMXtOW6se9WEIgiA0';
$CONSUMER_SECRET = '';
$OAUTH_CALLBACK = 'https://juanferrer.github.io/social-manager';

$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);

if (!empty($_POST['action'])) {
	$action = $_POST['action'];

    switch($action) {
		case 'login':
			login();
			break;
	}
}


// Functions

function login() {
	global $connection, $OAUTH_CALLBACK;

	$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => $OAUTH_CALLBACK));

	echo $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
}

?>
