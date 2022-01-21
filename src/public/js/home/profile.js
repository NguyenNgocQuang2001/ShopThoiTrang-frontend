async function authenToken() {

    try {
        var access = await accessToken();
        //console.log(access.authen);
        if (!(access && access.authen == true)) {
            window.location.href = '/logout';
        } else {
            $('#myAccount').css("display", "flex");
        }
    }
    catch(err) {
        console.log('loi server !!!');
        window.location.href = '/logout';
    }
}

authenToken();