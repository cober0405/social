/**
 * Created by Administrator on 2017/5/17.
 */
var app = new Vue({
    el: '#app',
    data: {
        accountId: '',
        binfo: '',
        prize10: '',
        boxId: '',
        prizeList: '',
        lotteryType: ''
    },
    methods: {
        getuserinfo: function () {
            if (app.accountId) {
                $.ajax({
                    type: 'POST',
                    url: "/api/active_getinfo",
                    data: {
                        accountId: app.accountId
                    },
                    success: function (data) {
                        try {
                            app.binfo = data.data;
                        } catch (err) {
                        }
                    }
                });
            }
        },
        getlrecentlylist_10: function () {
            $.ajax({
                type: 'POST',
                url: "/api/geTenWinningList",
                data: {},
                success: function (data) {
                    try {
                        // console.log(data);
                        app.prize10 = data.data;
                        $('#scrollmessage ul').html('');
                        var strhtml = "";
                        for (var i = 0; i < app.prize10.length; i++) {
                            strhtml = strhtml + '<li><p><span class="sever">' + app.prize10[i].nickName + '</span><span class="name"> ' + '' + ' </span> 抽到 <span class="jiang"> ' + app.prize10[i].prizeName + ' </span> <span class="gang">' + app.prize10[i].time.substring(5, 16) + '</span></p></li>';
                        }
                        $('#scrollmessage ul').html(strhtml);
                    } catch (err) {
                    }
                }
            });
        },
        chooseTicket: function () {
            $('#commonTicket').click(function () {
                var thishasquan = $(this).hasClass('box-shadow1');
                if (thishasquan) {
                    $(this).removeClass('box-shadow1');
                } else {
                    $('#seniorTicket').removeClass('box-shadow1');
                    $(this).addClass('box-shadow1');
                    app.lotteryType = "1";
                }
            });
            $('#seniorTicket').click(function () {
                var thishasquan = $(this).hasClass('box-shadow1');
                if (thishasquan) {
                    $(this).removeClass('box-shadow1');
                } else {
                    $('#commonTicket').removeClass('box-shadow1');
                    $(this).addClass('box-shadow1');
                    app.lotteryType = "2";
                }
            });
        },
        startPrize: function () {
            $('.spades').click(function () {
                var ticket = $('.quan').hasClass('box-shadow1');
                if (ticket) {
                    // 获取该张的索引
                    var index = $(this).index();
                    var th = $(this);
                    if (app.binfo.lottery2 < 1) {
                        layer.msg("该类型的券已经用完！");
                        return false;
                    }
                    if ($(this).hasClass('fanpaisign')) {
                        layer.msg("该张牌已经被抽过！");
                        return false;
                    } else {
                        //30s后接口异常，自动停止
                        var errtime = 0;
                        var timeouterr = setInterval(function () {
                            if (errtime == 30) {
                                layer.msg("网络异常,请稍候再试！");
                                setTimeout(function () {
                                    window.location.reload();
                                }, 3000)
                            }
                            errtime = errtime + 1;
                        }, 1000);

                        $.ajax({
                            type: 'POST',
                            url: "/api/startLuckDrawData",
                            data: {
                                accountId: app.accountId,
                                boxId: app.boxId,
                                lotteryType: app.lotteryType
                            },
                            success: function (data) {

                                if (data == "error_goto_user") {
                                    layer.msg("登录出现异常，请重新登录！");
                                    util.delCookie("squid");//ddd
                                    util.delCookie("token");
                                    util.delCookie("accountId_shequ");
                                    setTimeout(function () {
                                        location.href = "/users";
                                    }, 1000)
                                }

                                try {
                                    var prizeid = data.data.prizeId;
                                    if (typeof(prizeid) == 'number') {
                                        $('.card').css('opacity', '0');
                                        th.css('opacity', '1');
                                        th.addClass('fanpai');
                                        th.addClass('fanpaisign');
                                        setTimeout(function () {
                                            th.removeClass('fanpai').addClass('fanpai1');
                                        }, 500)
                                        setTimeout(function () {
                                            th.find('.face').addClass('changeimg');
                                            th.css({
                                                "transform": " " + th[0].style.transform + " rotate3d(0, 1, 0, 180deg) scale(1.05,1.05)"
                                            });
                                        }, 100)
                                        setTimeout(function () {
                                            th.css({
                                                "transform": " " + th[0].style.transform + " rotate3d(0, 1, 0, 180deg) scale(1.0,1.0)"
                                            });
                                        }, 200)
                                        setTimeout(function () {
                                            $('.card').css('opacity', '1');
                                        }, 700)
                                        setTimeout(function () {
                                            $('#prizedot').html("恭喜你中了" + prizeid + '，额外赠送送伍周的胖次');
                                            clearInterval(timeouterr);
                                            $('.gainingmask').show();
                                        }, 1000)
                                        app.getuserinfo();
                                        app.getlrecentlylist_10();
                                    }
                                } catch (err) {
                                    alert();
                                }
                            }, error: function (data) {
                                console.log(data);
                                layer.msg("网络出现错误，请稍后再试！");
                            }
                        });
                    }
                } else {
                    layer.msg("请先选择一张券！");
                    return false;
                }
            })


        }


    }
})

app.accountId = util.getCookie("accountId_shequ");
app.boxId = '2';
app.getuserinfo();
app.getlrecentlylist_10();
app.chooseTicket();
app.startPrize();

//关闭添加精英券按钮
$('#addS-close').click(function () {
    $('.addSenior').hide();
})
//使用平台币购买
$('#btn-addpfb').click(function () {
    adds.getuserdata();
})

//中奖后close
$('.gainingmask .gbtn').click(function () {
    $('.gainingmask').hide();
})