/* globals FB */

function triggerFacebookLogin() {
	FB.getLoginStatus(function (response) {
		if (response.status === "connected") {
			console.log("Logged in");
		}
		else {
			FB.login();
		}
	});
}
