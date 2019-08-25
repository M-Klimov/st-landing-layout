$(document).ready(function() {
    const body = $([document.documentElement, document.body]),
        search = $('.search'),
        searchInput = $('.search input'),
        searchList = $('.search-list'),
        counter = $('.counter-value'),
        logoSlider = $('.slider-logos'),
        sliderWrapper = $('.section3'),
        bigSlider = $('.big-slider'),
        status = $('.slide-counter'),
        bigSliderSpeed = '500'; // скорость прокрутки слайдера

    var flagChangeSlide = true,
        flagCounter = true;

    // скрытие всех блоков с анимацией
    $("[animation]").addClass('hidden');
    $("[slide-animation]").addClass('hidden');

    // активация окна с результатами поиска
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

    // малый слайдер - настройка
    logoSlider.slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        draggable: true,
    });

    // большой слайдер - настройка
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

    // большой слайдер - счетчик
    bigSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (i % 2 == 0) {
            sliderWrapper.addClass('bg-primary');
        } else {
            sliderWrapper.removeClass('bg-primary');
        }
        status.html("<span class='current-slide'>" + ('00' + i).slice(-2) + "</span><span class='total-slide'>/" + ('00' + slick.slideCount).slice(-2) + "</span>");

        $(slick.$slides.get(currentSlide)).find("[slide-animation]").each(function() {
            animate = $(this).attr('slide-animation');
            if (!$(this).hasClass(animate)) {
                $(this).addClass(animate).removeClass('hidden');
            }
        });
    });

    // большой слайдер - поэкранная прокрутка
    sliderWrapper.on('wheel', (function(event) {
        event.preventDefault();
        if (!flagChangeSlide) return;
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
        flagChangeSlide = false;
        setTimeout(function() { flagChangeSlide = true }, 500);
    }));

    $(window).on('wheel', function() {
        var scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = sliderWrapper.offset().top,
            elBottom = elTop + sliderWrapper.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
        if ((visibleBottom - visibleTop) >= (sliderWrapper.outerHeight() * .25) && (visibleBottom - visibleTop) <= (sliderWrapper.outerHeight() * .5)) {
            body.animate({ scrollTop: sliderWrapper.offset().top }, bigSliderSpeed);
        }
    });

    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height();

        counter.each(function() {
            oTop = $(this).offset().top;
            if (flagCounter && scrollBot >= oTop) {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum.toLocaleString());
                        //alert('finished');
                    }
                });
                flagCounter = false;
            }
        });

        // анимирование блоков
        $("[animation]").each(function() {
            var $this = $(this),
                oTop = $this.offset().top,
                animate = $this.attr('animation');
            if (scrollBot >= oTop && !$this.hasClass(animate)) {
                $this.addClass(animate).removeClass('hidden');
            }
        });
    });

    // большой слайдер - кнопка пропуска секции
    $('.area').on('click', function() {
        body.animate({ scrollTop: sliderWrapper.next().offset().top }, bigSliderSpeed);
    });

    // валидатор формы
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
});