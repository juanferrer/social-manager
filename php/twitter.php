<?php

header('Access-Control-Allow-Origin: *');

session_start();

require 'twitteroauth/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

$CONSUMER_KEY = 'CONSUMER_KEY';
$CONSUMER_SECRET = 'CONSUMER_SECRET';

$SQL_SERVER = 'localhost';
$SQL_USER = 'id2777537_social_manager';
$SQL_PASSWORD = 'DB_PASSWORD';
$SQL_DATABASE = 'id2777537_twitter_logins';

$OAUTH_CALLBACK = 'https://diabolic-straps.000webhostapp.com/social-manager/twitter.php';

if (!empty($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'login':
            if (!empty($_POST['id'])) {
                login($_POST['id']);
            } else {
                die('No ID provided');
            }

            break;

        case 'post':
            post($_POST['id'], $_POST['message']);
            break;
    }
} else if (!empty($_GET['oauth_verifier'])) {
    $link = mysqli_connect($SQL_SERVER, $SQL_USER, $SQL_PASSWORD, $SQL_DATABASE);
    if (!$link) {
        die('Server error');
    }

    $oauth = [];

    // Check if the oauth is populated
    if ($oauth_result = mysqli_query($link, 'SELECT * FROM `oauth_tokens` WHERE `oauth_token` = "' . $_GET['oauth_token'] . '"')) {
        $oauth = mysqli_fetch_array($oauth_result);
    }

    mysqli_query($link,
        'UPDATE `oauth_tokens` SET `oauth_verifier`="' . $_GET['oauth_verifier'] . '" WHERE `oauth_token`="' . $_GET['oauth_token'] . '"');

    login($oauth['id']);
}

function login($id)
{
    global $CONSUMER_KEY, $CONSUMER_SECRET, $SQL_SERVER, $SQL_USER, $SQL_PASSWORD, $SQL_DATABASE, $OAUTH_CALLBACK;

    $link = mysqli_connect($SQL_SERVER, $SQL_USER, $SQL_PASSWORD, $SQL_DATABASE) or die("Error");

    $oauth = [];

    // Check if the oauth is populated
    if ($oauth_result = mysqli_query($link, 'SELECT * FROM `oauth_tokens` WHERE `id` = "' . $id . '"')) {
        $oauth = mysqli_fetch_array($oauth_result);
    }
    // If no oauth_token yet, generate a new one and store
    if (empty($oauth['oauth_token'])) {
        $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);
        $temporary_credentials = $connection->oauth('oauth/request_token', array('oauth_callback' => $OAUTH_CALLBACK));
        mysqli_query($link, 'INSERT INTO `oauth_tokens` (`id`, `oauth_token`, `oauth_token_secret`) VALUES ("' .
            $id . '", "' .
            $temporary_credentials['oauth_token'] . '", "' .
            $temporary_credentials['oauth_token_secret'] . '")');
        $url = $connection->url('oauth/authorize', array('oauth_token' => $temporary_credentials['oauth_token']));
        print_r($url);
    } else if (empty($oauth['user_id'])) {
        $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);
        // Get access token
        $params = array('oauth_verifier' => $oauth['oauth_verifier'], 'oauth_token' => $oauth['oauth_token']);
        $access_token = $connection->oauth('oauth/access_token', $params);

        mysqli_query($link,
            'UPDATE `oauth_tokens` SET' .
            '`oauth_token`="' . $access_token['oauth_token'] . '", ' .
            '`oauth_token_secret`="' . $access_token['oauth_token_secret'] . '", ' .
            '`user_id`="' . $access_token['user_id'] . '", ' .
            '`screen_name`="' . $access_token['screen_name'] . '", ' .
            '`x_auth_expires`="' . $access_token['x_auth_expires'] .
            '" WHERE `id`="' . $id . '"');

        // Update tokens
        $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET,
            $access_token['oauth_token'], $access_token['oauth_token_secret']);
        $user = $connection->get('account/verify_credentials');

        header_remove('Location');
        header('Location: https://juanferrer.github.io/social-manager');
    }
}

function post($id, $message)
{
    global $CONSUMER_KEY, $CONSUMER_SECRET, $SQL_SERVER, $SQL_USER, $SQL_PASSWORD, $SQL_DATABASE;

    $link = mysqli_connect($SQL_SERVER, $SQL_USER, $SQL_PASSWORD, $SQL_DATABASE) or die("Error");

    if ($query_result = mysqli_query($link, 'SELECT * FROM `oauth_tokens` WHERE `id` = "' . $id . '"')) {
        $access_token = mysqli_fetch_array($query_result);
    }

    $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET,
        $access_token['oauth_token'], $access_token['oauth_token_secret']);

    $status = $connection->post('statuses/update', ['status' => $message]);

    if ($status) {
        echo ("Tweet published");
    } else {
        echo ("Error. Tweet could not be published");
    }
}
