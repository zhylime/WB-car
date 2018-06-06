'use strict';

$(document).ready(function () {
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
  function checkIphoneX() {
    isX = isIphoneX();
    if (isX) {
      $('html').addClass('isIphoneX');
    }
  }
  function isIphoneX() {
    return (/iphone/gi.test(navigator.userAgent) && screen.height == 812 && screen.width == 375
    );
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
            $('.js-flip-btn').show();
            if (page == 38) {
              $('.js-flip-btn').hide();
            } else {
              $('.js-flip-btn').show();
            }
            $(".fancybox").fancybox({
              closeBtn: false,
              openEffect: 'elastic',
              width: false,
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
'use strict';

var weixin_jssdk_ops = {
    init: function init() {
        this.initJSconfig();
    },
    shareCbf: function shareCbf() {},
    friTitle: '宝沃品牌圣经',
    friDesc: '中国新造车势力X-Force',
    initJSconfig: function initJSconfig() {
        $.ajax({
            url: 'https://api.happy-share.cn/jssdk/?url=' + encodeURIComponent(location.href.split('#')[0]),
            type: 'GET',
            dataType: 'json',
            success: function success(data) {
                if (data.code == 200) {
                    var appId = data.data.appId;
                    var timestamp = data.data.timestamp;
                    var nonceStr = data.data.nonceStr;
                    var signature = data.data.signature;
                    wx.config({
                        debug: false,
                        appId: appId,
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        signature: signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    });
                    weixin_jssdk_ops.ready();
                    wx.error(function (res) {
                        //console.log(res);
                    });
                }
            }
        });
    },
    ready: function ready() {
        wx.ready(function () {
            var img = '../img/bw_logo.jpg';
            var link = window.location.href;

            wx.onMenuShareTimeline({
                title: weixin_jssdk_ops.friTitle,
                imgUrl: img,
                link: link,
                success: function success() {
                    weixin_jssdk_ops.shareCbf();
                },
                cancel: function cancel() {}
            });
            wx.onMenuShareAppMessage({
                title: weixin_jssdk_ops.friTitle,
                desc: weixin_jssdk_ops.friDesc,
                link: link,
                imgUrl: img,
                type: 'link',
                success: function success() {},
                cancel: function cancel() {}
            });
        });
    },
    hideMenuItems: function hideMenuItems() {
        wx.ready(function () {
            wx.hideAllNonBaseMenuItem();
        });
    }
};