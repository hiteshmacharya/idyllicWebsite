/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function ($) {
    "use strict";

    /* global google: false */
    /*jshint -W018 */

    /*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

    var winDow = $(window);
    // Needed variables
    var $container = $('.iso-call');
    var $filter = $('.filter');

    try {
        $container.imagesLoaded(function () {
            $container.trigger('resize');
            $container.isotope({
                filter: '*',
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });

            $('.triggerAnimation').waypoint(function () {
                var animation = $(this).attr('data-animate');
                $(this).css('opacity', '');
                $(this).addClass("animated " + animation);

            },
                {
                    offset: '75%',
                    triggerOnce: true
                }
            );
            setTimeout(Resize, 1500);
        });
    } catch (err) {
    }

    winDow.bind('resize', function () {
        var selector = $filter.find('a.active').attr('data-filter');

        try {
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
        } catch (err) {
        }
        return false;
    });

    // Isotope Filter 
    $filter.find('a').click(function () {
        var selector = $(this).attr('data-filter');

        try {
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
        } catch (err) {

        }
        return false;
    });


    var filterItemA = $('.filter li a');

    filterItemA.on('click', function () {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            filterItemA.removeClass('active');
            $this.addClass('active');
        }
    });

    /*-------------------------------------------------*/
	/* =  browser detect
	/*-------------------------------------------------*/
    try {
        $.browserSelector();
        // Adds window smooth scroll on chrome.
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    }

    /*-------------------------------------------------*/
	/* =  scroll between sections
	/*-------------------------------------------------*/

    $('.navigate-section > li > a[href*=#]').click(function (event) {
        var $this = $(this);
        var offset = -70;
        $.scrollTo($this.attr('href'), 650, { easing: 'swing', offset: offset, 'axis': 'y' });
        event.preventDefault();
    });

    /*-------------------------------------------------*/
	/* =  add active state in menu for active section
	/*-------------------------------------------------*/

    $('section').each(function () {
        $(this).waypoint(function (direction) {
            if (direction === 'down') {
                var containerID = $(this).attr('id');
                /* update navigation */
                $('.navigate-section > li > a').removeClass('active');
                $('.navigate-section > li > a[href*=#' + containerID + ']').addClass('active');
            }
        }, { offset: '70px' });

        $(this).waypoint(function (direction) {
            if (direction === 'up') {
                var containerID = $(this).attr('id');
                /* update navigation */
                $('.navigate-section > li > a').removeClass('active');
                $('.navigate-section > li > a[href*=#' + containerID + ']').addClass('active');
            }
        }, { offset: function () { return -$(this).height() - 70; } });
    });

    /*-------------------------------------------------*/
	/* =  Search animation
	/*-------------------------------------------------*/

    var searchToggle = $('.open-search'),
        inputAnime = $(".form-search"),
        body = $('body');

    searchToggle.on('click', function (event) {
        event.preventDefault();

        if (!inputAnime.hasClass('active')) {
            inputAnime.addClass('active');
        } else {
            inputAnime.removeClass('active');
        }
    });

    body.on('click', function () {
        inputAnime.removeClass('active');
    });

    var elemBinds = $('.open-search, .form-search');
    elemBinds.bind('click', function (e) {
        e.stopPropagation();
    });

    /*-------------------------------------------------*/
	/* =  fullwidth carousell
	/*-------------------------------------------------*/
    try {
        var owl = $("#owl-demo")
        owl.owlCarousel({
            autoPlay: 10000,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2]
        });
        // Custom Navigation Events
        $(".owl-arrows .next-link").click(function (event) {
            event.preventDefault();
            owl.trigger('owl.next');
        });
        $(".owl-arrows .prev-link").click(function (event) {
            event.preventDefault();
            owl.trigger('owl.prev');
        });
    } catch (err) {

    }
    try {
        $("#owl-demo2").owlCarousel({
            autoPlay: 10000,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2]
        });
    } catch (err) {

    }

    try {
        var owl2 = $("#owl-demo-pro").owlCarousel({
            autoPlay: 10000,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2]
        });

        // Custom Navigation Events
        $(".owl-arrows .next-link").click(function (event) {
            event.preventDefault();
            owl2.trigger('owl.next');
        });
        $(".owl-arrows .prev-link").click(function (event) {
            event.preventDefault();
            owl2.trigger('owl.prev');
        });
    } catch (err) {

    }
    try {
        var owl3 = $("#owl-demo-pro2").owlCarousel({
            autoPlay: 10000,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2]
        });

        // Custom Navigation Events
        $(".owl-arrows2 .next-link").click(function (event) {
            event.preventDefault();
            owl3.trigger('owl.next');
        });
        $(".owl-arrows2 .prev-link").click(function (event) {
            event.preventDefault();
            owl3.trigger('owl.prev');
        });
    } catch (err) {

    }
    /*-------------------------------------------------*/
	/* =  comming soon & error height fix
	/*-------------------------------------------------*/

    $('.error-section, .comming-soon-section').css('min-height', $(window).height() - $('.navbar-default').height());

    try {

        $('#clock').countdown("2017/01/29", function (event) {
            var $this = $(this);
            switch (event.type) {
                case "seconds":
                case "minutes":
                case "hours":
                case "days":
                case "daysLeft":
                    $this.find('span#' + event.type).html(event.value);
                    break;
                case "finished":
                    $this.hide();
                    break;
            }
        });

    } catch (err) {

    }

    /* ---------------------------------------------------------------------- */
	/*	Accordion
	/* ---------------------------------------------------------------------- */
    var clickElem = $('a.accord-link');

    clickElem.on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            parentCheck = $this.parents('.accord-elem'),
            accordItems = $('.accord-elem'),
            accordContent = $('.accord-content');

        if (!parentCheck.hasClass('active')) {

            accordContent.slideUp(400, function () {
                accordItems.removeClass('active');
            });
            parentCheck.find('.accord-content').slideDown(400, function () {
                parentCheck.addClass('active');
            });

        } else {

            accordContent.slideUp(400, function () {
                accordItems.removeClass('active');
            });

        }
    });

    /*-------------------------------------------------*/
	/* =  Animated content
	/*-------------------------------------------------*/

    try {
        /* ================ ANIMATED CONTENT ================ */
        if ($(".animated")[0]) {
            $('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function () {
            var animation = $(this).attr('data-animate');
            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);

        },
            {
                offset: '75%',
                triggerOnce: true
            }
        );
    } catch (err) {

    }

    /*-------------------------------------------------*/
	/* =  remove animation in mobile device
	/*-------------------------------------------------*/
    if (winDow.width() < 992) {
        $('div.triggerAnimation').removeClass('animated');
        $('div.triggerAnimation').removeClass('triggerAnimation');
    }

    /*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/

    try {

        var SliderPost = $('.flexslider');

        SliderPost.flexslider({
            slideshowSpeed: 3000,
            easing: "swing"
        });
    } catch (err) {

    }

    /* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
    var contact = { "lat": "-33.880641", "lon": "151.204298" }; //Change a map coordinate here!

    try {
        var mapContainer = $('.map');
        mapContainer.gmap3({
            action: 'addMarker',
            marker: {
                options: {
                    icon: new google.maps.MarkerImage('images/marker.png')
                }
            },
            latLng: [contact.lat, contact.lon],
            map: {
                center: [contact.lat, contact.lon],
                zoom: 15
            },
        },
            { action: 'setOptions', args: [{ scrollwheel: false }] }
        );
    } catch (err) {

    }

    /* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

    try {
        // Example with multiple objects
        $('.zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
        // Example with multiple objects
        $('.video').magnificPopup({
            type: 'iframe'
        });

    } catch (err) {

    }

    /*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

    

    var slidertestimonial2 = $('.client-slider');
    try {
        slidertestimonial2.bxSlider({
            pagerCustom: '#bx-pager',
            controls: false,
            auto: true,
        });
    } catch (err) {
    }
    /*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/
    try {
        $('.statistic-post').appear(function () {
            $('.timer').countTo({
                speed: 4000,
                refreshInterval: 60,
                formatter: function (value, options) {
                    return value.toFixed(options.decimals);
                }
            });
        });
    } catch (err) {

    }

    /*-------------------------------------------------*/
	/* =  news accord
	/*-------------------------------------------------*/

    var newsLink = $('#news-section2 .news-title a');

    newsLink.on('click', function (event) {
        event.preventDefault();
        var HisParent = $(this).parents('.news-post');
        console.log(HisParent);
        if (!HisParent.hasClass('active')) {

            $('.news-post .news-content').slideUp(300, function () {
                $('.news-post').removeClass('active');
            });

            HisParent.find('.news-content').slideDown(300, function () {
                HisParent.addClass('active');
            });
        } else {
            $('.news-post.active .news-content').slideUp(300, function () {
                HisParent.removeClass('active');
            });
        }

    });

    /* ---------------------------------------------------------------------- */
	/*	Shop galery image replacement
	/* ---------------------------------------------------------------------- */

    var elemToShow = $('.other-products a');

    elemToShow.on('click', function (e) {
        e.preventDefault();
        var newImg = $(this).attr('data-image');
        var prodHolder = $('.image-holder img');
        prodHolder.attr('src', newImg);
    });

    /*-------------------------------------------------*/
	/* =  product increase
	/*-------------------------------------------------*/

    var fieldNum = $('input[type="text"]'),
        btnIncrease = $('button.increase'),
        btnDecrease = $('button.decrease');

    btnIncrease.on('click', function (event) {
        event.preventDefault();
        var fieldVal = $(this).parent('div.quantity-add').find(fieldNum).val();
        var nextVal = parseFloat(fieldVal) + 1;
        $(this).parent('div.quantity-add').find(fieldNum).val(nextVal);
    });

    btnDecrease.on('click', function (event) {
        event.preventDefault();
        var fieldVal = $(this).parent('div.quantity-add').find(fieldNum).val();
        var nextVal = parseFloat(fieldVal) - 1;
        if (fieldVal > 0) {
            $(this).parent('div.quantity-add').find(fieldNum).val(nextVal);
        } else {
            $(this).parent('div.quantity-add').find(fieldNum).val(0);
        }
    });

    /*-------------------------------------------------*/
	/* =  blog alt height content fix, feature text post height fix
	/*-------------------------------------------------*/

    var ImgHeight = $('.cont-post-r .gal-post, .feature-post.grid-sizer').outerHeight(),
        contHeight = $('.blog-section.alternative .blog-post .cont-box, .feature-post.feature-text-post');
    winDow.imagesLoaded(function () {
        contHeight.css('min-height', ImgHeight);
    });

    winDow.bind('resize', function () {
        var ImgHeight2 = $('.cont-post-r .gal-post, .feature-post.grid-sizer').outerHeight();
        contHeight.css('min-height', ImgHeight2);
    });

    /* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

    var submitContact = $('#submit_contact'),
        message = $('#msg');

    submitContact.on('click', function (e) {
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: "POST",
            url: 'contact.php',
            dataType: 'json',
            cache: false,
            data: $('#contact-form').serialize(),
            success: function (data) {

                if (data.info !== 'error') {
                    $this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
                    message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                } else {
                    message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                }
            }
        });
    });


    /*-------------------------------------------------*/
	/* =  about tabs
	/*-------------------------------------------------*/

    var tabLinK = $('.about-post a'),
        tabContenT = $('.tab-cont');

    tabLinK.on('click', function (event) {
        event.preventDefault();
        var dataLink = $(this).attr('data-link'),
            dataTab = $('.tab-cont.active').attr('data-tab');

        if (!$(this).hasClass('active')) {
            $('.about-post a').removeClass('active');
            $(this).addClass('active');
        }

        if (dataLink == dataTab) {
        } else {
            tabContenT.removeClass('active');
            $('.tab-cont[data-tab=' + dataLink + ']').addClass('active');
        }
    });

    /* ---------------------------------------------------------------------- */
	/*	Load more posts from container
	/* ---------------------------------------------------------------------- */

    var LoadButton = $('a.load-post-container'),
        PortContainer = ('.iso-call'),
        i = 0,
        s = 0;

    LoadButton.live('click', function (event) {
        event.preventDefault();

        var LoadContainer = $(this).attr('data-load'),
            xel = parseInt($(this).attr('data-number'));

        var storage = document.createElement('div');
        $(storage).load("load-container/" + LoadContainer + " .project-post, .blog-post", function () {

            var elemloadedLength = $(storage).find('.project-post, .blog-post').length;

            if (!((s + 1) > elemloadedLength)) {

                s = i + xel;

                var t = i - 1;
                var $elems;

                if (i === 0) {
                    /// create new item elements
                    $elems = $(storage).find(".project-post:lt(" + s + "), .blog-post:lt(" + s + ")").appendTo(PortContainer);
                    // append elements to container
                    $container.isotope('appended', $elems);
                    recallMagnific();
                    Resize();
                    if (LoadContainer == "blog-container3.html") {
                        $(storage).find(".blog-post:lt(" + s + ")").appendTo('.blog-box.timeline');
                        Resize();
                    }

                } else {
                    /// create new item elements
                    $elems = $(storage).find(".project-post:lt(" + s + "):gt(" + t + "), .blog-post:lt(" + s + "):gt(" + t + ")").appendTo(PortContainer);
                    // append elements to container
                    $container.isotope('appended', $elems);
                    recallMagnific();
                    Resize();
                    if (LoadContainer == "blog-container3.html") {
                        $(storage).find(".blog-post:lt(" + s + "):gt(" + t + ")").appendTo('.blog-box.timeline');
                        Resize();
                    }
                }

                i = i + xel;
            }
            setTimeout(Resize, 500);

            if (!(s < elemloadedLength)) {
                $('a.load-post-container').text("No more posts");
            }

        });

    });


    /* ---------------------------------------------------------------------- */
	/*	menu responsive
	/* ---------------------------------------------------------------------- */
    var menuClick = $('a.elemadded'),
        navbarVertical = $('.menu');

    menuClick.on('click', function (e) {
        e.preventDefault();

        if (navbarVertical.hasClass('active')) {
            navbarVertical.slideUp(300).removeClass('active');
        } else {
            navbarVertical.slideDown(300).addClass('active');
        }
    });

    winDow.bind('resize', function () {
        if (winDow.width() > 991) {
            navbarVertical.slideDown(300).removeClass('active');
        } else {
            navbarVertical.slideUp(300).removeClass('active');
        }
    });

    /* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

    (function () {

        var docElem = document.documentElement,
            didScroll = false,
            changeHeaderOn = 50;
        document.querySelector('header');
        function init() {
            window.addEventListener('scroll', function () {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 100);
                }
            }, false);
        }

        function scrollPage() {
            var sy = scrollY();
            if (sy >= changeHeaderOn) {
                $('header').addClass('active');
            }
            else {
                $('header').removeClass('active');
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        init();

    })();

});

/* ---------------------------------------------------------------------- */
/*	magnific-popup function
/* ---------------------------------------------------------------------- */
function recallMagnific() {
    $('.zoom').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
}


function Resize() {
    $(window).trigger('resize');
}