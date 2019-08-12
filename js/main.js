$(() => {
    const search = $('.search');
    const searchInput = $('.search input');
    const searchList = $('.search-list');

    searchInput.on('input', () => {
        const length = searchInput.val().split(' ').join('').length;

        if (length) {
            searchList.addClass('show');
            search.addClass('active');
        } else {
            searchList.removeClass('show');
            search.removeClass('active');
        }
    })

    $('.slider-logos').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        variableWidth: true
    });
});