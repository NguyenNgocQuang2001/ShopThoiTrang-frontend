var totalcost = 0;
$('div#myCart').css("background-color", "red");

function showCart(data) {

    var len = data.length;
    for (var i = 0; i < len; ++i) {

        var newcart = $(`
        <div class="neworder">
            <div class="order-oke">
                <input type="checkbox">
            </div>
            <img id="" src=${'http://localhost:9090' + data[i].pathimg_pro}>
            <div class="order-pro">
                <div class="name-pro">
                    ${data[i].name_pro}
                </div>
                <div class="cost-pro">${data[i].cost_pro}.000đ</div>
                <div class="quan-pro">Số lượng : ${data[i].quantily}</div>
            </div>
            <div class="id-pro">${data[i].product_id}</div>
            <div class="path-pro">${data[i].path_pro}</div>
            <div class="delete-order">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        `);
        $('div#body-cart').append(newcart);
    }
}

function setCost() {

    totalcost = 0;
    var len = $('div.cost-pro').length;
    for (var i = 0; i < len; ++i) {

        //console.log($('div.neworder').eq(i).css("display"));
        if ($('div.neworder').eq(i).css("display") == "none"
            || $('div.order-oke > input').eq(i).prop("checked") == false) {
            continue;
        }
        var costpro = Number($('div.cost-pro').eq(i).text().split('.')[0]);
        var quan = $('div.quan-pro').eq(i).text();
        quan = Number(quan.substring(11, quan.length));
        totalcost += quan * costpro;
    }

    //console.log(totalcost);

    $('div#order-box-cost').text('Tổng tiền : ' + totalcost + '.000đ');
}

function choiceCart() {

    var len = $('div.order-oke').length;
    for (var i = 0; i < len; ++i) {

        $('div.order-oke > input').eq(i).click(function() {

            setCost();
        });
    }
}

function originPro() {

    var len = $('div.neworder').length;
    for (var i = 0; i < len; ++i) {

        $('div.neworder > img').eq(i).click(function() {

            window.location.pathname = $(this).parents('div.neworder').find('div.path-pro').eq(0).text();
            //console.log($(this).parents('div.neworder').find('div.path-pro').eq(0).text());
        });
    }
}

function delCart() {

    var len = $('div.delete-order').length;
    for (var i = 0; i < len; ++i) {

        $('div.delete-order').eq(i).click(async function() {

            var idpro = $(this).parents('div.neworder').find('div.id-pro').eq(0).text();
            $(this).parents('div.neworder').css("display", "none");
            setCost();
            var result = await deleteCart({ product_id : idpro});
        });
    }
}

function countOrder() {

    var len = $('div.order-oke').length;
    var cnt = 0;
    for (var i = 0; i < len; ++i) {

        var check = $('div.order-oke > input').eq(i).prop("checked");
        if (check == true) {

            cnt += 1;
        }
    }

    return cnt;
}

function setData() {

    var data = [

        {
            $match : {

                username : getCookie('user')
            }
        },
        {
            $project : {

                name : 1,
                address : 1,
                phone : 1
            }
        }
    ];
    return data;
}

function makeArrayId() {

    var len = $('div.order-oke').length;
    var data = [];
    for (var i = 0; i < len; ++i) {

        var check = $('div.order-oke > input').eq(i).prop("checked");
        if (check == true) {

            var product_id = $('div.id-pro').eq(i).text().trim();
            //console.log(product_id);
            data.push(product_id);
        }
    }

    return data;
}

function setAllIdPro() {

    var filter = {

        product_id : {

            $in : makeArrayId()
        }
    }

    return filter;
}

function setOrderInfo(data) {

    $('input#cname1').val(data.name);
    $('input#cname2').val(data.phone);
    $('input#cname3').val(data.address);
    $('input#cname4').val(makeName("").trim());
}

function createNewOrder(arrayId) {

    var data = {

        orderId : $('input#cname4').val().trim(),
        createDate : Date.now(),
        shippedDate : null,
        status : "Đang chờ xác nhận",
        orderCost : totalcost,
        orderDetail : arrayId,
        receiver : $('input#cname1').val().trim(),
        phone : $('input#cname2').val().trim(),
        address : $('input#cname3').val().trim()
    }

    return data;
}

async function clickOrder() {

    //console.log($('div#order-box-oke').text().trim());
    if ($('div#order-box-oke').text().trim() == "Đặt hàng") {

        var cnt = countOrder();
        if (cnt > 0) {

            $('div.neworder').css("display", "none");
            $('div#cart-notify').css("display", "none");
            $('div#info-order').css("display", "flex");
            $('div#order-box-oke').text('Oke');
            var data = await getInfo(setData());
            //console.log(data.data[0]);
            setOrderInfo(data.data[0]);
        } else {
            $('div#info-order').css("display", "none");
        }
    } else {

        var name = $('input#cname1').val().trim();
        var phone = $('input#cname2').val().trim();
        var address = $('input#cname3').val().trim();
        if (authenPhone(phone) == false) {

            $('div#notify-info-order').text("Số điện thoại không hợp lệ !!!");
            $('div#notify-info-order').css("display", "block");
        } else if (name.length == 0 || address.length == 0) {

            $('div#notify-info-order').text("Bạn cần điền đầy đủ thông tin !!!");
            $('div#notify-info-order').css("display", "block");
        } else {

            //console.log(setAllIdPro());
            var result = await getCart(setAllIdPro());
            console.log(result.data);
            result = await addOrder(createNewOrder(result.data));
            result = await deleteCarts(setAllIdPro());
            window.location.pathname = '/profile/order';
        }

        //window.location.pathname = '/profile/order';
    }
}

async function getAllCart() {

    var data = await getCart({});

    //console.log(data);

    if (data.data.length > 0) {

        $('div#cart-notify').css("display", "none");
        showCart(data.data);
        delCart();
        choiceCart();
        originPro();
        //setCost();
    } else {
        $('div#cart-notify').css("display", "block");
    }

}


getAllCart();