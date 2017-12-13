/* globals $, getFingerprint*/

class Twitter {
	constructor() {
	}

	/**
	 * Trigger Twitter login
	 */
	login() {
		var twitterID = localStorage.getItem("twitterID") || getFingerprint();

		$.ajax({
			url: "https://diabolic-straps.000webhostapp.com/social-manager/twitter.php",
			data: { action: "login", id: twitterID },
			type: "POST"
		}).done(function (r) {
			localStorage.setItem("twitterID", twitterID);
			window.location.href = r;
		});
	}

	/**
	 * Trigger Twitter logout
	 */
	logout() {
		localStorage.removeItem("twitterID");
	}

	/**
	 * Format and post message
	 * @param {post.js/post} postContent
	 */
	post() {
		$.ajax({
			url: "https://diabolic-straps.000webhostapp.com/social-manager/twitter.php",
			data: { action: "post", id: localStorage.getItem("twitterID"), message: $("#publish-textarea").val() },
			type: "POST"
		}).done(function (r) {
			console.log(r);
		});
	}

	isLoggedIn() {
		return localStorage.getItem("twitterID");
	}

	updateCheckStatus() {
		if (this.isLoggedIn()) {
			$("#twitter-status-check").attr("src", "./img/status/check.svg");
		}
	}
}
