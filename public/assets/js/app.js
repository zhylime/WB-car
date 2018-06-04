'use strict';

$(document).ready(function () {
  // console.log('doc ready');
  var _page = 1;
  var menu1 = 1,
      menu2 = 35,
      menu3 = 36;
  var menuArray = [1, 35, 36];

  loadFlipBook();
  header();
  events();

  function loadFlipBook() {
    var w = $(window).width();
    var h = $(window).height();
    $('.js-flip-book').width(w).height(h);
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
          turning: function turning(e, page, view) {},
          turned: function turned(e, page, view) {
            $('.page-wrapper').removeClass('active');
            $('.page-wrapper[page="' + page + '"]').addClass('active');
            if (page == 39) {
              $('.js-flip-btn').hide();
            }
          }
        }
      });
    }
    updateMenu(_page);
  }

  function header() {
    $('header ul li a').each(function () {
      $(this).on('click touchend', function () {
        var _n = $(this).attr('data-url').toString() - 1;
        $(".js-flip-book").turn("page", menuArray[_n]);
        updateMenu(menuArray[_n]);
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