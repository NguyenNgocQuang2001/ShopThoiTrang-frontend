function clickProItem() {

    $('div.product-items').click(function() {

        var name = $(this).find('div.pro-name').eq(0).text().trim();
        window.location.href = '/product/' + name;
    });
}

function sizeImg() {

    var allimg = $('div.product-items > img').length;
    for (let i = 0; i < allimg; ++i) {

        var szwidth =  $('div.product-items > img').eq(i).parents('div.product-items').eq(0).width();
        var szheight =  $('div.product-items > img').eq(i).parents('div.product-items').eq(0).height();
        $('div.product-items > img').eq(i).width(szwidth).height(szheight * 0.8);
        //$('div.product-items > img').eq(i).height(szheight * 0.8);
        //console.log(szwidth);
        //console.log(szheight);
        /*$('div.product-items > img').eq(i).css({
            
            "width" : szwidth + 'px',
            "height" : szheight * 0.8 + 'px'
        });*/
    }
}

function setPathImage(data) {

    // var data = await getProducts(setData());
    // console.log(data);

    if (data && data.length > 0) {
        
        $('div#header-body').height(1000);
        $('div#product').css("display", "grid");
        $('div#not-found').css("display", "none");
        for (let i = 0; i < data.length; ++i) {

            var proitem = $(`
                <div class="product-items">
                    <img src= "${'http://localhost:9090' + data[i].pathimage[0]}">
                    <div class="pro-name">
                        ${data[i].name}
                    </div>
                    <div class="price">
                        <div class="sale">
                            ${data[i].cost}K
                        </div>
                        <div class="cost">
                            &emsp;${ Math.floor(data[i].cost * (100 - data[i].sale) / 100)}K
                        </div>
                    </div>
                </div>
            `);
            $('#product').append(proitem);
        }
    } else {
        $('div#header-body').height(700);
        $('div#product').css("display", "block");
        $('div#not-found').css("display", "block");
    }
}

// setPathImage(data);

// sizeImg();