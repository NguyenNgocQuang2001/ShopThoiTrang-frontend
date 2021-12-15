const getapi = () => {

    const acc = {

        username : $('#login-account').val(),
        password : $('#login-password').val()
    };

    //console.log($('#login-password').val());
    fetch('http://localhost:9090/account', {

        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body : JSON.stringify(acc)
    })
    .then(data => {

        setCookie('token', data, 1);
        return data.json();
    })
    .then(data => {
        console.log(data);
        //return data;
    })
    .catch(err => {
        
        console.log('err');
        //throw err;
    });

    //return data;
}