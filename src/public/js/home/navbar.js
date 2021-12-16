var open = false; 

function products() {

    $('#myAccount').css("display", "none");
    $('#product').css("display", "");
    $('.product').slideToggle(1000);
    if (open === false) {

        $('#arrow-products').css({
            "transform" : "rotate(180deg)",
            "transition-duration" : "1s"
        });
        open = true;
    } else {

        $('#arrow-products').css({
            "transform" : "rotate(0deg)",
            "transition-duration" : "1s"
        });
        open = false;
    }
}

function myInformation() {

    $('#product').css("display", "none");
    $('#myAccount').css("display", "flex");
}