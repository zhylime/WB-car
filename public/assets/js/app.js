'use strict';

$(document).ready(function () {
  var _page = 1;
  var menu1 = 1,
      menu2 = 35,
      menu3 = 36;
  var menuArray = [1, 35, 36];

  var playingVideo = false;
  checkDevice();

  loadFlipBook();
  header();
  events();

  function checkDevice() {
    var deviceInfo = device();
    $('html').addClass(deviceInfo);
  }
  function device() {
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
            _page = page;
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
              margin: 0,
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
              playingVideo = true;
              var url = $(e.currentTarget).data('src');
              if (url !== '') {
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
  function header() {
    $('header ul li a').each(function (i, e) {
      $(this).on('touchstart', function () {
        var _this = this;
        // let _n = $(this).attr('data-url').toString() - 1;
        // _page = menuArray[_n];
        // $('.js-flip-btn').show();
        // $(".js-flip-book").turn("page", _page);

        // $('.page-wrapper').removeClass('active');
        // $('.page-wrapper[page="' + _page + '"]').addClass('active');
        // updateMenu(_page);
        // submenu
        $('.js-submenu.active').slideUp(0).removeClass('active');
        setTimeout(function () {
          $(_this).next().slideDown(200).addClass('active');
        }, 200);
      });
    });

    $(document).on('touchstart', function (e) {
      e.stopPropagation();
      if ($(e.target).parents('.js-menu').length == 0) {
        $('.js-submenu.active').slideUp(0).removeClass('active');
      }
    });
  }

  function events() {
    var startX;
    var endX;
    var distanceX;
    var moving = false;

    $('body').bind('touchstart', function (e) {
      endX = 0;
      startX = 0;
      if (!$(e.target).hasClass('js-flip-btn') && !$(e.target).hasClass('fancybox-image') && !playingVideo) {
        moving = true;
        startX = e.originalEvent.changedTouches[0].pageX;
      } else {
        moving = false;
      }
      // console.log(moving);
    });
    $("body").bind("touchmove", function (e) {
      //获取滑动屏幕时的X,Y
      // console.log(e.originalEvent.changedTouches[0].pageX)
      if (moving) {
        endX = e.originalEvent.changedTouches[0].pageX;
        //获取滑动距离
        distanceX = endX - startX;
        // distanceY = endY-startY;
        //判断滑动方向
      }
    });
    $('body').bind("touchend", function (e) {
      // console.log("startX:" + startX);

      if (moving && endX !== 0) {
        if (distanceX > 10) {
          // console.log('往右滑动');
          $(".js-flip-book").turn('previous');
        } else if (distanceX < -10) {
          // console.log('往左滑动');
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

  // 更新top menu状态
  function updateMenu(pageNumber) {
    console.log(pageNumber);
    var n = pageNumber;
    $('.js-menu >ul >li').removeClass('active');
    if (n < menu2) {
      $('.js-menu > ul > li:nth-of-type(1)').addClass('active');
    } else if (n == menu2) {
      $('.js-menu > ul > li:nth-of-type(2)').addClass('active');
    } else {
      $('.js-menu > ul > li:nth-of-type(3)').addClass('active');
    }
  }

  function closeVideo() {
    $(".video-close").on("click touchstart", function () {
      playingVideo = false;
    });
  }
});