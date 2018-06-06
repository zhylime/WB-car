'use strict';

$(document).ready(function () {
  // console.log('doc ready');
  var _page = 1;
  var menu1 = 1,
      menu2 = 35,
      menu3 = 36;
  var menuArray = [1, 35, 36];

  checkIphoneX();
  loadFlipBook();
  header();
  events();
  function checkDevice() {
    var events = navigator.userAgent;

    if (events.indexOf('Android') > -1 || events.indexOf('Linux') > -1 || events.indexOf('Adr') > -1) {
      return 'isAndroid';
    } else if (events.indexOf('iPhone') > -1) {
      //根据尺寸进行判断 苹果的型号
      if (screen.height == 812 && screen.width == 375) {
        return 'isIphoneX';
      } else if (screen.height == 736 && screen.width == 414) {
        console.log("iPhone7P - iPhone8P - iPhone6");
      } else if (screen.height == 667 && screen.width == 375) {
        console.log("iPhone7 - iPhone8 - iPhone6");
      } else if (screen.height == 568 && screen.width == 320) {
        return 'isIphone5';
      } else {
        console.log("iPhone4");
      }
    } else if (events.indexOf('Windows Phone') > -1) {
      // console.log("诺基亚手机");

    } else if (events.indexOf("iPad") > -1) {
      // console.log("平板");
    }
  }
  function checkIphoneX() {
    // isX = isIphoneX();
    var device = checkDevice();
    $('html').addClass(device);
    // if(isX){
    //   $('html').addClass('isIphoneX');
    // }
  }
  // function isIphoneX(){
  //   return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
  // }
  function loadFlipBook() {
    var w = $(window).width();
    var h = $(window).height();
    $(window).resize(function () {
      w = $(window).width();
      h = $(window).height();
      $('.js-flip-books').width(w).height(h);
    });
    if ($(".js-flip-book").length) {
      $(".js-flip-book").turn({
        width: w,
        height: h,
        autoCenter: true,
        display: 'single',
        when: {
          start: function start() {
            $('.js-flip-btn').hide();
          },
          turning: function turning(e, page, view) {
            $('.page-wrapper').removeClass('active');
            $('.page-wrapper[page="' + page + '"]').addClass('active');
          },
          turned: function turned(e, page, view) {
            if (page == 38) {
              $('.js-flip-btn').hide();
            } else {
              $('.js-flip-btn').show();
            }
            $(".fancybox").fancybox({
              closeBtn: false,
              openEffect: 'elastic',
              width: 'auto',
              height: false,
              helpers: {
                overlay: {
                  css: {
                    'background': 'rgba(255, 255, 255, 0.95)'
                  }
                }
              },
              afterLoad: function afterLoad(current, previous) {
                $('.fancybox-wrap').on('click touchend', function (e) {
                  $.fancybox.close();
                });
              }
            });

            $('.js-m-video').on('click touchend', function (e) {
              var url = $(e.currentTarget).data('src');
              if (url !== '') {
                $('.m-video').attr('data-src', url);
                $('.m-video').trigger('click');
              }
            });

            updateMenu(page);
          }
        }
      });
    }
  }
  function header() {
    $('header ul li a').each(function () {
      $(this).on('click touchend', function () {
        var _n = $(this).attr('data-url').toString() - 1;
        _page = menuArray[_n];
        $('.js-flip-btn').show();
        $(".js-flip-book").turn("page", _page);

        $('.page-wrapper').removeClass('active');
        $('.page-wrapper[page="' + _page + '"]').addClass('active');
        updateMenu(_page);
      });
    });
  }

  function events() {
    // $('body').on('swipeleft', function(){
    //   $('.js-flip-book').turn('next');

    // });
    // $('body').on('swiperight', function(){
    //   $(".js-flip-book").turn('previous');
    // });
    var startX;
    var endX;
    var distanceX;
    var moving = false;
    $('body').bind('touchstart', function (e) {
      // console.log(e.target);
      if (!$(e.target).hasClass('js-flip-btn')) {
        moving = true;
        startX = e.originalEvent.changedTouches[0].pageX;
      } else {
        moving = false;
      }
    });
    $("body").bind("touchmove", function (e) {
      //获取滑动屏幕时的X,Y
      if (moving) {
        endX = e.originalEvent.changedTouches[0].pageX;
        //获取滑动距离
        distanceX = endX - startX;
        // distanceY = endY-startY;
        //判断滑动方向
      }
    });
    $('body').bind("touchend", function (e) {
      if (moving) {
        if (distanceX > 0) {
          console.log('往右滑动');
          $(".js-flip-book").turn('previous');
        } else if (distanceX < 0) {
          console.log('往左滑动');
          $(".js-flip-book").turn('next');
        }
      }
    });
    $('.js-flip-btn').on('click touchend', function (e) {
      e.preventDefault();
      _page++;
      $(this).hide();
      $(".js-flip-book").turn('next');

      updateMenu(_page);
      if (_page !== 38) {
        $(this).fadeIn();
      }
    });
  }

  function updateMenu(pageNumber) {
    console.log(pageNumber);
    var n = pageNumber;
    $('header ul li').removeClass('active');
    if (n < menu2) {
      $('header ul li:nth-of-type(1)').addClass('active');
    } else if (n == menu2) {
      $('header ul li:nth-of-type(2)').addClass('active');
    } else {
      $('header ul li:nth-of-type(3)').addClass('active');
    }
  }
});