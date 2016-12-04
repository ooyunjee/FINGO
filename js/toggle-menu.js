(function (global) {

  $( ".main-menu-btn" ).on( "click", function() {
    console.log("main-on");
    $( ".main-menu" ).toggleClass("main-menu-active","main-menu-btn-active", 600 );
    $( ".main-menu-btn" ).toggleClass("main-menu-btn-active", 600 );
    
  });

})(this , jQuery.this);
