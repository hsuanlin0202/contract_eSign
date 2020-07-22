let login_c = false;
const log_btn = $('#login');
const branch_box = $('#branch_box');

$(document).ready(function () {
    $('#branch_box').hide();
    $('#username_box').hide();
    $('#error').hide();
});

const ontype = () => {
    if ($('#userid').val().length >= 4 && $('#userpw').val().length >= 6) {
        log_btn.removeClass("disable");
        log_btn.addClass("able");
        login_c = true;
    }
};
$("#login").click(function () {
    if (login_c == true) {
        $('#userid_show').html($('#userid').val());
        $('#user_box').hide();
        $('#pw_box').hide();
        $('#error').hide();
        $('#username_box').show();
        $('#branch_box').show();
        //location.href = 'signature.html';
    }
})