<?php

header('Access-Control-Allow-Origin: *');

session_start();

require 'twitteroauth/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

$CONSUMER_KEY = 'omHu0C1KXMXtOW6se9WEIgiA0';
$CONSUMER_SECRET = 'BCiPqZhVV3LXQzeOn4p4bKmwNJXCJGelW4Cfm7j8x508fcaAFc';
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
    }
} else if (!empty($_GET['oauth_verifier'])) {
    $link = mysqli_connect('localhost', 'id2777537_social_manager', 'm794ja!2Y5C!', 'id2777537_twitter_logins');
    if (!$link) {
        die('Server error');
    }

    $oauth = [];

    // Check if the oauth is populated
    if ($oauth_result = mysqli_query($link, 'SELECT * FROM oauth_tokens WHERE oauth_token = ' . $_GET['oauth_token'])) {
        $oauth = mysqli_fetch_array($oauth_result);
    }

    mysqli_query($link,
        'UPDATE oauth_tokens SET oauth_verifier=' . $_GET['oauth_verifier'] . ' WHERE oauth_token=' . $_GET['oauth_token']);

    //ogin($oauth['id']);
    print_r($_GET['oauth_token']);
}

function login($id)
{
    global $CONSUMER_KEY, $CONSUMER_SECRET, $OAUTH_CALLBACK;

    $link = mysqli_connect('localhost', 'id2777537_social_manager', 'm794ja!2Y5C!', 'id2777537_twitter_logins') or die("Error");

    $oauth = [];

    // Check if the oauth is populated
    if ($oauth_result = mysqli_query($link, 'SELECT * FROM oauth_tokens WHERE id = ' . $id)) {
        $oauth = mysqli_fetch_array($oauth_result);
    }

    // If no oauth_token yet, generate a new one and store
    if (empty($oauth['oauth_token'])) {
        $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);
        $temporary_credentials = $connection->oauth('oauth/request_token', array('oauth_callback' => $OAUTH_CALLBACK));
        $sql = 'INSERT INTO oauth_tokens (id, oauth_token, oauth_token_secret) VALUES(' .
            $id . ', ' .
            $temporary_credentials['oauth_token'] . ', ' .
            $temporary_credentials['oauth_token_secret'] . ')';
        if (!mysqli_query($link, $sql)) {
            echo ("Error " . mysqli_connect_errno());
        }
        $url = $connection->url('oauth/authorize', array('oauth_token' => $temporary_credentials['oauth_token']));

        print_r($url);
    } else {
        $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);

        // Get access token
        $params = array('oauth_verifier' => $oauth['oauth_verifier'], 'oauth_token' => $oauth['oauth_token']);
        $access_token = $connection->oauth('oauth/access_token', $params);

        // Update tokens
        $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET,
            $access_token['oauth_token'], $access_token['oauth_token_secret']);
        $content = $connection->get('account/verify_credentials');

        mysqli_query($link,
            'UPDATE oauth_tokens SET' .
            'oauth_token=' . $access_token['oauth_token'] . ', ' .
            'oauth_token_secret=' . $access_token['oauth_token_secret'] . ', ' .
            ' WHERE id=' . $id);

        header('Location: https://juanferrer.github,io/social-manager?token=' . $access_token['oauth_access_token']);
    }
}
