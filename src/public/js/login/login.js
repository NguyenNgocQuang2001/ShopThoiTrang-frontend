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
        if (typeof(token) != "string") {

            window.location.replace("./home");
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
        $('#notification-signup').text(ans);
        $('#notification-signup').css("display", "block");
    } catch(err) {
        console.log('loi server !!!');
    }
}