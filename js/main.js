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
});