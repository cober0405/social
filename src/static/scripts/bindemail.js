var flag = false;
$(document).ready(function() {
    var isbind = getCookie("isbind");
    //alert("isbind="+isbind)


    /*----------绑定邮箱---------*/
    $("#btn_bind_email").click(function() {
        var email = $("#txt_email").val(),
            code = $("#txt_code").val();
        uuid = getCookie("uid");
        cookieDeviceType = getCookie("deviceType");
        cookieDeviceKey = getCookie("deviceKey");


        var load = layer.load(1);
        if (!checkemail(email)) {
            layer.close(load);
            return false;
        }
        $.ajax({
            url: "https://" + localurl + "/ema-platform/member/bindAccount",
            type: "post",
            dataType: "json",
            data: {
                accountType: 2,
                email: email,
                uid: uuid,
                captcha: code
            },
            error: function() {
                layer.msg("请求失败！")
            },
            success: function(data) {
                layer.msg(data.message);
                layer.close(load);
            }
        });
    });

    var wait = 60;
    $("#getmsgyzm").click(function() {
        var email = $("#txt_email").val();
		var type = "bind";
        var load = layer.load(1);
        if (!checkemail(email)) {
            layer.close(load);
            return false;
        }
        if (wait == 60) {
            $("#mfyz").html(wait + "S");
            $(".btn_dxyzm").addClass("btn_dxyzm_60s");
            var timer1 = setInterval(function() {
                wait--;
                $("#mfyz").html(wait + "S");
                if (wait == 0) {
                    clearInterval(timer1);
                    $("#mfyz").html("重新发送");
                    $(".btn_dxyzm").removeClass("btn_dxyzm_60s");
                    wait = 60;
                }
            }, 1000)

            var email = $("#txt_email").val();
            var load = layer.load(1);

            $.ajax({
                url: "https://" + localurl + "/ema-platform/notice/sendEmailCaptcha",
                type: "post",
                dataType: "json",
                data: {
                    email: email
                },
                error: function() {
                    layer.msg("请求失败！");
                    layer.close(load);
                },
                success: function(data) {
                    layer.msg(data.message);
                    layer.close(load);
                }
            });
        } else {
            layer.msg("请求时间过短！");
            layer.close(load);
        }

    });

    $("#fbtns").on("click", "#bind_change", function() {
        var email = $("#txt_email").val();
        var code = $("#txt_code").val();
        var load = layer.load(1);
        var uuid = getCookie("uid");
        if (!checkemail(email)) {
            layer.close(load);
            return false;
        }
        if (code == "") {
            layer.msg("密码输入有误！");
            layer.close(load);
            return false;
        }
        $.ajax({
            url: "https://" + localurl + "/ema-platform/member/checkBindAccount",
            type: "get",
            dataType: "json",
            data: {
                uid: uuid,
                accountType: "2",
                email: email,
                password: code
            },
            error: function() {
                layer.msg("请求失败！");
                layer.close(load);
            },
            success: function(data) {
                layer.msg(data.message);
                if (data.message == "成功") {
                    layer.msg(data.message);
                    layer.close(load);
                    setTimeout(function() {
                        window.location.href = "bindemail.html?msg=1";
                    }, 1000);
                } else {
                    layer.msg(data.message);
                    layer.close(load);
                }
            }
        });

    })

    var wait = 60;
    $(".menulist").on("click", "#getmsgyzmnew", function() {
        var email = $("#txt_email").val();
        var load = layer.load(1);
        if (!checkemail(email)) {
            layer.close(load);
            return false;
        }
        if (wait == 60) {
            $("#mfyz").html(wait + "S");
            $(".btn_dxyzm").addClass("btn_dxyzm_60s");
            var timer1 = setInterval(function() {
                wait--;
                $("#mfyz").html(wait + "S");
                if (wait == 0) {
                    clearInterval(timer1);
                    $("#mfyz").html("重新发送");
                    $(".btn_dxyzm").removeClass("btn_dxyzm_60s");
                    wait = 60;
                }
            }, 1000)

            var appid = getCookie("appid");
            var email = $("#txt_email").val();
            var load = layer.load(1);
            $.ajax({
                url: "https://" + localurl + "/ema-platform/notice/sendEmailCaptcha",
                type: "post",
                dataType: "json",
                data: {
                    email: email
                },
                error: function() {
                    layer.msg("请求失败！");
                    layer.close(load);
                },
                success: function(data) {
                    layer.msg(data.message);
                    layer.close(load);
                }
            });

        } else {
            layer.msg("请求时间过短！");
            layer.close(load);
        }
    })

    $("#fbtns").on("click", "#bindAccount", function() {
            var email = $("#txt_email").val();
            var code = $("#txt_code").val();
            var load = layer.load(1);
            var uuid = getCookie("uid");
            if (!checkemail(email)) {
                layer.close(load);
                return false;
            }
            if (code == "") {
                layer.msg("验证码不能为空！");
                layer.close(load);
                return false;
            }
            var load = layer.load(1);
            $.ajax({
                url: "https://" + localurl + "/ema-platform/member/bindAccount",
                type: "post",
                dataType: "json",
                data: {
                    uid: uuid,
                    accountType: "2",
                    email: email,
                    captcha: code
                },
                error: function() {
                    layer.msg("请求失败！");
                    layer.close(load);
                },
                success: function(data) {
                    layer.msg(data.message);
                    if (data.message == "成功") {
                        layer.msg(data.message);
                        setTimeout(function() {
                            layer.close(load);
                            window.location.href = "userinfo.html";
                        }, 1000);
                    } else {
                        layer.msg(data.message);
                        layer.close(load);
                    }
                }
            });

        })
});

function checkemail(phonenume) //验证手机号码
{
    if (phonenume == '') {
        layer.msg("请输入正确的邮箱");
        return false;
    }
    var emailtest = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailtest.test(phonenume)) {
        layer.msg("请输入正确的邮箱");
        return false;
    }
    return true;
}

function checkphone(mobile) {
    var load = layer.load(1);
    $.ajax({
        url: "https://passport." + weburl + "/index.php/register/check_loginname?loginname=" + encodeURIComponent(mobile),
        type: "get",
        dataType: "jsonp",
        error: function() { layer.msg("请求失败！") },
        success: function(data) {
            if (data.retcode == 1000) {
                layer.msg("您还未登录！");
            } else {
                if (data.is_true != 2) //帐号已存在
                {
                    layer.msg("该手机号码已被绑定！");
                } else {
                    flag = true;
                }
            }
            layer.close(load);
        }
    });
}
