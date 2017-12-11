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
			var loginWindow = window.open("", "", "width=550, height=615");

			/*var timer = setInterval(() => {
				if (loginWindow.location.href.startsWith("https://juanferrer.github.io/social-manager")) {
					console.log(loginWindow.location.href);
					//twitter.accessToken = loginWindow.location.href.lastIndexOf();
					window.close();
					clearInterval(timer);
				}
			}, 500);*/

			loginWindow.location.href = r;
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
