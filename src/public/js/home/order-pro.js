var imgchoice = 0;
var allslide = 0;
var allpro = 0;

function setDetailData() {

    var data = {

        skippage : 0,
        limitdata : 1,
        filter : [
            {
                $match : {
                    product_id : window.location.pathname.split('/')[2].split("_")[1]
                }
            },
            {
                $project : {
    
                    name : 1,
                    cost : 1,
                    sale : 1,
                    sold : 1,
                    pathimage : 1,
                    quantily : 1,
                    description : 1

                }
            }
        ]
    }
    return data;
}

function createSlide(data) {

    var len = data.length;
    for (let i = 0; i < len; ++i) {

        var pathimg = 'http://localhost:9090' + data[i];
        var imgitem = $(`
            <div class="allimg-item">
                <img src="${pathimg}">
            </div>
        `);
        $('div#allimg').append(imgitem);
    }
}

function setSizeImgShow() {

    var szwidth =  $('div#show1').width();
    var szheight =  $('div#show1').height();
    $('div#show1 > img').eq(0).width(szwidth).height(szheight);
}

function setSizeImg() {

    var len = $('div.allimg-item').length;
    var hide = Math.floor(imgchoice / 4) * 4;
    //szwidth =  $('div#allimg').width();
    szheight =  $('div#allimg').height();
    for (let i = 0; i < len; ++i) {
        $('div.allimg-item > img').eq(i).width(szheight).height(szheight);
        $('div.allimg-item').eq(i).width(szheight).height(szheight);
        $('div.allimg-item').eq(i).css("border", "none");
        if (i < hide) {
            $('div.allimg-item').eq(i).css("display", "none");
        } else {
            $('div.allimg-item').eq(i).css("display", "block");
        }
    }
    $('div.allimg-item > img').eq(imgchoice).width(szheight - 6).height(szheight - 6);
    $('div.allimg-item').eq(imgchoice).width(szheight - 6).height(szheight - 6);
    $('div.allimg-item').eq(imgchoice).css("border", "3px solid rgb(255, 0, 0)");
}

function imgSlideClick() {

    var len = $('div.allimg-item').length;
    for (let i = 0; i < len; ++i) {

        $('div.allimg-item').eq(i).click(function() {

            imgchoice = i;
            setSizeImg();
            var srcImgChoice = $('div.allimg-item > img').eq(i).prop('src');
            $('div#show1 > img').eq(0).prop("src", srcImgChoice);
        });
    }
}

function toLeft() {

    imgchoice -= 1;
    if (imgchoice < 0) {
        imgchoice += allslide;
    }
    setSizeImg();
    var srcImgChoice = $('div.allimg-item > img').eq(imgchoice).prop('src');
    $('div#show1 > img').eq(0).prop("src", srcImgChoice);
}

function toRight() {

    imgchoice += 1;
    if (imgchoice >= allslide) {
        imgchoice -= allslide;
    }
    setSizeImg();
    var srcImgChoice = $('div.allimg-item > img').eq(imgchoice).prop('src');
    $('div#show1 > img').eq(0).prop("src", srcImgChoice);
}

function setOrder(data) {

    $('#quan-input > input').eq(0).val(1);
    $('#description').text(data.description);
    $('#sold').text(`Đã bán : ${data.sold}`);
    $('#sale').text(`Sale : ${data.sale}%`);
    $('#oldcost').text(`${data.cost}.000đ`);
    $('#newcost').text(`${Math.floor(data.cost * (100 - data.sale) / 100)}.000đ`);
    $('#quan-rest').text(`Số lượng sản phẩm còn trong kho : ${data.quantily}`);
}

function minusPro() {

    var quan = Number($('#quan-input > input').eq(0).val());
    if (quan && quan != '' && quan > 0) {

        $('#quan-input > input').eq(0).val(quan - 1);
    } else {

        $('#quan-input > input').eq(0).val(0);
    }
}

function plusPro() {

    var quan = Number($('#quan-input > input').eq(0).val());
    if (quan && quan != '') {

        if (quan < allpro) {
            $('#quan-input > input').eq(0).val(quan + 1);
        }
    } else {

        $('#quan-input > input').eq(0).val(1);
    }
}

async function getDetailData() {

    var data = await getProducts(setDetailData());
    //console.log(data.data);
    allslide = data.data[0].pathimage.length;
    allpro = data.data[0].quantily;
    $('div#show1 > img').eq(0).prop("src", 'http://localhost:9090' + data.data[0].pathimage[0]);
    createSlide(data.data[0].pathimage);
    setSizeImg();
    imgSlideClick();
    setOrder(data.data[0]);
}

setSizeImgShow();
getDetailData();