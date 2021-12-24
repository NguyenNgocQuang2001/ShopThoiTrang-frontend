const getToken = () => {

    const acc = {

        username : $('#login-account').val(),
        password : $('#login-password').val()
    };

    //console.log($('#login-password').val());
    var token = fetch('http://localhost:9090/account', {

        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body : JSON.stringify(acc)
    })
    .then(data => {

        //setCookie('token', data, 1);
        return data.json();
    })
    .then(data => {
        //console.log(data);
        //setCookie('token', data.token, 1);
        return data;
        //alert(data.token);
    })
    .catch(err => {
        
        return "loi server !!!";
        //throw err;
    });

    //var token = await data;

    return token;
}