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
			url: "http://diabolic-straps/social-manager/twitter.php"
		}).done(function (r) {
			console.log(r);
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
