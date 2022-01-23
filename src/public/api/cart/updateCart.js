const updateCart = (data) => {
    
    var token = getCookie('token');
    var letter = {

        token : token,
        filter : data.filter,
        value : data.value
    }
    var info = fetch('http://localhost:9090/updatecart', {

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

    return info;
}