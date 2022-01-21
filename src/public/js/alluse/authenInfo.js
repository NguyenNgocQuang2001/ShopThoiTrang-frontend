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