$(() => {
    const body = $([document.documentElement, document.body]),
        search = $('.search'),
        searchInput = $('.search input'),
        searchList = $('.search-list'),
        logoSlider = $('.slider-logos'),
        sliderWrapper = $('.section3'),
        bigSlider = $('.big-slider'),
        status = $('.slide-counter'),
        bigSliderSpeed = '500';

    searchInput.on('input', () => {
        const length = searchInput.val().split(' ').join('').length;

        if (length) {
            searchList.addClass('show');
            search.addClass('active');
        } else {
            searchList.removeClass('show');
            search.removeClass('active');
        }
    });

    logoSlider.slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        //variableWidth: true,
        draggable: true,
    });

    bigSlider.slick({
        infinite: false,
        vertical: true,
        dots: true,
        arrows: true,
        speed: bigSliderSpeed,
        appendDots: $('.slide-dots'),
        appendArrows: $('.slide-arrows'),
        prevArrow: '<a href=""><object type="image/svg+xml" data="./img/icons/arrow-left.svg"><</object></a>',
        nextArrow: '<a href=""><object type="image/svg+xml" data="./img/icons/arrow-right.svg">></object></a>',
        useTransform: true,
    });

    // slick slide counter
    bigSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (i % 2 == 0) {
            sliderWrapper.addClass('bg-primary');
        } else {
            sliderWrapper.removeClass('bg-primary');
        }
        status.html("<span class='current-slide'>" + ('00' + i).slice(-2) + "</span><span class='total-slide'>/" + ('00' + slick.slideCount).slice(-2) + "</span>");
    });
/*
    // slick fullpage slide
    sliderWrapper.on('wheel', (function(event) {
        event.preventDefault();
        if (event.originalEvent.deltaY > 0) {
            if ((bigSlider.slick('slickCurrentSlide') + 1) < bigSlider.slick('getSlick').slideCount) {
                bigSlider.slick('slickNext');
                body.animate({ scrollTop: sliderWrapper.offset().top }, bigSliderSpeed);
            } else {
                body.animate({ scrollTop: sliderWrapper.next().offset().top }, bigSliderSpeed);
            }
        } else {
            if (bigSlider.slick('slickCurrentSlide') > 0) {
                bigSlider.slick('slickPrev');
                body.animate({ scrollTop: sliderWrapper.offset().top }, bigSliderSpeed);
            } else {
                body.animate({ scrollTop: (sliderWrapper.offset().top - $(window).height()) }, bigSliderSpeed);
            }
        }
    }));

    // go to slider if visible 30%

    $(window).on('wheel', function() {
        var scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = sliderWrapper.offset().top,
            elBottom = elTop + sliderWrapper.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
        event.preventDefault();
        if ((visibleBottom - visibleTop) >= (sliderWrapper.outerHeight() * .25) && (visibleBottom - visibleTop) <= (sliderWrapper.outerHeight() * .5)) {
            body.animate({ scrollTop: sliderWrapper.offset().top }, bigSliderSpeed);
        }
    });    
*/
    // skip slide
    $('.chevron').on('click', function() {
        body.animate({ scrollTop: sliderWrapper.next().offset().top }, bigSliderSpeed);
    });

    // form validator
    $("#callback").validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
                maxlength: 16,
            },
            emailtel: {
                required: true,
            },
        },
        messages: {
            name: {
                required: "Это поле обязательно для заполнения",
                minlength: "Имя должно быть минимум 4 символа",
                maxlength: "Максимальное число символов - 16",
            },
            emailtel: {
                required: "Это поле обязательно для заполнения",
            },
        },
        submitHandler: function(form) {
            $('#callback').hide("slow", () => {
                $('#callback').html("<div class='done'>Данные успешно отправлены!</div>");
            });
            $('#callback').show("slow");
            //form.submit();
            return false; // for demo
        }
    });

    // animate block
    $(".lazyIn").animated("fadeIn");
    $(".slide").animated("fadeIn");
    $(".lazyRight").animated("fadeRigh");
    $(".lazyDown").animated("fadeDown");
    $(".lazyLeft").animated("fadeLeft");
    // road to 1000000000
    $('#num').animate({ num: 1022954603 - 7 /* - начало */ }, {
        duration: 5000,
        step: function(num) {
            this.innerHTML = (num + 7).toLocaleString()
        }
    });
});

(function($) {
	$.fn.animated = function(inEffect) {
		$(this).each(function() {
			var ths = $(this);
			ths.css("opacity", "0").addClass("animated").waypoint(function(dir) {
				if (dir === "down") {
					ths.addClass(inEffect).css("opacity", "1");
				};
			}, {
				offset: "90%"
			});

		});
	};
})(jQuery);