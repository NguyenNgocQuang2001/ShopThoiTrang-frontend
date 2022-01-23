$("div#myOrder").css("background", "red");

function comebackOrder() {

    $("div.new-Order-detail").remove();
    $('div#box-in-detail').css('display', "none");
    $('div#information-detail').css("display", "none");
    $("div.new-Order").css("display", "flex");
}

async function cancelOrder() {

    var orderId = $('div#information-detail > div.id-order').eq(0).text().trim();
    orderId = orderId.substring(14, orderId.length);
    var result = await deleteOrder({orderId : orderId});
    window.location.pathname = "/profile/order";
}
function showOrderDetail() {

    var len = $("div.new-Order").length;
    for (var i = 0; i < len; ++i) {

        $("div.new-Order > img").eq(i).click(async function() {

            $('div#box-in-detail').css('display', "flex");
            $("div.new-Order").css("display", "none");
            $('div#information-detail').css("display", "block");
            var odId = $(this).parents("div.new-Order").find("div.id-order").eq(0).text().trim();
            var costod = $(this).parents("div.new-Order").find("div.cost-order").eq(0).text().trim();
            var statusod = $(this).parents("div.new-Order").find("div.status-order").eq(0).text().trim();
            var receiver = $(this).parents("div.new-Order").find("p.order-receiver").eq(0).text().trim();
            var phone = $(this).parents("div.new-Order").find("p.order-phone").eq(0).text().trim();
            var address = $(this).parents("div.new-Order").find("p.order-address").eq(0).text().trim();
            $('div#information-detail > div.id-order').eq(0).text(odId);
            $('div#information-detail > div.cost-order').eq(0).text(costod);
            $('div#information-detail > div.status-order').eq(0).text(statusod);
            $('p#order-receiver').text(receiver);
            $('p#order-phone').text(phone);
            $('p#order-address').text(address);

            odId = odId.substring(14, odId.length);
            //console.log(odId);
            var result = await getOrder({ orderId : odId });
            //console.log(result);
            result = result.data[0].orderDetail;
            var leng = result.length;
            for (var j = 0; j < leng; ++j) {

                var item = $(`
                <div class="new-Order-detail">
                    <img src=${'http://localhost:9090' + result[j].pathimg_pro}>
                    <div class="order-information-detail">
                        <div class="name-pro-detail">
                            ${result[j].name_pro}
                        </div>
                        <div class="cost-pro-detail">
                            ${result[j].cost_pro}.000đ
                        </div>
                        <div class="quan-pro-detail">
                            Số lượng : ${result[j].quantily}
                        </div>
                    </div>
                </div>
                `);

                $('div#body-order').append(item);
            }
        });
    }
}

function showAllOrder(data) {

    //console.log(data);
    var len = data.length;
    for (var i = 0; i < len; ++i) {

        var item = $(`
        <div class="new-Order">
            <img src="/images/shipper.jpg">
            <div class="order-information">
                <div class="id-order">
                    Mã Đơn Hàng : ${data[i].orderId}
                </div>
                <div class="cost-order">
                    Giá trị đơn hàng : ${data[i].orderCost}.000đ
                </div>
                <div class="status-order">
                    Trạng thái : ${data[i].status}
                </div>
                <p class="order-receiver">
                    Người nhận : ${data[i].receiver}
                </p>
                <p class="order-phone">
                    Số điện thoại : ${data[i].phone}
                </p>
                <p class="order-address">
                    Địa chỉ : ${data[i].address}
                </p>
            </div>
        </div>
        `);

        $('div#body-order').append(item);
    }
}

async function getAllOrder() {

    var data = await getOrder({});
    if (data.data.length > 0) {

        showAllOrder(data.data);
        $('div#order-notify').css("display", "none");
        showOrderDetail();
    } else {

        $('div#order-notify').css("display", "block");
    }
}

getAllOrder();