const setvalSignUp = () => {
    $('#register-name').val('');
    $('#register-email').val('');
    $('#register-phone').val('');
    $('#register-password').val('');
    $('#register-confirmpassword').val('');
}

const setvalLogin = () => {
    $('#login-account').val('');
    $('#login-password').val('');
}

$('#login-account').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalSignUp();
});

$('#login-password').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalSignUp();
});

$('#register-name').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalLogin();
});

$('#register-email').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalLogin();
});

$('#register-phone').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalLogin();
});

$('#register-password').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalLogin();
});

$('#register-confirmpassword').click(function () {

    $('#notification-login').css("display", "none");
    $('#notification-signup').css("display", "none");
    setvalLogin();
});

async function login() {

    try {
        var token = await getToken();
        setCookie('token', token.token, 1);
        setCookie('user', token.user, 1);
        if (typeof(token) != "string") {

            window.location.replace('/product');
        } else {
            $('#notification-login').css("display", "block");
            //$('#login-account').val('');
            //$('#login-password').val('');
        }
    } catch(err) {
        console.log('loi server !!!');
    }
}


async function signup() {

    try {
        var ans = await submitSignUp();
        console.log(ans);
        if (ans == 'Tạo tài khoản thành công') {
            setvalSignUp();
        }
        $('#notification-signup').text(ans);
        $('#notification-signup').css("display", "block");
    } catch(err) {
        console.log('loi server !!!');
    }
}

$('div#login input').keypress(function(e) {

    if(e.key == 'Enter') {
        e.preventDefault();
        login();
    }
});

$('div#register input').keypress(function(e) {

    if(e.key == 'Enter') {
        e.preventDefault();
        signup();
    }
});

async function checkToken() {

    try {
        var access = await accessToken();
        var username = getCookie('user')
        //console.log(access.authen);
        if (access && access.authen == true && username && username != '') {
            window.location.href = '/profile/' + username;
        }
    }
    catch(err) {
        console.log('loi server !!!');
    }
}

checkToken();
