/* globals FB, facebook , $*/

class Facebook {
	constructor() {
		this.userId = "";
		this.accessToken = "";
	}

	/**
	 * Trigger facebook login
	 */
	/*login() {
		FB.getLoginStatus(function (response) {
			if (response.status === "connected") {
				console.log("Logged in");
				loginCallback(response);
			}
			else {
				FB.login(loginCallback, {
					scope: "publish_actions",
					return_scopes: true
				});
			}
		});
	}*/

	login(callback) {
		FB.getLoginStatus(response => {
			if (response.status === "connected") {
				if (callback) callback(response);
				else loginCallback(response);
			}
			else {
				FB.login(response => {
					loginCallback(response);
					if (callback) callback(response);
				}, {
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
	post() {
		FB.api(`/${facebook.userId}/feed`, "post", { message: $("#publish-textarea").val(), access_token: facebook.accessToken });
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
