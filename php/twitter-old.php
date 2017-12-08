<?php

header('Access-Control-Allow-Origin: *');

session_start();

require 'twitteroauth/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

$CONSUMER_KEY = '';
$CONSUMER_SECRET = '';
$OAUTH_CALLBACK = 'https://juanferrer.github.io/social-manager';

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
	global $OAUTH_CALLBACK;

	$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);

	$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => $OAUTH_CALLBACK));

	echo $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
}

function getAccessToken() {
	$request_token = [];
	$request_token['oauth_token'] = $_SESSION['oauth_token'];
	$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

	if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
		// Abort! Something is wrong.
	} else {
		$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);
		$access_token = $connection->oauth("oauth/access_token", ["oauth_verifier" => $_REQUEST['oauth_verifier']]);
	}
}

function post() {

}
?>
