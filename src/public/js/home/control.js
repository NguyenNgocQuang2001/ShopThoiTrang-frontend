var len = $('div.choices').length;
var choices = [];
var sortby = $.urlParam('sortBy') || 'Mặc định';
var search = $.urlParam('search') || '';

for (let i = 0; i < len; ++i) {

    var opt = $('div.choices > div.content > div.left').eq(i).text();
    choices.push(opt);
}

function checkLink() {

    var link = window.location.pathname;
    if (link == '/product' || link == '/product/') {
        return true;
    }
    return false;
}

function setcolor() {

    for (let i = 0; i < len; ++i) {

        $('div.choices > div.content').eq(i).css("background-color", "white");
        $('div.choices > div.content > div.left').eq(i).text(choices[i]);
    }

    $('li div.content').css("color", "black");
}

function setDisplay() {

    if (checkLink() == true) {

        $('div#return').css("display", "none");
        $('div#text').css("display", "block");
        $('div.choices').css("display", "inline");
        $('form#search-form').css("margin-left", "calc(100% - 889px)");
    } else {

        $('div#return').css("display", "block");
        $('div#text').css("display", "none");
        $('div.choices').css("display", "none");
        $('form#search-form').css("margin-left", "calc(100% - 468px)");
    }
}

$('li div.content').click(function() {
    //console.log($(this).find('div.left').eq(0).text());
    //console.log($(this).parents('div.choices').eq(0).text());
    updateQuery('sortBy', $(this).find('div.left').eq(0).text());
    setParams('/product', query);
});

$('#search').keypress(function(e) {

    if(e.key == 'Enter') {
        e.preventDefault();
        updateQuery('search', $('#search').val());
        setParams('/product', query);
    }
});

$('#labelid').click(function() {
    updateQuery('search', $('#search').val());
    setParams('/product', query);
});

function findChoice(sortBy) {

    var leng = $('li > div.content > div.left').length;
    for (let i = 0; i < leng; ++i) {
        if (sortBy == $('li > div.content > div.left').eq(i).text()) {
            return i;
        }
    }
    return 0;
}

function choiceSort(choice) {

    setcolor();
    $('li div.content').eq(choice).closest('div.choices').find('div.content').eq(0).css("background-color", "red");
    var opt = $('li div.content').eq(choice).find('div.left').eq(0).text();
    $('li div.content').eq(choice).closest('div.choices').find('div.content > div.left').eq(0).text(opt);
    //$(this).parents('ul').eq(0).css("display", "none");
    $('li > div.content > div.right > i').css("display", "none");
    $('li div.content').eq(choice).find('i').eq(0).css("display", "block");
    $('li div.content').eq(choice).css("color", "red");
    $('#search').val(search);
}

function goToCart() {

    window.location.pathname = '/profile/cart';
}

function returnpro() {

    window.location.href = '/product';
}

choiceSort(findChoice(sortby));
setDisplay();