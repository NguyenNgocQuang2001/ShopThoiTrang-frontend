var infor = "";
var save = false;
var open = false;


$('div#myProfile').css("background-color", "red");
function setUpdateInfor() {

    var exist = [

        {
            $match : {

                account_id : {
                    $ne : infor
                },
                $or : [
                    {
                        username : $('input#fname1').val()
                    },
                    {
                        phone : $('input#fname3').val()
                    }
                ]
            }
        },
        {
            $project : {

                username : 1,
                name : 1,
                address : 1,
                email : 1,
                phone : 1,
                birthday : 1,
                pathimg : 1,
                sex : 1
            }
        }
    ];
    if ($('input#fname4').val() && $('input#fname4').val() != "") {
        exist[0]['$match']['$or'].push({
            email : $('input#fname4').val()
        })
    }
    var sex = true;
    // console.log($('input#fname6').prop('checked'));
    // console.log($('input#fname5').prop('checked'));
    if ($('input#fname6').prop('checked') == true) {
        sex = false;
    }
    var filter = {

        account_id : infor
    }
    var fix = {

        $set : {

            username : $('input#fname1').val(),
            name : $('input#fname2').val(),
            phone : $('input#fname3').val(),
            email : $('input#fname4').val(),
            sex : sex,
            birthday : new Date($('input#fname7').val()),
            address : $('input#fname8').val()
        }
    }

    var data = {

        exist : exist,
        filter : filter,
        fix : fix
    }
    return data;
}

function checkInfo() {

    var email = $('input#fname4').val();
    var phone = $('input#fname3').val();
    var user = $('input#fname4').val().trim();
    if (email && email != '') {
        if (authenEmail(email) == false) {
            return "Email không hợp lệ !!!";
        }
    }
    if (authenPhone(phone) == false) {
        return "Số điện thoại không hợp lệ !!!";
    }
    if (user == null || user == "") {

        return "Tên người dùng không hợp lệ !!!";
    }
    return true;
}

async function fixinfo() {

    if (save == false) {
        save = true;
        $('div#myAcc-notify').css("display", "none");
        $('div#fixinfo').text('Lưu');
        $('div#input-info input').prop('disabled', false);
    } else {

        save = false;
        //console.log(setUpdateInfor());
        //fixinfo(setUpdateInfor());
        //console.log(checkInfo());

        if (checkInfo() == true) {

            var result = await fixInfo(setUpdateInfor());
            //console.log(result);
            $('div#myAcc-notify').text(result.notify);
            if (result.notify == "Cập nhật thành công !!!") {

                setCookie("user", $('input#fname1').val(), 1);
            }
        } else {

            $('div#myAcc-notify').text(checkInfo());
        }
        $('div#myAcc-notify').css("display", "block");
        $('div#fixinfo').text('Chỉnh sửa');
        $('div#input-info input').prop('disabled', true);
    }
}

function gioitinhnam() {

    $('#fname6').prop("checked", false);
}

function gioitinhnu() {

    $('#fname5').prop("checked", false);
}

function chooseImg(fileinput) {

    if (fileinput.files && fileinput.files[0]) {

        // console.log(fileinput);
        // console.log(fileinput.files);
        // console.log(fileinput.files[0]);
        var reader = new FileReader();

        reader.onload = function (e) {

            $('img#represent').attr('src', e.target.result);
        }
        reader.readAsDataURL(fileinput.files[0]);

        // var data = { 
        //     "avatar" : fileinput.files[0],
        //     "nodejs" : "hello"
        // }

        //console.log(fileinput.files[0]);
        var data = { 
            "avatar" : fileinput.files[0],
            "username" : window.location.pathname.split('/')[2],
            "token" : getCookie('token')
        }

        updateInfo(data);
    }
}

function setData() {

    var data = [

        {
            $match : {

                username : window.location.pathname.split('/')[2]
            }
        },
        {
            $project : {

                username : 1,
                name : 1,
                address : 1,
                email : 1,
                phone : 1,
                birthday : 1,
                pathimg : 1,
                sex : 1,
                account_id : 1
            }
        }
    ];
    return data;
}

function setInfo(data) {

    //console.log(data);
    var birthday = "";
    if (data.birthday) {
        birthday = new Date(data.birthday).toISOString().slice(0,10);
        //console.log(new Date(data.birthday).toISOString());
        //birthday = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }
    $('input#fname1').val(data.username);
    $('input#fname2').val(data.name || "");
    $('input#fname3').val(data.phone);
    $('input#fname4').val(data.email || "");
    $('input#fname7').val(birthday);
    $('input#fname8').val(data.address || "");
    var sex = true;
    if (data.sex != null && data.sex == false) {
        sex = false;
    }
    if (sex == true) {
        $('input#fname5').prop("checked", true);
        $('input#fname6').prop("checked", false);
    } else {
        $('input#fname5').prop("checked", false);
        $('input#fname6').prop("checked", true);
    }
    var pathimage = '/images/avatar.png';
    if (data.pathimg && data.pathimg != '') {

        pathimage = "http://localhost:9090/" + data.pathimg;
    }
    $('img#represent').prop("src", pathimage);
    //console.log(data.pathimg);
    infor = data.account_id;
}



async function takePhoto() {

    if (open == false) {

        open = true;
        $('label#loadbycamera').text('Chụp');
        $('video#videobycamera').css("display", "block");
        $('img#represent').css("display", "none");
        var stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        $('video#videobycamera').prop('srcObject', stream);
    } else {

        open = false;
        $('label#loadbycamera').text('Chụp ảnh');
        $('video#videobycamera').css("display", "none");
        $('img#represent').css("display", "block");
        //$('canvas#canvasforvideo').css("display", "block");
        var canvas = document.getElementById('canvasforvideo');
        var video = document.getElementById('videobycamera');
        canvas.getContext('2d').drawImage(video, 120, 0, 400, 450, 0, 0, 400, 450);
        let image_data_url = canvas.toDataURL('image/png');
        $('img#represent').prop('src', image_data_url);
        const mediaStream = video.srcObject;
        const tracks = mediaStream.getTracks();
        // console.log(tracks);
        tracks[0].stop();
        //tracks.forEach(track => track.stop())
        var data = { 
            "avatar" : dataURLtoFile(image_data_url, "imageCapbyCamera.png"),
            "username" : window.location.pathname.split('/')[2],
            "token" : getCookie('token')
        }

        // console.log($('video#videobycamera').position());
        // console.log(video.videoWidth);
        // console.log(video.videoHeight);
        // console.log($('video#videobycamera').offset());
        updateInfo(data);
        //console.log(dataURLtoFile(image_data_url, "imageCapbyCamera.png"));
    }

}

async function getInformation() {

    var data = await getInfo(setData());
    setInfo(data.data[0]);
    //console.log(data);
}

getInformation();