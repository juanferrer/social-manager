/* globals $, feather, Facebook, Twitter */

var facebook = new Facebook();
var twitter = new Twitter();

feather.replace();

/* Event handlers */

$("#right-button").click(() => {
	changeScreen();
});

$("#left-button").click(() => {
	changeScreen();
});

$("#facebook-button").click(() => {
	facebook.login();
});

$("#twitter-button").click(() => {

});

$("#instagram-button").click(() => {

});

$("#publish-button").click(() => {
	post($("#publish-textarea").val());
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

function post(postContent) {
	facebook.login();
	facebook.post(postContent);
}
