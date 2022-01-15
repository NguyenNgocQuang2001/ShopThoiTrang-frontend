async function checkToken() {

    try {
        var access = await accessToken();
        var username = getCookie('user')
        //console.log(access.authen);
        if (access && access.authen == true && username && username != '') {
            window.location.href = '/profile/' + username;
            $('#logout').css("display", "none");
        } else {
            $('#logout').css("display", "block");
        }
    }
    catch(err) {
        console.log('loi server !!!');
    }
}

checkToken();