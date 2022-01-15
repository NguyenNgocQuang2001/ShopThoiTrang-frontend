const getProducts = (data) => {

    
    var pros = fetch('http://localhost:9090/products', {

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

    return pros;
}