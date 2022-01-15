var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURIComponent(decodeURI(results[1]) || 0);
}

//console.log(decodeURIComponent($.urlParam('city')));

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i=0;

    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if(i >= kvp.length){
        kvp[kvp.length] = [key,value].join('=');
    }

    // can return this or...
    let params = kvp.join('&');

    // reload page with new params
    document.location.search = params;
}

//insertParam('id', '1011');

var query = {

    'type' : '',
    'sortBy' : 'Mặc định',
    'search' : '',
    'page' : '1'
}

function updateQuery(key, value) {

    var keyy = Object.keys(query);
    for (let i = 0; i < keyy.length; ++i) {

        query[keyy[i]] = $.urlParam(keyy[i]) || '';
    }
    query[key] = value;
}

function setParams(path, att) {

    var key = Object.keys(att);
    var query = "";
    if (key.length > 0) {
        query = "?";
        for (let i = 0; i < key.length; ++i) {

            if (att[key[i]] && att[key[i]] != '') {
                query = query + key[i] + "=" + att[key[i]];
                if (i < key.length - 1) {
                    query = query + "&";
                }
            }
        }
    }

    if (query[query.length - 1] == '&') {
        query = query.slice(0, query.length - 1);
    }

    //window.location.search = query;
    window.location.href = path + query;
}

// console.log(window.location.href);
// console.log(window.location.origin);
// console.log(window.location.search);
// console.log(window.location.port);
// console.log(window.location.protocol);
// console.log(window.location.pathname);
// console.log(window.location.host);
// console.log(window.location.hostname);