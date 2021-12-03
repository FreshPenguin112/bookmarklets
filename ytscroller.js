function videoAnchor() {
	var miniplayer = document.getElementsByClassName("miniplayer")[0];
	if (miniplayer.parentElement.active) {
		return;
	}
	var player = document.getElementById("movie_player");
	var video = document.getElementsByTagName("video")[0];
	var control = document.getElementsByClassName("ytp-chrome-bottom")[0];
	var mastRect = document.getElementById("masthead-container").getBoundingClientRect();
	var theaterRect = document.querySelector("#player-container.ytd-watch-flexy").getBoundingClientRect();
	player.removeAttribute("style"); /* reset for theaterRect height */
	var playerRect = player.getBoundingClientRect();
	var videoRect = video.getBoundingClientRect();
	if (theaterRect.bottom < mastRect.height) {
		var comment = (
			document.getElementById("primary-inner") ||
			document.getElementById("primary")
		);
		var commentRect = comment.getBoundingClientRect();
		var widthRatio = (window.innerWidth - commentRect.right) / videoRect.width;
		var heightRatio = window.innerHeight / videoRect.height;
		player.style.position = "fixed";
		player.style.right = 0;
		player.style.top = mastRect.height + "px";
		player.style.width = videoRect.width + "px";
		player.style.height = videoRect.height + "px";
		player.style.transformOrigin = "right top";
		player.style.transform = "scale(" + Math.min(widthRatio, heightRatio) + ")";
		player.style.zIndex = 1500;
		control.style.left = "12px";
		control.style.width = (videoRect.width - 24) + "px";
		video.style.left = 0;
	}
	else {
		control.style.left = "12px";
		control.style.width = (playerRect.width - 24) + "px";
		video.style.left = (playerRect.width - videoRect.width) / 2 + "px";
	}
}
function scrollAnchor() {
	var x = window.scrollX;
	var y = window.scrollY;
	var t0;
	function scrollToXY(t1) {
		window.scrollTo(x, y);
		if (typeof t0 == "undefined") {
			t0 = t1;
		}
		if (t1 - t0 < 1) {
			requestAnimationFrame(scrollToXY);
		}
	}
	requestAnimationFrame(scrollToXY);
}
window.addEventListener("scroll", videoAnchor);
window.addEventListener("resize", videoAnchor);
window.addEventListener("mouseup", scrollAnchor);
