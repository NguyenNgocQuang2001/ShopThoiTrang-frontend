var open = false; 

function products() {

    if (window.location.href.includes('product') == true) {
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
    } else {
        window.location.href = '/product';
    }
}

async function myInformation() {

    try {
        var access = await accessToken();
        console.log(access.authen);
        if (access && access.authen == true) {
            window.location.href = '/profile/' + getCookie('user');
        } else {
            window.location.href = '/logout';
        }
    }
    catch(err) {
        console.log('loi server !!!');
    }
}

function buttonlogout() {

    setCookie('token', '', 0);
    setCookie('user', '' , 0);
    window.location.href = "/login";
}