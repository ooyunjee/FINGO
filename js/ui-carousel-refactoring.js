(function(global, $){
  'use strict';

  $.fn.radioClass = function(class_name) {
    this.siblings('.'+class_name).removeClass(class_name);
    this.addClass(class_name);
    return this;
  };

})(this, this.jQuery);
/*! ui-carousel-refactoring.js © heoyunjee, 2016 */
(function(global, $){
  'use strict';

  // Default Options
  var defaults = {
    'width': 1240,
    'height': 390,
    'margin': 20,
    'count': 1,
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
    this.carousel_content_margin         = this.settings.margin;
    this.active_index                    = this.settings.index;
    this.carousel_one_tab_mask_width     = 0;
    this.carousel_content_width          = 0;
    this.carousel_content_height         = 0;
    this.$carousel                       = null;
    this.$carousel_headline              = null;
    this.$carousel_tablist               = null;
    this.$carousel_tabs                  = null;
    this.$carousel_button_group          = null;
    this.$carousel_tabpanel_contents     = null;
    this.$carousel_tabpanel_content_imgs = null;

    this.i = 0;

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
      this.$carousel_tabpanel_contents = this.$carousel.children().last().children();
      this.$carousel_tabpanel_content_imgs = this.$carousel.children().last().find('img').not('.icon');

      this.carousel_content_width = this.$carousel_tabpanel_content_imgs.eq(0).width();
      this.carousel_content_height = this.$carousel_tabpanel_content_imgs.eq(0).height();

      // // 동적으로 캐러셀 구조 생성/추가
      this.createPrevNextButtons();
      this.createTabpanelWrapper();
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

    'createTabpanelWrapper': function() {
      this.$carousel_tabpanel_contents.parent().closest('div').wrap('<div/>');
    },

    'settingClass': function() {
      this.$carousel.addClass('ui-carousel');
      this.$carousel_headline.addClass('ui-carousel-headline');
      this.$carousel_tablist.addClass('ui-carousel-tablist');
      this.$carousel_tabs.addClass('ui-carousel-tab');
      this.$carousel_button_group.addClass('ui-carousel-button-group');
      this.$carousel_button_group.children().first().addClass('ui-carousel-prev-button');
      this.$carousel_button_group.children().last().addClass('ui-carousel-next-button');
      this.$carousel_tabpanel_contents.addClass('ui-carousel-tabpanel');
      this.$carousel_tabpanel_contents.parent().closest('div').addClass('ui-carousel-tabpanel-wrapper');
      this.$carousel_tabpanel_contents.parent().closest('div').parent().addClass('ui-carousel-mask');
      this.$carousel_tabpanel_content_imgs.addClass('ui-carousel-image');
    },

    'settingSliding': function() {
      var $carousel = this.$carousel;

      var $tabpanel = $carousel.find('.ui-carousel-tabpanel');
      var $tabpanel_wrapper = $tabpanel.parent();
      var $carousel_mask = $carousel.children().last();

      $carousel.height($carousel.width() * this.carousel_ratio );

      // Set carousel mask height
      $carousel_mask.height( $carousel.width() * this.carousel_ratio );

      // Set carousel tabpanel(div or img) size and margin
      $tabpanel
        .width(this.carousel_content_width)
        .height(this.carousel_content_height)
        .css('margin-right', this.carousel_content_margin);

      // Set carousel one tab mask width
      this.carousel_one_tab_mask_width = ($tabpanel.width() + this.carousel_content_margin) * this.carousel_count;
      console.log(this.carousel_one_tab_mask_width);
      $tabpanel_wrapper.width(this.carousel_one_tab_mask_width * $tabpanel.length );
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

      var carousel_tabs_max = (this.$carousel_tabpanel_contents.length / (this.carousel_count * this.carousel_row)) - 1;

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
        // When you click next btn
        if(btn === 'next') {
          this.$carousel_tabpanel_contents.last().parent().append(this.$carousel_tabpanel_contents.eq(this.i - 1));
        }

        // When you click prev btn
        if(btn === 'prev') {
          this.$carousel_tabpanel_contents.last().parent().prepend(this.$carousel_tabpanel_contents.eq(this.i));
        }
      }

      if(this.carousel_infinite === false) {
        this.$carousel_tabpanel_contents.eq(this.active_index).parent().stop().animate({
          'left': this.active_index * -this.carousel_one_tab_mask_width
        }, 600, 'easeOutExpo');
      }

      // index에 해당되는 탭패널 활성화
      this.$carousel_tabpanel_contents.eq(this.active_index).radioClass('active');

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
