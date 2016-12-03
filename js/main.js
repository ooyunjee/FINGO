(function(global, $) {
  'use strict';

  var header_carousel = {
    'height': {
      'desktop': 850,
      'tablet': 650,
      'mobile': 620
    },
    'count': 1
  };
  var main_box_office_carousel = {
    'count': 1,
    'index': {
      'desktop': 2,
      'tablet': 1,
      'mobile': 0
    }
  };
  var main_movie_ranking_carousel = {
    'count': {
      'desktop': 5,
      'tablet': 3,
      'mobile': 2
    }
  };

  var main_movie_trailers_carousel = {
    'count': {
      'desktop': 3,
      'tablet': 2,
      'mobile': 1
    }
  };


  if(global.innerWidth <= 750) {
    // Height
    header_carousel.height = header_carousel.height.mobile;
    // Count for Mobile
    main_movie_ranking_carousel.count = main_movie_ranking_carousel.count.mobile;
    main_movie_trailers_carousel.count = main_movie_trailers_carousel.count.mobile;
    // Index fot mobile
    main_box_office_carousel.index = main_box_office_carousel.index.mobile;
  } else if(global.innerWidth <= 1024) {
    // Height
    header_carousel.height = header_carousel.height.tablet;
    // Count
    main_movie_ranking_carousel.count = main_movie_ranking_carousel.count.tablet;
    main_movie_trailers_carousel.count = main_movie_trailers_carousel.count.tablet;
    // Index
    main_box_office_carousel.index = main_box_office_carousel.index.tablet;
  } else {
    // Height
    header_carousel.height = header_carousel.height.desktop;
    // Count
    main_movie_ranking_carousel.count = main_movie_ranking_carousel.count.desktop;
    main_movie_trailers_carousel.count = main_movie_trailers_carousel.count.desktop;
    // Index
    main_box_office_carousel.index = main_box_office_carousel.index.desktop;
  }

  var $caro4 = $('#main-header-carousel').fingoCarousel({
    'width': 1640,
    'height': header_carousel.height,
    'infinite': false
  });

  var $caro = $('#main-box-office-carousel').fingoCarousel({
    'height': 530,
    'index': main_box_office_carousel.index,
    'col': 5,
    'margin': 20
  });

  var $caro2 = $('#main-movie-ranking-carousel').fingoCarousel({
    'height': 690,
    'count': main_movie_ranking_carousel.count,
    'col': 5,
    'row': 2,
    'margin': 20,
    'infinite': false
  });

  var $caro3 = $('#main-new-movie-trailers-carousel').fingoCarousel({
    'height': 225,
    'count': main_movie_trailers_carousel.count,
    'col': 3,
    'margin': 20,
    'infinite': false
  });

  var main_movie_ranking_btn_group = document.querySelector('.main-movie-ranking-btn-group');
  var active_btns = main_movie_ranking_btn_group.querySelectorAll('button');

  active_btns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
      $(btn).radioClass('active');
    });
  });

  var tabpanels = document.querySelectorAll('.ui-carousel-tabpanel');
  var tabs = document.querySelectorAll('.ui-carousel-tab');

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

  // 인디케이터 기본 이벤트 차단
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      if(e) { e.preventDefault(); }
    });
  });

  var box_office_list = document.querySelector('.main-box-office-list');
  var box_office_list_btn = box_office_list.querySelector('button');
  var ul = box_office_list.querySelector('ul');

  console.log(box_office_list);
  console.log(box_office_list_btn);
  console.log(ul);

  var index = 1;
  var intervalID = null;
  var $ul = $(ul);



  box_office_list_btn.addEventListener('click', function() {
    box_office_list.classList.toggle('show');
    if(box_office_list.classList.contains('show')) {
      $ul.css('top', 0);
      clearInterval(intervalID);
      for(var i = 0, l = index - 1; i < l; i++) {
        $ul.prepend($ul.children().last());
      }
    } else if(!box_office_list.classList.contains('show')) {
      index = 1;
      intervalID = window.setInterval(rollingList, 2500);
    }
  });

  function rollingList() {
    var list_length = $ul.children().length;

    $ul.animate({
      'top': -45
    }, 600, function() {
      $(this).append($(this).children().first());
      $(this).css('top', 0);
      index++;
    });
  }

  if(!box_office_list.classList.contains('show')) {
    intervalID = window.setInterval(rollingList, 2500);
  }

})(this, this.jQuery);
