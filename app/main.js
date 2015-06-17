window.addEventListener("touchmove", function(event) {
	// no more scrolling
	event.preventDefault();
}, false);
$(document).foundation();

$(document).ready(function(){
	$(window).trigger('resize');
});

$( window ).resize(function() {
	if ( $(window).width() > $(window).height()){
		$('#videoPanel').removeClass('small-12').addClass('small-7');
		$('#subtitlePanel').removeClass('small-12').addClass('small-5');
	}else{
		$('#videoPanel').removeClass('small-7').addClass('small-12');
		$('#subtitlePanel').removeClass('small-5').addClass('small-12');
	}
	setTimeout(function(){
		$('#subtitle').css('height', $('#video').height()-$('#rolePanel').height());
	},500);
	$('#subtitle').css('height', $('#video').height()-$('#rolePanel').height());
});