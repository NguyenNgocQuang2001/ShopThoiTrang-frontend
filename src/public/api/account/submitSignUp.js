const authenPhone = (phone) => {

    var len = phone.length;
    if (len < 10 || len > 11) return false;
    for (let i = 0; i < phone.length; ++i) {

        if (!(phone[i] >= '0' && phone[i] <= '9')) {
            return false;
        }
    }
    return true;
}

const authenEmail = (email) => {

    var emails = email.split('@');
    if (emails.length != 2) {
        return false;
    }
    if (emails[0].length == 0 || emails[1].length == 0) {
        return false;
    }
    return true;
}

const submitSignUp = () => {


    var confirmpassword = $('#register-confirmpassword').val();
    const acc = {

        name : $('#register-name').val().trim(),
        password : $('#register-password').val(),
        email : $('#register-email').val().trim(),
        phone : $('#register-phone').val().trim()
    };

    if (acc.name == '' || acc.password == '' || acc.email == '' || acc.phone == '') {

        return "Bạn chưa điền đầy đủ thông tin";
    }
    if (authenEmail(acc.email) == false) {

        return "Email không hợp lệ";
    }
    
    if (authenPhone(acc.phone) == false) {

        return "Số điện thoại không hợp lệ";
    }
    if (confirmpassword != acc.password) {

        return "Nhập lại mật khẩu sai !!!";
    }

    //console.log($('#login-password').val());
    var result = fetch('http://localhost:9090/signup', {

        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body : JSON.stringify(acc)
    })
    .then(data => {

        //setCookie('token', data, 1);
        return data.json();
    })
    .then(data => {
        //console.log(data);
        //setCookie('token', data.token, 1);
        return data.ans;
        //alert(data.token);
    })
    .catch(err => {
        
        return "loi server !!!";
        //throw err;
    });

    //var token = await data;

    return result;
}