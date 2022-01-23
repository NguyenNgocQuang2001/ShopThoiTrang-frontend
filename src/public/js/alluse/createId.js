function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeName(name) {

    var name_id = "";
    for (let i = 0; i < 15; ++i) {

        var c = getRandomInt(0, 26);
        name_id = name_id + String.fromCharCode(97 + c);
    }
    name = name + ' ' + name_id;
    return name;
}