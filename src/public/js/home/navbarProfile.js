function myProfile() {

    var username = getCookie('user');
    window.location.pathname = '/profile/' + username;
}

function myCart() {

    window.location.pathname = '/profile/cart';
}

function myOrder() {

    window.location.pathname = '/profile/order';
}

function myMess() {

    window.location.pathname = '/profile/cart';
}