'use strict';

$(document).ready(function () {
  // console.log('doc ready');
  var _page = 1;
  var menu1 = 1,
      menu2 = 35,
      menu3 = 36;

  loadFlipBook();

  $('.js-flip-btn').on('click touchend', function (e) {
    e.preventDefault();
    _page++;
    $('.page-wrapper').removeClass('active');
    $('.page-wrapper[page="' + _page + '"]').addClass('active');
    $(this).hide();
    $(".js-flip-book").turn('next');
    $(this).fadeIn();
    updateMenu(_page);
  });

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
        display: 'single'
      });
    }
    $('.page-wrapper[page="' + _page + '"]').addClass('active');
    updateMenu(_page);
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