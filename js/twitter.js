/* globals $*/

class Twitter {
	constructor() {
		this.userId = "";
		this.accessToken = "";
	}

	/**
	 * Trigger facebook login
	 */
	login() {
		$.ajax({
			url: "https://diabolic-straps.000webhostapp.com/social-manager/twitter.php",
			data: { action: "login" },
			type: "POST"
		}).done(function (r) {
			window.location.href = r;
		});
	}

	/**
	 * Trigger facebook logout
	 */
	logout() {
	}

	/**
	 * Format and post message
	 * @param {post.js/post} postContent
	 */
	post(postContent) {
	}
}


/**
 * What to do when the login response comes back
 * @param {*} response
 */
function loginCallback(response) {
}
