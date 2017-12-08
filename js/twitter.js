/* globals $*/

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
			data: { action: "login" },
			type: "POST"
		}).done(function (r) {
			var loginWindow = window.open("", "", "width=550, height=615");
			loginWindow.
			loginWindow.location.href = r;
			//window.location.href = r;
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
	post(postContent) {
	}
}
