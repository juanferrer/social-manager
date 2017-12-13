/* globals $, feather, Facebook, Twitter, Fingerprint2*/

var facebook = new Facebook();
var twitter = new Twitter();
var fingerprint = "";

feather.replace();
new Fingerprint2().get(function (result) {
	fingerprint = result;
});

var facebookWaiter = setInterval(() => {
	if (FB) {
		updateLoginButtons();
		clearInterval(facebookWaiter);
	}
}, 500);

/* Event handlers */

$("#right-button").click(() => {
	changeScreen();
});

$("#left-button").click(() => {
	changeScreen();
});

$("#facebook-button").click(() => {
	if (facebook.isLoggedIn()) {
		facebook.logout();
	} else {
		facebook.login();
	}
});

$("#twitter-button").click(() => {
	if (twitter.isLoggedIn()) {
		twitter.logout();
	} else {
		twitter.login();
	}
});

$("#instagram-button").click(() => {

});

$("#publish-button").click(() => {
	post();
});

/* Functions */

function changeScreen() {
	var toLogin = $("#login-screen").parent().css("z-index") === "0";
	if (toLogin) {
		$("#publish-screen").css("opacity", "0");
		$("#publish-screen").css("transform", "translate(-10px)");
	} else {
		$("#login-screen").css("opacity", "0");
		$("#login-screen").css("transform", "translate(10px)");
	}

	setTimeout((toLogin) => {

		$("#login-screen").parent().css("z-index", toLogin ? 1 : 0);
		$("#publish-screen").parent().css("z-index", toLogin ? 0 : 1);

		$("#login-screen").css("transform", "translate(0px)");
		$("#publish-screen").css("transform", "translate(0px)");
		setTimeout(() => {
			$("#login-screen").css("opacity", "1");
			$("#publish-screen").css("opacity", "1");
		}, 300);

	}, 300, toLogin);
}

function postAnimation() {
	$("#publish-screen").addClass("trigger-publish-animation");
	setTimeout(() => {
		$("#publish-textarea").val("");
		setTimeout(() => {
			$("#publish-screen").removeClass("trigger-publish-animation");
		}, 400);
	}, 400);
}

function post() {
	if ($("#facebook-check-box")[0].checked) {
		facebook.login(facebook.post);
	}
	if ($("#twitter-check-box")[0].checked) {
		twitter.post();
	}
	postAnimation();
}

function getFingerprint() {
	return fingerprint;
}

function updateLoginButtons() {
	facebook.updateCheckStatus();

	twitter.updateCheckStatus();
}
