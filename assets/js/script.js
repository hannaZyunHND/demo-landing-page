
(function ($) {
  "use strict";
  
  // mobile menu js
  function mobileMenu() {
    if ($(".mobileMenu").length && $("#mb_menu_holder").length) {
      const mb_menuUL = $('.section-header__main-menu').html();
      const mb_menu_holder = $('#mb_menu_holder');
      if ($(window).width() <= 991) {
        mb_menu_holder.html(mb_menuUL);
      }
    }

    $('.mobileMenu li').each(function(index, item){
      let selfThis = (this)
      if ($(item).find('ul').length) {
        $(item).addClass('dropdown-arrow');
      }

      $(item).on('click', function(e) {
        e.stopPropagation();

        if ($(this).hasClass('dropdown-arrow')) {
          $('.mobileMenu li').not(this).find('ul').slideUp(300);

          $(this).children('ul').slideToggle(300);

          if(!$(this).hasClass('openUL')) {
            $(this).siblings().removeClass('openUL');
            $(this).addClass('openUL');
          }else {
            $(this).removeClass('openUL');
          }

          // For nested submenus
          $(this).find('ul li').each(function(index, subItem) {
            $(subItem).off('click').on('click', function(e) {
              e.stopPropagation();

              if ($(subItem).hasClass('dropdown-arrow')) {
                $(subItem).siblings().find('ul').slideUp(300);
                $(subItem).children('ul').slideToggle(300);

                if(!$(this).hasClass('openUL')) {
                  $(this).siblings().removeClass('openUL');
                  $(this).addClass('openUL');
                }else {
                  $(this).removeClass('openUL');
                }
              }
            });
          });
        }
      });
    }); 
  }

  // owl slider
  let vivifyOwlCarousel = $(".vivify-owl__carousel");
  if (vivifyOwlCarousel.length) {
    vivifyOwlCarousel.each(function () {
      let elm = $(this);
      let options = elm.data("owl-options");
      elm.owlCarousel(
        "object" === typeof options ? options : JSON.parse(options)
      );
      elm.on('changed.owl.carousel', function(event){
        carouselTabFun();
      });
    });
  }

  // thumb owl carousel js like tab 
  function carouselTabFun(){
    let heroOneOwl = $('#hero-one-owl');
    if (heroOneOwl.length) {
      heroOneOwl.owlCarousel();
      let carouselTab = $('.vivify-vertical-carousel__item');
      let i = 0;
      let tab = '#tab';
      for (i; i <= carouselTab.length; i++) {
        (function(j) {
          $(tab + j).on("click", function() {
            heroOneOwl.trigger('to.owl.carousel', [j-1, 500, true]);
            $('.vivify-vertical-carousel__item').removeClass('activated');
            $(this).addClass('activated');
          });
        })(i);
      }
      $( "#tab1" ).addClass( "activated" );
    }
  }
  carouselTabFun();

  function verticalCarouselFun() {
    let verticalCarousel = $('.vivify-vertical-carousel-wrap');
    let sectionHeroMxWidth = $('.section-hero__itemwrap').width();
    let windWidth = ($(window).width() - sectionHeroMxWidth) / 2;
    if($(window).width() >= 1320) {
      verticalCarousel.css({
        "right": windWidth+"px"
      })
    }else {
      verticalCarousel.css({"right": 15+"px"})
    }
  }

  // swiper slider js
  function swiperSlider(){
    const swiperItems = document.querySelectorAll(".vivify-swiper__slider");
    swiperItems.forEach(function (swiperElm) {
      if (!swiperElm.dataset.swiperInitialized) {
        const swiperOptions = JSON.parse(swiperElm.dataset.swiperOptions);
        // Add additional callbacks here
        // swiperOptions.on = {
        //   slideChange: function() {}
        // };
        let SwiperSlider = new Swiper(swiperElm, swiperOptions);
        swiperElm.dataset.swiperInitialized = true;
      }      
    });
  }

  // dynamic-year js
  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }

  function loadMoreFunc(){
    let loadsItems = $(".load-more-item");
    $(loadsItems).slice(0, 6).show();
    let loadItemHeight = $(loadsItems).eq(1).height();
    $("body").on("click", ".load-more-btn", function (e) {
      e.preventDefault();
      $(".load-more-item:hidden").slice(0, 2).slideDown();
      if ($(".load-more-item:hidden").length == 0) {
        $(this).addClass("disable");
      }
      $("html,body").animate({
        scrollTop: $(this).offset().top - loadItemHeight
      }, 800);
    });
  }

  // progress bar js
  // if ($(".count-bar").length) {
  //   $(".count-bar").appear(
  //     function () {
  //       var el = $(this);
  //       var percent = el.data("percent");
  //       $(el).css("width", percent).addClass("counted");
  //     },
  //     {
  //       accY: -50
  //     }
  //   );
  // }

  // =======CounterUp JS-Odometer========>>>>>   
  // if ($('.odometer').length > 0) {
  //   let initialTop = 0;
  //   let windHT = window.screen.availHeight;
  //   let check = false;
  //   $(window).on("scroll", function () {
  //     check = true;
  //     var offTop = $(".odometer").offset().top - window.innerHeight;
  //     var scrollTop = jQuery(this).scrollTop();

  //     if (scrollTop > offTop) {
  //       setTimeout(function () {
  //         $('.odometer').each(function () {
  //           $(this).html($(this).data('count-to'));
  //         });
  //       }, 200);
  //       initialTop = 1;
  //     }
  //   });
  //   if(windHT) {
  //     if(check == true) {
  //       setTimeout(function () {
  //         $('.odometer').each(function () {
  //           $(this).html($(this).data('count-to'));
  //         });
  //       }, 200);
  //     }
  //   }
  // }

  // =======Counter text js========>>>>>
  if ($(".count-box").length) {
    $(".count-box").appear(function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
              countNum: n
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            }
          );
        }
      },
      {
        accY: 0
      }
    );
  }

  // =======Sticky-header========>>>>>
  if($(".section-header").length) {
    let headerSticky = $(".section-header");
    let headerHeight = headerSticky.height();
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if(scroll > 0) {
        $(headerSticky).addClass('header-sticky');
      }else {
        $(headerSticky).removeClass('header-sticky');
      }


      let sectionHeaderHeight = $('.section-header').height();
      let customStickyElements = $('.custom-sticky-elements');
      
      // Check if custom-sticky-elements exists
      if (customStickyElements.length > 0) {
        let customStickyElementsOffset = customStickyElements.offset().top - sectionHeaderHeight;

        let articleBlog = $('.section-article-single__content');
        let articleBlogHeight = articleBlog.height();
        let articleBlogOffset = articleBlog.offset().top + articleBlogHeight;

        if ((scroll > customStickyElementsOffset) && (scroll < articleBlogOffset)) {
          $(customStickyElements).addClass('custom-sticky');
          $('.section-article-single__social-inner').css({
            "top": sectionHeaderHeight + 50 +"px",
            "transition": "top 0.5s ease"
          });
        } else {
          $(customStickyElements).removeClass('custom-sticky');
        }
      }
    });
  }

  // menuicon js
  function menuicon() {
    $('.menu-icon').on('click', function(e) {
      e.preventDefault();
      $('.mobilenav-container').toggleClass('expanded');
      $('body').toggleClass('locked');
    });
  }

  // heroPadding js
  function heroPaddingFun() {
    const headerSec = $('.section-header');
    if($(headerSec).find('.top-bar').length > 0) {
      $('body').addClass('offcanvas-padding');
    }

    if(!$('.section-hero').hasClass("")) {
      $('.section-hero').addClass('padding-top');
    }
  }

  // =======Magnific-PopUp========>>>>>  
  if ($('.image-link').length > 0) {
    $('.image-link').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find('img');
        }
      }
    });
  }

  // Video popup
  if ($('.video-popup-link').length > 0) {
    $('.video-popup-link').magnificPopup({
      disableOn: 200,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }
  // =======Magnific-PopUp========>>>>>

  // marquee js
  function marqueeFun() {
    if($('.marquee-parent').length) {
      let textItemWrap = jQuery('.marquee-parent');
      let textItem = jQuery('.marquee-clone');
      textItemWrap.each(function() {
        for (let i = 0; i < 5; i++) {
          jQuery(this).append(textItem.clone());
        }
      });
    }
  }
  // =========Leaflet map=========>>>>>
  if ($('#map').length > 0) {
    var map = L.map('map').setView([41.927559, -74.010277], 12);
    var locationsArray = [];
  
    function clickZoom(e) {
      map.setView(e.target.getLatLng(), 16);
    }
  
    $.each(NextMarketingLocations, function(index, location) {
      // Create Marker
      var marker = L.marker(location.markerPoint, {
        title: location.title,
        className: "marker-usa"  // Class for the marker
      }).addTo(map);
  
      // Bind Popup
      marker.bindPopup(`<div class="card card-map vivify-map-card"><div class="card-body">
      <h5 class="text-black mb-3">${location.title}</h5>
      <p class="mb-0 text-black fw-semibold">${location.subtitle}</p>
      <p class="mb-0 text-black contact-home">${location.address}</p>                          
      </div></div>`).on('click', clickZoom);
  
      // Store the location in the array
      locationsArray.push({ marker: marker, location: location });
    });
    
     // Handle external link clicks
    $('.btn-map-direction').on('click', function(e) {
      e.preventDefault();
      var markerTitle = $(this).data('title');
      
      // Find the marker in the array based on the title
      var selectedMarker = locationsArray.find(function(item) {
        return item.location.title === markerTitle;
      });

      // Open the popup for the selected marker
      if (selectedMarker) {
        selectedMarker.marker.openPopup();
        // Set the zoom level to 16
        map.setView(selectedMarker.marker.getLatLng(), 12);
      }
    });
  
    L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 26,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
    // Outside click event
    $(document).on('click', function(e) {
      var mapContainer = $('#map');
      var isClickInsideMap = mapContainer.has(e.target).length > 0 || mapContainer.is(e.target); 
    });
  }
  // =========Leaflet map=========>>>>>

  $('.section-header__right__themebg').each(function(){
    if($(this).parents('.section-header').find('.section-header__right__themebg').length){
      $('.section-header__right__themebg').addClass('show-themebg');
    }
  });

  function wowfunction() {
    new WOW().init();
  }

  $(document).on('submit', '#contactForm, #callRequestForm, #downloadForm',function(e) {
    e.preventDefault();

    var form = $(this);
    var formData = form.serialize();
    var responseDiv = form.find('.response');
    form.find('[type="submit"]').prop('disabled', true); 
    formData += '&id='+form.attr('id');
    responseDiv.html('<p>Working....</p>');
    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: formData,
      success: function(response) {
        var data = JSON.parse(response);
        if (data.error) {
          responseDiv.empty().html('<div class="alert alert-error">'+data.msg+'</div>');
          // You can add additional actions for success here
        } else {
          responseDiv.empty().html('<div class="alert alert-sucess">'+data.msg+'</div>');
          form.get(0).reset();
        }
        form.find('[type="submit"]').prop('disabled', false); 
      },
      error: function(error) {
        console.log('Error:', error);
        form.find('[type="submit"]').prop('disabled', false); 
      }
    });
  });
  
  $(window).on('load', function() {
    if ($(window).width() <= 991) {
      mobileMenu();
    }
    menuicon();
    wowfunction();
    heroPaddingFun();
    verticalCarouselFun();
    swiperSlider();
    loadMoreFunc();
    marqueeFun();

    $('.preloader').fadeOut(function () {
      $(this).addClass('loaded');
    });
  });

  $(window).on('scroll', function() {});
  
  $(window).on('resize', function() {
    if ($(window).width() <= 991) {
      mobileMenu();
    }else {
      $('.mobileMenu li').each(function(index, item){
        if ($(item).find('ul').length) {
          $(item).addClass('dropdown-arrow');
        }
      });
    }
    heroPaddingFun();
    verticalCarouselFun();
    loadMoreFunc();
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  // color mode sticky js
  const colorModeSticky = document.querySelector('.tpl-color-mode');
  if (colorModeSticky){
    function colorModeStickyFun() {
      if (window.scrollY > 400) {
        colorModeSticky.classList.add("show");
      } else {
        colorModeSticky.classList.remove("show");
      }
    }
    colorModeStickyFun();
    window.addEventListener("scroll", colorModeStickyFun);

    const scrollToTopElement = document.querySelector(".scroll-to-top");
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    scrollToTopElement.addEventListener("click", scrollToTop);
  }

  // themmode js
  function themeModeFun(){
    const btn = document.querySelectorAll(".themeModeBtn");
    btn.forEach((item) => {
      item.addEventListener("click", () => {
        const idCheck = item.getAttribute("data-id");
        if (idCheck === "light") {
          document.documentElement.setAttribute("data-bs-theme", "light");
          window.localStorage.setItem("theme", "light");
        } else {
          document.documentElement.setAttribute("data-bs-theme", "dark");
          window.localStorage.setItem("theme", "dark");
        }
      });
    });
  }
  themeModeFun();

  // img src path change js
  function srcPathFun(){
    let element = document.querySelector('.section-hero7__newsimg img');
    let imageItem = document.querySelectorAll('.vivify-vertical7-wrap__item');
    imageItem.forEach(function(item) {
      item.addEventListener("click", function(){
        let dataSrcValue = item.getAttribute('data-src');
        element.src = dataSrcValue;
      });
    });
  }
  srcPathFun();

// header sticky padding top js
  const navSelector = ".section-header";
  const navTopbarSelector = ".section-header .topbar";
  
  const navScrollClass = "scroll";  
  const navFixedTopClass = "fixed-top";  
  const topbarTooggleClass = "visually-hidden";

  if(document.querySelectorAll(navSelector).length > 0){
    navbarHeight = document.querySelector(navSelector).offsetHeight;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
          document.querySelector(navSelector).classList.add(navFixedTopClass, navScrollClass);
          if(document.querySelector(navTopbarSelector)){
            document.querySelector(navTopbarSelector).classList.add(topbarTooggleClass);
          }
          // add padding top to show content behind navbar
          document.querySelector(':root').style.setProperty('--investment-header-height', navbarHeight + 'px');

          if(document.querySelectorAll('.section-header__row').length > 0) {
            if(document.querySelector('body').querySelector('.section-header__row').classList.contains('header-blur')){
              document.querySelector(':root').style.setProperty('--investment-header-height', 0);
            }
          }
        } else {
          document.querySelector(navSelector).classList.remove(navFixedTopClass, navScrollClass);
          if(document.querySelector(navTopbarSelector)){
            document.querySelector(navTopbarSelector).classList.remove(topbarTooggleClass);
          }
          
          document.querySelector(':root').style.setProperty('--investment-header-height', 0);
        } 
    });
  }

  // book mark js
  function BookMarkFun(){
    let cardBookMark = document.querySelectorAll('.card-body__author__bookmark');
    cardBookMark.forEach(function(item){
      item.addEventListener("click", function(e){
        e.preventDefault;
        if(!item.classList.contains('marked')) {
          item.classList.add('marked');
        }else {
          item.classList.remove('marked');
        }
      });
    });
  }
  BookMarkFun();

  function PrevNextFun(){
    var centerItem = document.querySelector('.center-item');
    if (centerItem) {
      var prevAllDiv = [];
      var prevElement = centerItem.previousElementSibling;
      while (prevElement) {
        if (prevElement.tagName === 'DIV') {
          prevAllDiv.push(prevElement);
        }
        prevElement = prevElement.previousElementSibling;
      }

      prevAllDiv.forEach(function(prevElms) {
        prevElms.classList.add('prev-item');
      });

      var nextAllDiv = [];
      var nextElement = centerItem.nextElementSibling;
      while (nextElement) {
        if (nextElement.tagName === 'DIV') {
          nextAllDiv.push(nextElement);
        }
        nextElement = nextElement.nextElementSibling;
      }
      
      nextAllDiv.forEach(function(nextElms) {
        nextElms.classList.add('next-item');
      });
    }
  }
  PrevNextFun();
  window.addEventListener('resize', PrevNextFun);

  const searchTag = document.querySelectorAll('.popup-search__tag');
  if(searchTag){
    searchTag.forEach(function(item){
      item.addEventListener("click", function(e){
        e.preventDefault;
        item.remove();
      })
    });
  }
});