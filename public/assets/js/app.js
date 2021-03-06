'use strict';

$(document).ready(function () {
  var _page = 1;
  var menu1 = 2,
      menu2 = 8,
      menu3 = 17,
      menu4 = 29;
  var maxPage = 37;
  var menuArray = [menu1, menu2, menu3, menu4];
  var submenuAry10 = [10, 11, 12, 13],
      submenuAry18 = [18, 19, 20, 21, 22, 23, 24, 25, 26];
  var sign;

  var playingVideo = false;
  checkDevice();

  loadFlipBook();
  header();
  events();
  pageLink();
  tabSwitch();
  // getAPI();


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
        return 'isIphone7P';
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
            if (page == maxPage) {
              $('.js-flip-btn').hide();
            } else {
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
              helpers: {
                overlay: {
                  css: {
                    'background': '#d0d0d0'
                  }
                }
              },
              afterLoad: function afterLoad(current, previous) {
                if ($(current.element).hasClass('js-no-return')) {} else {
                  $('.fancybox-wrap').after('<div class="fancybox-close"></div>');
                }

                $(document).on('click touchend', '.fancybox-close, .fancybox-overlay, .js-close', function (e) {
                  $.fancybox.close();
                  $('.fancybox-close').remove();
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
    // click top menu
    $('.js-menu--top-menu--item').each(function (i, e) {
      $(this).on('touchstart', function () {
        var _this = this;
        $('.js-submenu.active').slideUp(0).removeClass('active');
        setTimeout(function () {
          $(_this).next().slideDown(200).addClass('active');
        }, 200);
      });
    });

    // clicking submenu
    $('.js-submenu--item').each(function (i, e) {
      $(this).on('touchstart', function (e) {
        e.stopPropagation();
        var _this = this;
        var _n = $(this).attr('data-url').toString();
        _page = _n;
        $('.js-flip-btn').show();
        $('.js-flip-book').turn('page', _page);
        $('.page-wrapper').removeClass('active');
        $('.page-wrapper[page="' + _page + '"]').addClass('active');
        updateMenu(_n);
        $('.js-submenu.active').slideUp(0).removeClass('active');
      });
    });

    // close submenu
    $(document).on('touchstart', function (e) {
      e.stopPropagation();
      if ($(e.target).parents('.js-menu').length == 0) {
        $('.js-submenu.active').slideUp(0).removeClass('active');
      }
    });

    $('.js-go-page1').on('click', function (e) {
      e.stopPropagation();
      $('.js-flip-book').turn('page', 1);
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
    // top menu
    $('.js-menu >ul >li').removeClass('active');
    if (n < menu2) {
      $('.js-menu > ul > li:nth-of-type(1)').addClass('active');
    } else if (n >= menu2 && n < menu3) {
      $('.js-menu > ul > li:nth-of-type(2)').addClass('active');
    } else if (n >= menu3 && n < menu4) {
      $('.js-menu > ul > li:nth-of-type(3)').addClass('active');
    } else {
      $('.js-menu > ul > li:nth-of-type(4)').addClass('active');
    }

    // submenu
    $('.js-submenu--item.active').removeClass('active');
    if (submenuAry10.indexOf(n) >= 0) {
      $('.js-submenu--item[data-url="10"]').addClass('active');
    } else if (submenuAry18.indexOf(n) >= 0) {
      $('.js-submenu--item[data-url="19"]').addClass('active');
    } else if (menuArray.indexOf(n) >= 0) {
      $('.js-submenu--item.active').removeClass('active');
    } else {
      $('.js-submenu--item[data-url="' + n + '"]').addClass('active');
    }
  }

  function closeVideo() {
    $(".video-close").on("click touchstart", function () {
      playingVideo = false;
    });
  }

  function pageLink() {
    $(document).on('click touchend', '.js-has-link', function () {
      var n = $(this).attr('data-url');
      _page = n;

      $('.js-flip-book').turn('page', _page);
      $("#flipbook").turn("disable", true);
      $('.page-wrapper').removeClass('active');
      $('.page-wrapper[page="' + _page + '"]').addClass('active');
      updateMenu(_page);
    });
  }

  function tabSwitch() {
    $(document).on('touchstart', '.js-tab-control', function (e) {
      e.stopPropagation();
      var n = $(this).attr('tab-index');
      $('.js-tab-control').removeClass('active');
      $(this).addClass('active');
      $('.js-tab-content a').hide();
      $('.js-tab-content a[data-tab="' + n + '"]').show();
    });
  }
  function EncodeUtf8(s1) {
    var s = escape(s1);
    var sa = s.split("%");
    var retV = "";
    if (sa[0] != "") {
      retV = sa[0];
    }
    for (var i = 1; i < sa.length; i++) {
      if (sa[i].substring(0, 1) == "u") {
        retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
      } else retV += "%" + sa[i];
    }
    // retV.replace('/', '%2F');

    return retV;
  }
  function getAPI() {
    var _appKey = '43278dfjewo798djirf32dhie82ejfh8';
    // var _requestid = (new Date()).getTime();
    var _requestid = 1531982478190;
    var _secretKey = 'c89493ee0989a2cb84a575fb4cb472ea';
    var _path = '/api/getToken';
    var _sign = _path + '_appkey=' + _appKey + '_requestid=' + _requestid + '_' + _secretKey;
    var reg = /\//g;
    // console.log('tdata-bus/serviceA_ appkey=1234567890_ requestid =1519374074000_abcdefghijklmnopqrstuvwx');
    // _sign = str2utf8('tdata-bus/serviceA_appkey=1234567890_requestid=1519374074000_abcdefghijklmnopqrstuvwx');
    _sign = EncodeUtf8(_sign);
    // console.log("encodeUTF8:" + _sign.replace(reg, 
    //   '%2F'));
    _sign = $.md5(_sign.replace(reg, '%2F'));
    // console.log('http://cm.cmp.borgward.com.cn/portal/api/getToken?appkey=' + _appKey + '&sign=' + _sign + '&requestid=' + _requestid + '&interfaceType=APP')
    // console.log("md5: " + _sign);
    $.ajax({
      url: 'http://cm.cmp.borgward.com.cn/portal/api/getToken?appkey=' + _appKey + '&sign=' + _sign + '&requestid=' + _requestid + '&interfaceType=APP',
      type: 'POST',
      dataType: 'json',
      contentType: "application/json",
      success: function success(data) {
        // console.log(data)
        wx.config({
          debug: true,
          appId: _appKey,
          timestamp: _requestid,
          nonceStr: _sign
        });
      },
      error: function error(data) {
        console.log(data.responseText);
      }
    });
  }
});