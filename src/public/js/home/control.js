$(document).ready(function() {
    
    var len = $('div.choices').length;
    var choices = [];
    var choice = Number(getCookie('choice')) || 0;

    const query = () => {
        var sp = Number(getCookie('startPos')) || 1;
        var pg = Number(getCookie('page')) || 0;
        var que = '?';
        var sortBy = getCookie('sortBy') || 'Mặc định';
        var search = getCookie('search') || null;
        que = que + 'sortBy=' + sortBy;
        if (search) {
            que = que + '&search=' + search;
        }
        que = que + '&page=' + (sp + pg);
        return que;
    }
    for (let i = 0; i < len; ++i) {

        var opt = $('div.choices > div.content > div.left').eq(i).text();
        choices.push(opt);
    }

    function setcolor() {

        for (let i = 0; i < len; ++i) {

            $('div.choices > div.content').eq(i).css("background-color", "white");
            $('div.choices > div.content > div.left').eq(i).text(choices[i]);
        }

        $('li div.content').css("color", "black");
    }

    $('li div.content').click(function() {
        //console.log($(this).find('div.left').eq(0).text());
        //console.log($(this).parents('div.choices').eq(0).text());
        choice = $('li div.content').index(this);
        setCookie('choice', choice, 0.05);
        var opt = $(this).find('div.left').eq(0).text();
        setCookie('sortBy', opt, 0.05);
        window.location.href = "/product" + query();
    });

    $('#search').keypress(function(e) {

        if(e.key == 'Enter') {
            e.preventDefault();
            setCookie('search', $('#search').val(), 0.05);
            window.location.href = "/product" + query();
        }
    });

    $('#labelid').click(function() {
        setCookie('search', $('#search').val(), 0.05);
        window.location.href = "/product" + query();
    });

    function sortby(choice) {

        setcolor();
        $('li div.content').eq(choice).closest('div.choices').find('div.content').eq(0).css("background-color", "red");
        var opt = $('li div.content').eq(choice).find('div.left').eq(0).text();
        $('li div.content').eq(choice).closest('div.choices').find('div.content > div.left').eq(0).text(opt);
        //$(this).parents('ul').eq(0).css("display", "none");
        $('li > div.content > div.right > i').css("display", "none");
        $('li div.content').eq(choice).find('i').eq(0).css("display", "block");
        $('li div.content').eq(choice).css("color", "red");
        var search = getCookie('search') || '';
        $('#search').val(search);
    }

    sortby(choice);

});