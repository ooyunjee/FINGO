(function(global, $) {
  'use strict';

  var $caro = $('#main-box-office-carousel').fingoCarousel({
    'height': 530,
    'index': 2,
    'col': 5,
    'margin': 20
  });

  var $caro2 = $('#main-movie-ranking-carousel').fingoCarousel({
    'height': 690,
    'count': 5,
    'col': 5,
    'row': 2,
    'margin': 20,
    'infinite': false
  });

  var $caro3 = $('#main-new-movie-trailers-carousel').fingoCarousel({
    'height': 225,
    'count': 3,
    'col': 3,
    'margin': 20,
    'infinite': false
  });

  var $caro4 = $('#main-header-carousel').fingoCarousel({
    'width': 1640,
    'height': 850,
    'infinite': false
  });

  global.$caro = $caro;
  global.$caro2 = $caro2;
  global.$caro2 = $caro3;

  var main_movie_ranking_btn_group = document.querySelector('.main-movie-ranking-btn-group');
  var active_btns = main_movie_ranking_btn_group.querySelectorAll('button');

  active_btns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
      $(btn).radioClass('active');
    });
  });

  var tabpanels = document.querySelectorAll('.ui-carousel-tabpanel');

  tabpanels.forEach(function(tabpanel, index) {
    var tabpanel_btns = tabpanel.querySelectorAll('button');
    tabpanel_btns.forEach(function(btn, index) {

      if(index === 0) {
        btn.addEventListener('click', function(e) {
          if(e) { e.preventDefault(); }
          console.log('like');
        });
      } else if(index === 1) {
        btn.addEventListener('click', function(e) {
          if(e) { e.preventDefault(); }
          console.log('comment');
        });
      }
    });
  });
})(this, this.jQuery);
