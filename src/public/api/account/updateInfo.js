const updateInfo = (data) => {

    var formData = new FormData();

    for (const name in data) {

        formData.append(name, data[name]);

        // console.log(name);
        // console.log(data[name]);
    }
    
    //console.log(formData);
    fetch('http://localhost:9090/information', {

        method : 'POST',
        body : formData
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
}