const fixInfo = (data) => {
    
    var token = getCookie('token');
    var letter = {

        token : token,
        exist : data.exist,
        filter : data.filter,
        fix : data.fix
    }
    var respon = fetch('http://localhost:9090/fixinfo', {

        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body : JSON.stringify(letter)
    })
    .then(result => {

        return result.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        
        return "loi server !!!";
        //throw err;
    });

    return respon;
}