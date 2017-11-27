var facebook = new Facebook();
var twitter = new Twitter();

function post(postContent) {
	facebook.login();
	facebook.post(postContent);
}
