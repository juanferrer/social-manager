/* globals FB, facebook $*/

class Facebook {
	constructor() {
		this.userId = "";
		this.accessToken = "";
	}

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
				}, { scope: "publish_actions", return_scopes: true });
			}
		});
	}

	/**
	 * Trigger facebook logout
	 */
	logout() {
		FB.logout(function (response) {
			facebook.userId = "";
			facebook.accessToken = "";
			console.log(response);
			facebook.updateCheckStatus();
		});
	}

	/**
	 * Format and post message
	 */
	post() {
		// Look for an URL and remove it
		const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
		let text = $("#publish-textarea").val();
		let message = text.replace(regex, "").trim();
		let link = text.match(regex) || [""];

		FB.api(`/${facebook.userId}/feed`, "post", {
			access_token: facebook.accessToken,
			message: message,
			link: link[0]
		});
	}

	isLoggedIn() {
		return this.userId !== "";
	}

	updateCheckStatus() {
		FB.getLoginStatus(response => {
			if (response.status === "connected") {
				$("#facebook-status-check").attr("src", "./img/status/check.svg");
			}/* else if (response.status === "unknown") {
				facebook.login(facebook.updateCheckStatus);
			}*/else {
				$("#facebook-status-check").attr("src", "./img/status/x.svg");
			}
		});
	}
}


/**
 * What to do when the login response comes back
 * @param {*} response
 */
function loginCallback(response) {
	facebook.userId = response.authResponse.userID || "";
	facebook.accessToken = response.authResponse.accessToken || "";
	facebook.updateCheckStatus();
}
