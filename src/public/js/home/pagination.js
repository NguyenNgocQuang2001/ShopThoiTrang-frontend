var sortby = $.urlParam('sortBy') || 'Mặc định';
var page = Number($.urlParam('page')) || 1;
if (page < 0) {
    page = 1;
}
var search = $.urlParam('search') || '';

function backback() {

    if (page > 9) {

        updateQuery('page', Math.floor((page - 1) / 9) * 9);
        updateQuery('search', search);
        updateQuery('sortBy', sortby);
        setParams(query);
    }
}

function backk() {

    if (page > 1) {
        updateQuery('page', page - 1);
        updateQuery('search', search);
        updateQuery('sortBy', sortby);
        setParams(query);
    }
}

function nextnext() {

    updateQuery('page', Math.floor((page - 1) / 9) * 9 + 10);
    updateQuery('search', search);
    updateQuery('sortBy', sortby);
    setParams(query);
}

function nextt() {

    updateQuery('page', page + 1);
    updateQuery('search', search);
    updateQuery('sortBy', sortby);
    setParams(query);
}


function numberPage(startPos, num, rest) {

    for (let i = startPos; i < startPos + num; ++i) {

        $('#posPag').before('<div class="pagination number">' + i + '</div>');
    }

    if (rest == true) {

        $('#posPag').before('<div class="pagination">...</div>');
    }

}

function drawPage(page) {

    $('div.number').css("background-color", "white");
    $('div.number').eq(page).css("background-color", "red");
}

numberPage(Math.floor((page - 1) / 9) * 9 + 1, 9, true);

$('div.number').click(function() {

    updateQuery('page', $(this).text());
    updateQuery('search', search);
    updateQuery('sortBy', sortby);
    setParams(query);
});

drawPage((page - 1) % 9);