$(document).ready(function(){
  // console.log('doc ready');

  loadFlipBook();

  $('.js-flip-btn').on('click touchend', function(e){
  	e.preventDefault();
  	$(this).hide();
  	$(".js-flip-book").turn('next');
  	$(this).fadeIn();
  });
	function loadFlipBook(){
		let w = $(window).width();
		let h = $(window).height();
		$('.js-flip-book').width(w).height(h);
		$(window).resize(function () {
			w = $(window).width();
			h = $(window).height();
			$('.js-flip-books').width(w).height(h);
		});
		if($(".js-flip-book").length){
			$(".js-flip-book").turn({
				width: w,
				height: h,
				autoCenter: true,
				display: 'single'
			});
		}
	}
});