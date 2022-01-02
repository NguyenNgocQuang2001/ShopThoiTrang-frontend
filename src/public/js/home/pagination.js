var startpos = Number(getCookie('startPos')) || 1;
var pages = Number(getCookie('page')) || 0;

const queryPage = () => {

    var sp = Number(getCookie('startPos')) || 1;
    var pg = Number(getCookie('page')) || 0;
    var que = "?";
    var sortBy = getCookie('sortBy') || 'Mặc định';
    var search = getCookie('search') || null;
    que = que + 'sortBy=' + sortBy;
    if (search) {
        que = que + '&search=' + search;
    }
    que = que + '&page=' + (sp + pg);

    return que;
}

function backback() {

    if (startpos > 1) {
        setCookie('startPos', String(startpos - 9), 0.05);
        setCookie('page', '8', 0.05);
        window.location.href = '/product' + queryPage();
    }
}

function backk() {

    if (startpos > 1) {

        if (pages == 0) {
            backback();
        } else {
            setCookie('page', String(pages - 1), 0.05);
        }
    } else {
        if (pages > 0) {
            setCookie('page', String(pages - 1), 0.05);
        }
    }
    window.location.href = '/product' + queryPage();
}

function nextnext() {

    setCookie('startPos', String(startpos + 9), 0.05);
    setCookie('page', '0', 0.05);
    window.location.href = '/product' + queryPage();
}

function nextt() {

    if (pages == 8) {
        nextnext();
    } else {
        setCookie('page', String(pages + 1), 0.05);
    }
    window.location.href = '/product' + queryPage();
}


$(document).ready(function() {

    //var startpos = Number(getCookie('startPos')) || 1;
    function numberPage(startPos, num, rest) {

        for (let i = startPos; i < startPos + num; ++i) {

            $('#posPag').before('<div class="pagination number">' + i + '</div>');
        }

        if (rest == true) {

            $('#posPag').before('<div class="pagination">...</div>');
        }

    }

    function page(page) {

        $('div.number').css("background-color", "white");
        $('div.number').eq(page).css("background-color", "red");
    }

    numberPage(startpos, 9, true);

    $('div.number').click(function() {

        setCookie('page', String($('div.number').index(this)), 0.05);
        window.location.href = '/product' + queryPage();
    });

    page(Number(getCookie('page')));
})