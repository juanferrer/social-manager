/* globals FB, facebook */

class Facebook {
	constructor() {
		this.userId = "";
		this.accessToken = "";
	}

	/**
	 * Trigger facebook login
	 */
	login() {
		FB.getLoginStatus(function (response) {
			if (response.status === "connected") {
				console.log("Logged in");
			}
			else {
				FB.login(loginCallback, {
					scope: "publish_actions",
					return_scopes: true
				});
			}
		});
	}

	/**
	 * Trigger facebook logout
	 */
	logout() {
		FB.logout(function (response) {
			console.log(response);
		});
	}

	/**
	 * Format and post message
	 * @param {post.js/post} postContent
	 */
	post(postContent) {
		FB.api(`/${this.userId}/feed`, "post", { message: postContent.message, access_token: this.accessToken });
	}
}


/**
 * What to do when the login response comes back
 * @param {*} response
 */
function loginCallback(response) {
	console.log(response);
	facebook.userId = response.authResponse.userID || "";
	facebook.accessToken = response.authResponse.accessToken || "";
}
