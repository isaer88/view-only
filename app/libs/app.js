import $ from "jquery";

$(document).ready(function () {

  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) $('#top').fadeIn();
    else $('#top').fadeOut();
  });
  $('#top').click(function () {
    $('body, html').animate({scrollTop: 0}, 1000);
  });

  // Menu

  $('.menu-button').on('click', function () {
    $('.menu').toggleClass('active');
  });

  $('.menu ul li a').on('click', function () {
    $('.menu').removeClass('active');
  });


});
