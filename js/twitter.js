/* globals $, twitter*/

class Twitter {
	constructor() {
		this.userId = "";
		this.accessToken = "";
	}

	/**
	 * Trigger Twitter login
	 */
	login() {
		$.ajax({
			url: "https://diabolic-straps.000webhostapp.com/social-manager/twitter.php",
			data: { action: "login", id: "SOMETHING" },
			type: "POST"
		}).done(function (r) {
			window.location.href = r;
		});
	}

	/**
	 * Trigger Twitter logout
	 */
	logout() {
	}

	/**
	 * Format and post message
	 * @param {post.js/post} postContent
	 */
	post() {
		$.ajax({
			url: "https://diabolic-straps.000webhostapp.com/social-manager/twitter.php",
			data: { action: "post", id: "SOMETHING", message: $("#publish-textarea").val() },
			type: "POST"
		}).done(function (r) {
			console.log(r);
		});
	}
}
