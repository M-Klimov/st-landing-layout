$(() => {
    const search = $('.search'),
        searchInput = $('.search input'),
        searchList = $('.search-list'),
        logoSlider = $('.slider-logos'),
        status = $('.slide-counter'),
        bigSlider = $('.big-slider'),
        sliderWrapper = $('.section3');

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
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        variableWidth: true,
        draggable: true,
    });



    bigSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        var invColor = "";
        if (i % 2 == 0) {
            sliderWrapper.addClass('bg-primary');
        } else {
            sliderWrapper.removeClass('bg-primary');
        }
        status.html("<span class='current-slide'>" + ('00' + i).slice(-2) + "</span><span class='total-slide'>/" + ('00' + slick.slideCount).slice(-2) + "</span>");
    });

    bigSlider.slick({
        infinite: false,
        dots: true,
        arrows: true,
        appendDots: $('.slide-dots'),
        appendArrows: $('.slide-arrows'),
        prevArrow: '<a href=""><object type="image/svg+xml" data="./img/icons/arrow-left.svg"><</object></a>',
        nextArrow: '<a href=""><object type="image/svg+xml" data="./img/icons/arrow-right.svg">></object></a>',
        useTransform: true,
    });
});