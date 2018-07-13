$(document).ready(function(){
  var _page = 1;
  var menu1 = 1,
      menu2 = 12,
      menu3 = 37,
      menu4 = 49;
  var maxPage = 55;
  var menuArray = [menu1, menu2, menu3, menu4];
  var submenuAry5 = [5, 6, 7, 8],
      submenuAry9 = [9, 10, 11],
      submenuAry14 = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      submenuAry27 = [27, 28],
      submenuAry29 = [29, 30, 31, 32],
      submenuAry33 = [33, 34, 35, 36],
      submenuAry38 = [38, 39, 40, 41, 42, 43, 44, 45, 46],
      submenuAry51 = [51, 54];

  

  
  var playingVideo = false;
  checkDevice();

  loadFlipBook();
  header();
  events();
  pageLink();
  
  function checkDevice(){
    var deviceInfo = device();
    $('html').addClass(deviceInfo);

  }
  function device(){
    var events = navigator.userAgent;

    if(events.indexOf('Android')>-1 || events.indexOf('Linux')>-1 || events.indexOf('Adr')>-1){
      return 'isAndroid';
    }else if(events.indexOf('iPhone')>-1){
      //根据尺寸进行判断 苹果的型号
      if(screen.height == 812 && screen.width == 375){
          return 'isIphoneX'
      }else if(screen.height == 736 && screen.width == 414){
          console.log("iPhone7P - iPhone8P - iPhone6");
      }else if(screen.height == 667 && screen.width == 375){
          console.log("iPhone7 - iPhone8 - iPhone6");
      }else if(screen.height == 568 && screen.width == 320){
          return 'isIphone5'
      }else{
          console.log("iPhone4");
      }
    }else if(events.indexOf('Windows Phone')>-1){
            // console.log("诺基亚手机");
            
    }else if(events.indexOf("iPad")>-1){
            // console.log("平板");
    }
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
					start: function () {
						$('.js-flip-btn').hide();
					},
					turning: function (e, page, view){
						$('.page-wrapper').removeClass('active');
						$('.page-wrapper[page="' + page + '"]').addClass('active');
					},
					turned: function (e, page, view) {
            _page = page;
						if (page == maxPage) {
							$('.js-flip-btn').hide();
						}else {
							$('.js-flip-btn').show();
						}
						$(".fancybox").fancybox({
							closeBtn: false,
							openEffect: 'elastic',
              autoWidth: false,
              minWidth: '100%',
              padding: 0,
              width: '100%',
              height: false,
							margin: 0,
							helpers : {
								overlay : {
									css : {
										'background' : 'rgba(255, 255, 255, 0.95)'
									}
								}
							},
							afterLoad: function(current, previous){
                $('.fancybox-wrap').after('<div class="fancybox-close"></div>');
								$('.fancybox-close').on('click touchend', function(e){
									$.fancybox.close();
                  $('.fancybox-close').remove();

								});
							}
						});

						$('.js-m-video').on('click touchend', function(e){
              playingVideo = true;
							const url = $(e.currentTarget).data('src');
							if(url !=='') {
								$('.m-video').attr('data-src', url);
								$('.m-video').trigger('click');
							}
              closeVideo();
						});

            updateMenu(page);
					}
				}
			});
		}
	}
  // 导航
  function header(){
    // click top menu
    $('.js-menu--top-menu--item').each(function(i, e){
      $(this).on('touchstart', function(){
        let _this = this;
        // let _n = $(this).attr('data-url').toString() - 1;
        // _page = menuArray[_n];
        // $('.js-flip-btn').show();
        // $(".js-flip-book").turn("page", _page);
        
        // $('.page-wrapper').removeClass('active');
        // $('.page-wrapper[page="' + _page + '"]').addClass('active');
        // updateMenu(_page);
        $('.js-submenu.active').slideUp(0).removeClass('active');
        setTimeout(function(){
          $(_this).next().slideDown(200).addClass('active');
        }, 200);
      });
    });

    // clicking submenu
    $('.js-submenu--item').each(function(i, e){
      $(this).on('touchstart', function(e){
        e.stopPropagation();
        let _this = this;
        let _n = $(this).attr('data-url').toString();
        _page = _n;
        // $('.js-submenu--item.active').removeClass('active');
        // $(this).addClass('active');
        $('.js-flip-btn').show();
        $('.js-flip-book').turn('page', _page);
        $('.page-wrapper').removeClass('active');
        $('.page-wrapper[page="' + _page + '"]').addClass('active');
        updateMenu(_n);
        $('.js-submenu.active').slideUp(0).removeClass('active');
      });
      
    });

    // close submenu
    $(document).on('touchstart', function(e){
      e.stopPropagation();
      if($(e.target).parents('.js-menu').length == 0){
        $('.js-submenu.active').slideUp(0).removeClass('active');
      }
    })
  }

  function events(){
    var startX;
    var endX;
    var distanceX;
    var moving = false;


     $('body').bind('touchstart',function(e){
        endX = 0;
        startX = 0;
        if(!$(e.target).hasClass('js-flip-btn') && !$(e.target).hasClass('fancybox-image') && !playingVideo){
          moving = true;
          startX = e.originalEvent.changedTouches[0].pageX;
        }
        else{
          moving = false;
        }
        // console.log(moving);

    });
    $("body").bind("touchmove",function(e){
        //获取滑动屏幕时的X,Y
        // console.log(e.originalEvent.changedTouches[0].pageX)
        if(moving){
          endX = e.originalEvent.changedTouches[0].pageX;
          //获取滑动距离
          distanceX = endX-startX;
          // distanceY = endY-startY;
          //判断滑动方向
        }
        
        
      });
    $('body').bind("touchend", function(e){
      // console.log("startX:" + startX);

      if(moving && endX!==0){
        if( distanceX>10){
            // console.log('往右滑动');
            $(".js-flip-book").turn('previous');
        }else if(distanceX<-10){
            // console.log('往左滑动');
            $(".js-flip-book").turn('next');
        }
      }
      
    });
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

  // 更新top menu状态
  function updateMenu(pageNumber){
    console.log(pageNumber);
    let n = pageNumber;
    // top menu
    $('.js-menu >ul >li').removeClass('active');
    if (n < menu2){
      $('.js-menu > ul > li:nth-of-type(1)').addClass('active');
    }
    else if (n >= menu2 && n < menu3){
      $('.js-menu > ul > li:nth-of-type(2)').addClass('active');
    }
    else if (n >= menu3 && n < menu4){
      $('.js-menu > ul > li:nth-of-type(3)').addClass('active');
    }
    else{
      $('.js-menu > ul > li:nth-of-type(4)').addClass('active');
    }

    // submenu
    $('.js-submenu--item.active').removeClass('active');
    // console.log(submenuAry13.indexOf(n)>=0);
    if(submenuAry5.indexOf(n)>=0){
      $('.js-submenu--item[data-url="5"]').addClass('active')
    }
    else if(submenuAry9.indexOf(n)>=0){
      $('.js-submenu--item[data-url="9"]').addClass('active')
    }
    else if(submenuAry14.indexOf(n)>=0){
      $('.js-submenu--item[data-url="14"]').addClass('active')
    }
    else if(submenuAry27.indexOf(n)>=0){
      $('.js-submenu--item[data-url="27"]').addClass('active')
    }
    else if(submenuAry29.indexOf(n)>=0){
      $('.js-submenu--item[data-url="29"]').addClass('active')
    }
    else if(submenuAry33.indexOf(n)>=0){
      $('.js-submenu--item[data-url="33"]').addClass('active')
    }
    else if(submenuAry38.indexOf(n)>=0){
      $('.js-submenu--item[data-url="38"]').addClass('active')
    }
    else if(submenuAry51.indexOf(n)>=0){
      $('.js-submenu--item[data-url="51"]').addClass('active')
    }
    
    else if(menuArray.indexOf(n)>=0){
      $('.js-submenu--item.active').removeClass('active')
    }
    else{
      $('.js-submenu--item[data-url="' + n + '"]').addClass('active')
    }


  }

  function closeVideo(){
    $(".video-close").on("click touchstart", function() {
      playingVideo = false;
    });
  }

  function pageLink(){
    $(document).on('click touchstart', '.js-has-link', function(){
      let n = $(this).attr('data-url');
      _page = n;
      $('.js-flip-book').turn('page', _page);
      $('.page-wrapper').removeClass('active');
      $('.page-wrapper[page="' + _page + '"]').addClass('active');
      updateMenu(_page);
    })
  }


});