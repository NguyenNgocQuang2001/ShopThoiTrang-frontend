const accessToken = () => {

    var token = getCookie('token');

    var data = { token : token};
    
    var access = fetch('http://localhost:9090/access', {

        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body : JSON.stringify(data)
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

    return access;
}