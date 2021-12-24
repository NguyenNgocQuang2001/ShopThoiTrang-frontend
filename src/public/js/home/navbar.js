var open = false; 

function products() {

    $('#myAccount').css("display", "none");
    $('#logout').css("display", "none");
    $('#product').css("display", "flex");
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

async function myInformation() {

    try {
        var access = await accessToken();
        console.log(access.authen);
        if (access && access.authen == true) {
            $('#product').css("display", "none");
            $('#logout').css("display", "none");
            $('#myAccount').css("display", "block");
        } else {
            $('#product').css("display", "none");
            $('#logout').css("display", "block");
            $('#myAccount').css("display", "none");
        }
    }
    catch(err) {
        console.log('loi server !!!');
    }
}

function buttonlogout() {

    setCookie('token', "__", 1);
    window.location.href = "./home";
}