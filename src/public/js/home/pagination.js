var page = Number($.urlParam('page')) || 1;
if (page < 0) {
    page = 1;
}
var totalpage = 0;

function backback() {

    if (page > 9) {

        updateQuery('page', Math.floor((page - 1) / 9) * 9);
        setParams('/product', query);
    }
}

function backk() {

    if (page > 1) {
        updateQuery('page', page - 1);
        setParams('/product', query);
    }
}

function nextnext() {

    if (Math.floor((page - 1) / 9) * 9 + 10 > totalpage) {
        return;
    }
    updateQuery('page', Math.floor((page - 1) / 9) * 9 + 10);
    setParams('/product', query);
}

function nextt() {

    console.log("okeeee" + totalpage);
    if (page + 1 > totalpage) {
        return;
    }
    updateQuery('page', page + 1);
    setParams('/product', query);
}


function numberPage(startPos, num, rest) {

    for (let i = startPos; i < startPos + num; ++i) {

        $('#posPag').before('<div class="pagination number">' + i + '</div>');
    }

    if (rest == true) {

        $('#posPag').before('<div class="pagination">...</div>');
    }

}

function drawPage(page) {

    $('div.number').css("background-color", "white");
    $('div.number').eq(page).css("background-color", "red");
}

function clickNumber() {

    $('div.number').click(function() {

        updateQuery('page', $(this).text());
        setParams('/product', query);
    });    
}

function setData() {

    var type = $.urlParam('type') || "";
    var search = $.urlParam('search') || '';
    var sortby = $.urlParam('sortBy') || 'Mặc định';
    var data = {

        skippage : (page - 1) * 10,
        limitdata : 10,
        filter : [
            // { $skip : (page - 1) * 10 }
            // { $limit : 10 }
            // {
            //     $addFields: {
            //         fname : {
            //             $regexFind : {

            //                 input : "$name",
            //                 regex : /^Quan/,
            //                 options : "i"

            //             }
            //         }
            //     }
            // }//,
            // {
            //     $match : {
            //         // fname : {
            //         //     $gt : -1
            //         // }

            //         name : {
            //             $regex: "Quan k",
            //             $options : 'i'
            //         }
            //     }
            // },
            {
                $match : {}
            },
            {

                $project : {
    
                    product_id : 1,
                    createDate : 1,
                    name : 1,
                    cost : 1,
                    sale : 1,
                    pathimage : 1,
                    finalcost : {
                        $divide : [{$multiply : ["$cost", { $subtract : [100, "$sale"] }]} , 100]
                    } //,
                    // fname : {
                    //     $indexOfBytes : ['$name', 'Quan k']
                    // }
                }
            }//,
            // {
            //     $match : {
            //         // fname : {
            //         //     $gt : -1
            //         // }

            //         name : {
            //             $regex: "Quan k",
            //             $options : 'i'
            //         }
            //     }
            // }
        ],
        count : [
            // {
            //     $addFields: {
            //         fname : {
            //             $indexOfBytes : ['$name', 'Quan k']
            //         }
            //     }
            // },
            // {
            //     $match : {
            //         fname : {
            //             $gt : -1
            //         }

            //         // name : {
            //         //     $regex: "Quan k",
            //         //     $options : 'i'
            //         // }
            //     }
            // },
            {
                $match : {}
            },
            {
                $count : "totalpage"
            }
        ]//,
        //filter : {}
        //sort : {}
    }
    if (type && type != '') {

        data.filter[0]['$match']['type'] = type;
        data.count[0]['$match']['type'] = type;
    }
    if (search && search != '') {

        data.filter[0]['$match']['name'] = {
            $regex: "^" + search,
            $options : 'i'
        };
        data.count[0]['$match']['name'] = {
            $regex: "^" + search,
            $options : 'i'
        };
    }
    if (sortby != 'Mặc định') {

        if (sortby == "Từ thấp đến cao") {
            data.filter.push({

                $sort : {
                    finalcost : 1
                }
            });
        } else if (sortby == "Từ cao đến thấp") {
            data.filter.push({

                $sort : {
                    finalcost : -1
                }
            });
        } else if (sortby == "Mới nhất") {
            data.filter.push({

                $sort : {
                    createDate : -1
                }
            });
        } else if (sortby == "Cũ nhất") {
            data.filter.push({

                $sort : {
                    createDate : 1
                }
            });
        } else if (sortby == "Từ A đến Z") {
            data.filter.push({

                $sort : {
                    name : 1
                }
            });
        } else {
            data.filter.push({

                $sort : {
                    name : -1
                }
            });
        }
    }
    // data.sort = {
    //     createDate : 1
    // };
    return data;
}

async function getPros() {


    //console.log(setData());
    var data = await getProducts(setData());
    //console.log(data);
    if (data.data) {

        totalpage = Math.floor(Number(data.allpage) / 10);
        var restpage = Number(data.allpage) % 10 ? 1 : 0;
        totalpage += restpage;
        if (page != 1 && totalpage < page) {

            updateQuery('page', 1);
            setParams('/product', query);
            return;
        } 
        var divpage = Math.floor(Number(data.allpage) / 10 - Math.floor((page - 1) / 9) * 9);
        restpage = Number(data.allpage) % 10;
        if (restpage > 0) {
            divpage += 1;
        }
        if (data.allpage > 0) {
            if (divpage < 9) {

                numberPage(Math.floor((page - 1) / 9) * 9 + 1, divpage, false);
            } else {
    
                numberPage(Math.floor((page - 1) / 9) * 9 + 1, 9, true);
            }
            clickNumber();
            drawPage((page - 1) % 9);
        }
        setPathImage(data.data);
        sizeImg();
        clickProItem(data.data);
    }
}

getPros();

// numberPage(Math.floor((page - 1) / 9) * 9 + 1, 9, true);

// drawPage((page - 1) % 9);