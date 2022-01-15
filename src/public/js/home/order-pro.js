function setSizeImg() {

    var szwidth =  $('div#show1 > img').eq(0).parents('div#show1').width();
    var szheight =  $('div#show1 > img').eq(0).parents('div#show1').height();
    $('div#show1 > img').eq(0).width(szwidth).height(szheight);
}

setSizeImg();