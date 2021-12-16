function clickbtn() {

    fetch('http://localhost:9090/home',{

        method : 'GET'
    })
    .then(data => {
        console.log(data);
        return data.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log('server loi :((');
    });
    
}