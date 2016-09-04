$(document).ready(function() {
		$('.post img').addClass('img-responsive');
});

// top
$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('.scroll-top').fadeIn(200);
	} else {
		$('.scroll-top').fadeOut(200);
	}
});
$('.scroll-top').bind('click', function(e) {
	e.preventDefault();
	$('body, html').animate({
		scrollTop: 0
		}, 200);
});
