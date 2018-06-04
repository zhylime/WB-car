$(document).ready(function(){
  // console.log('doc ready');
  var _page = 1;
  var menu1 = 1,
      menu2 = 35,
      menu3 = 36;
  var menuArray = [1, 35, 36];
  var isX;

  checkIphoneX();
  loadFlipBook();
  header();
  events();
  function checkIphoneX(){
    isX = isIphoneX();
    if(isX){
      $('html').addClass('isIphoneX');
    }
  }
  function isIphoneX(){
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
  }
	function loadFlipBook(){
		let w = $(window).width();
		let h = $(window).height();
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
				display: 'single',
				when: {
					turning: function (e, page, view){
						$('.page-wrapper').removeClass('active');
						$('.page-wrapper[page="' + page + '"]').addClass('active');
					},
					turned: function (e, page, view) {
						if (page == 39) {
							$('.js-flip-btn').hide();
						}
						$(".fancybox").fancybox({
							closeEffect: 'none',
							closeBtn		: false,
							helpers : {
								overlay : {
									css : {
										'background' : 'rgba(0, 0, 0, 0.95)'
									}
								}
							}
						});
						$('.js-m-video').on('click touchend', function(e){
							const url = $(e.currentTarget).data('src');
							if(url !=='') {
								$('.m-video').attr('data-src', url);
								$('.m-video').trigger('click');
							}
						});
					}
				}
			});
		}
    updateMenu(_page)

	}
  function header(){
    $('header ul li a').each(function(){
      $(this).on('click touchend', function(){
        let _n = $(this).attr('data-url').toString() - 1;
        $('.js-flip-btn').show();
        $(".js-flip-book").turn("page", menuArray[_n]);
        _page = menuArray[_n];
        updateMenu(menuArray[_n]);

      });

    });
  }

  function events(){
    $('.js-flip-btn').on('click touchend', function(e){
      e.preventDefault();
      _page++;
      $(this).hide();
      $(".js-flip-book").turn('next');
      
      updateMenu(_page);
      if(_page !== 38){
        $(this).fadeIn();
      }
    });
  }

  function updateMenu(pageNumber){
    console.log(pageNumber);
    let n = pageNumber;
    $('header ul li').removeClass('active');
    if (n < menu2){
      $('header ul li:nth-of-type(1)').addClass('active');
    }
    else if (n == menu2){
      $('header ul li:nth-of-type(2)').addClass('active');
    }
    else{
      $('header ul li:nth-of-type(3)').addClass('active');
    }

  }

});