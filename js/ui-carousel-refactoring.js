/*! ui-carousel-refactoring.js © heoyunjee, 2016 */
(function(global, $){
  'use strict';

  /**
   * width: carousel width
   * height: carousel height
   * margin: tabpanel margin
   * count: how many tabpanels will move when you click button
   * col: how many columns in carousel mask
   * row: how many rows in carousel mask
   * infinite: infinite carousel or not(true or false)
   * index: index of active tabpanel
   */
  // Default Options
  var defaults = {
    'width': 1240,
    'height': 390,
    'margin': 20,
    'count': 1,
    'col': 1,
    'row': 1,
    'infinite': true,
    'index': 0
  };

  // Constructor Function
  var Carousel = function(widget, options) {
    // Private
    // var settings = $.extend({}, defaults, options);

    // Public
    this.$widget = $(widget);
    this.settings = $.extend({}, defaults, options);

    // var settings = this.settings;
    this.carousel_infinite = this.settings.infinite;
    this.carousel_row = this.settings.row;

    this.setCarouselRatio(this.settings.width, this.settings.height);
    this.carousel_count                  = this.settings.count;
    this.carousel_col                  = this.settings.col;
    this.carousel_content_margin         = this.settings.margin;
    this.active_index                    = 0;
    this.carousel_one_tab_mask_width     = 0;
    this.carousel_content_width          = 0;
    this.carousel_content_height         = 0;

    this.$carousel                       = null;
    this.$carousel_headline              = null;
    this.$carousel_tablist               = null;
    this.$carousel_tabs                  = null;
    this.$carousel_button_group          = null;
    this.$carousel_mask                  = null;
    this.$carousel_tabpanels             = null;
    this.$carousel_tabpanel_content_imgs = null;

    this.i = -this.settings.index;

    // Priviliged(특권을 주는 것)
    // this.getSettings = function () {
    //   return settings;
    // };

    // 초기 설정
    this.init();
    // 이벤트 연결
    this.events();
  };

  // Carousel 객체가 공통으로 가지는 부분 정의
  // var carousel_ratio = null;

  // Prototype Object
  Carousel.prototype = {
    'init': function() {
      var $widget  = this.$widget;

      // 캐러셀 내부 구성 요소 참조
      this.$carousel          = $widget;
      this.$carousel_headline = this.$carousel.children(':header:first');
      this.$carousel_tablist  = this.$carousel.children('ul').wrap('<div/>').parent();
      this.$carousel_tabs     = this.$carousel_tablist.find('a');
      // figure
      this.$carousel_tabpanels = this.$carousel.children().last().children();
      console.log('tabpanel_contents', this.$carousel_tabpanels);
      this.$carousel_tabpanel_content_imgs = this.$carousel.children().last().find('img').not('.icon');

      this.carousel_content_width = this.$carousel_tabpanel_content_imgs.eq(0).width();
      this.carousel_content_height = this.$carousel_tabpanel_content_imgs.eq(0).height();

      this.$carousel_content = this.$carousel_tabpanels.children().parent();
      // console.log(this.$carousel_content.width());
      // console.log('content:', this.$carousel_content);

      // // 동적으로 캐러셀 구조 생성/추가
      this.createPrevNextButtons();
      this.createCarouselMask();
      // // 역할별 스타일링 되는 클래스 설정
      this.settingClass();
      this.settingSliding();
    },

    'getCarouselRatio': function () {
      return this.carousel_ratio;
    },

    'setCarouselRatio': function(w, h) {
      var settings = this.settings;
      w = w || settings.width;
      h = h || settings.height;
      this.carousel_ratio =  h / w;
    },

    'createPrevNextButtons': function() {
      var button_group = ['<div>',
        '<button type="button"></button>',
        '<button type="button"></button>',
      '</div>'].join('');
      this.$carousel_button_group = $(button_group).insertAfter( this.$carousel_tablist );
    },

    'createCarouselMask': function() {
      this.$carousel_tabpanels.parent().closest('div').wrap('<div/>');
      this.$carousel_mask = this.$carousel.children().last();
      // console.log('mask', this.$carousel_mask);
    },

    'settingClass': function() {
      this.$carousel.addClass('ui-carousel');
      this.$carousel_headline.addClass('ui-carousel-headline');
      this.$carousel_tablist.addClass('ui-carousel-tablist');
      this.$carousel_tabs.addClass('ui-carousel-tab');
      this.$carousel_button_group.addClass('ui-carousel-button-group');
      this.$carousel_button_group.children().first().addClass('ui-carousel-prev-button');
      this.$carousel_button_group.children().last().addClass('ui-carousel-next-button');
      this.$carousel_tabpanels.addClass('ui-carousel-tabpanel');
      this.$carousel_tabpanels.parent().closest('div').addClass('ui-carousel-tabpanel-wrapper');
      this.$carousel_tabpanels.parent().closest('div').parent().addClass('ui-carousel-mask');
      this.$carousel_tabpanel_content_imgs.addClass('ui-carousel-image');
    },

    'settingSliding': function() {
      var $carousel = this.$carousel;

      // var $tabpanel = $carousel.find('.ui-carousel-tabpanel');
      var $tabpanel = this.$carousel_tabpanels;
      var $tabpanel_wrapper = $tabpanel.parent();
      var $carousel_mask = this.$carousel_mask;
      var carousel_tabpannel_width = ($tabpanel_wrapper.width() - (this.carousel_col - 1) * this.carousel_content_margin) / this.carousel_col;

      console.log('carousel width', $carousel.width());
      console.log('count', this.settings.count);
      $carousel.height($carousel.width() * this.carousel_ratio );

      // Set carousel mask height
      $carousel_mask.height( $carousel.width() * this.carousel_ratio );

      // Set carousel tabpanel(div or img) size and margin
      // console.log('wrapper:', carousel_tabpannel_width);
      if(this.settings.col === 1) {
        $tabpanel
          .width($carousel.width())
          .height($carousel.height())
          .css('margin-right', this.carousel_content_margin);
        console.log('tabpanle widht:', $tabpanel.width());
        console.log('tabpanle height:', $tabpanel.height());
      }

      $tabpanel
        .width(carousel_tabpannel_width)
        .height(this.carousel_content_height)
        .css('margin-right', this.carousel_content_margin);

      // Set carousel one tab mask width
      this.carousel_one_tab_mask_width = ($tabpanel.width() + this.carousel_content_margin) * this.carousel_count - this.carousel_content_margin;
      // this.carousel_mask_width = $tabpanel.width() + this.carousel_content_margin;
      // console.log(this.carousel_mask_width);
      console.log('carousel mask', $carousel_mask.width());
      // console.log(this.$tabpanel);

      $tabpanel_wrapper.width(($tabpanel.width() + this.carousel_content_margin) * $tabpanel.length);


      // this.$carousel_tabpanels.last().parent().prepend(this.$carousel_tabpanels.eq($tabpanel.length));
      if(this.settings.index !== 0) {
        this.$carousel_tabpanels.last().parent().prepend(this.$carousel_tabpanels.eq($tabpanel.length - 1));
        this.$carousel_tabpanels.last().parent().prepend(this.$carousel_tabpanels.eq($tabpanel.length - 2));
      }
    },

    'events': function() {
      var widget    = this;
      var $carousel = widget.$carousel;
      var $tabs     = widget.$carousel_tabs;
      var $buttons  = widget.$carousel_button_group.children();

      // buttons event
      $buttons.on('click', function() {
        if ( this.className === 'ui-carousel-prev-button' ) {
          widget.prevPanel();
        } else {
          widget.nextPanel();
        }
      });

      // tabs event
      // $.each($tabs, function(index) {
      //   var $tab = $tabs.eq(index);
      //   $tab.on('click', $.proxy(widget.viewTabpanel, widget, index));
      // });
    },

    'nextPanel': function() {
      this.viewTabpanel(this.active_index + 1, this.i + 1, 'next');
    },

    'prevPanel': function() {
      this.viewTabpanel(this.active_index - 1, this.i - 1, 'prev');
    },

    'viewTabpanel': function(index, i, btn, e) {
      // 사용자가 클릭을 하는 행위가 발생하면 이벤트 객체를 받기 때문에
      // 조건 확인을 통해 브라우저의 기본 동작 차단
      if (e) { e.preventDefault(); }

      // 활성화된 인덱스를 사용자가 클릭한 인덱스로 변경
      this.active_index = index;
      this.i = i;

      var carousel_tabs_max = (this.$carousel_tabpanels.length / (this.carousel_col * this.carousel_row)) - 1;

      // 한 마스크 안에 패널이 다 채워지지 않을 경우
      if((this.$carousel_tabpanels.length % (this.carousel_col * this.carousel_row)) !== 0) {
        carousel_tabs_max = carousel_tabs_max + 1;
      }

      // 처음 또는 마지막 인덱스에 해당할 경우 마지막 또는 처음으로 변경하는 조건 처리
      if ( this.active_index < 0 ) {
        this.active_index = carousel_tabs_max;
      }
      if ( this.active_index > carousel_tabs_max ) {
        this.active_index = 0;
      }
      if ( this.i < 0 ) {
        this.i = carousel_tabs_max;
      }
      if ( this.i > carousel_tabs_max ) {
        this.i = 0;
      }

      // Infinite Carousel
      if(this.carousel_infinite === true) {
        // this.$carousel_tabpanels.last().parent() : wrapper
        // When you click next btn
        if(btn === 'next') {
          this.$carousel_tabpanels.last().parent().append(this.$carousel_tabpanels.eq(this.i - 1));
          // this.$carousel_tabpanels.eq(this.i).parent().stop().animate({
          //   'left': this.i * -this.carousel_one_tab_mask_width;
          // }, 600, 'easeOutExpo');
        }

        // When you click prev btn
        if(btn === 'prev') {
          this.$carousel_tabpanels.last().parent().prepend(this.$carousel_tabpanels.eq(this.i));
        }
      }

      if(this.carousel_infinite === false) {
        this.$carousel_tabpanels.eq(this.active_index).parent().stop().animate({
          'left': this.active_index * -this.carousel_one_tab_mask_width
        }, 600, 'easeOutExpo');
      }

      // index에 해당되는 탭패널 활성화
      this.$carousel_tabpanels.eq(this.active_index).radioClass('active');

      // 인디케이터 라디오클래스 활성화
      this.$carousel_tabs.eq(this.active_index).parent().radioClass('active');
    }
  };

  // jQuery Plugin
  $.fn.fingoCarousel = function(options){
    var $collection = this; // jQuery {}
    return $.each($collection, function(idx){
      var $this = $collection.eq(idx);
      // new Carousel( this, options ); // 컴포넌트 화
      var _instance = new Carousel( this, options ); // 컴포넌트 화
      // $.data(this, 'fingoCarousel', _instance);
      $this.data('fingoCarousel', _instance);
    });
  };

})(this, this.jQuery);
