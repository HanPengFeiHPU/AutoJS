// 九价

// 需要手动选择待约医院，再执行程序。
// var appName = "微信";
var second = 1000;
// // 启动目标软件
// launchApp(appName);
// sleep(5*second);

// 注意不刷新、定位按钮后不动页，最后会有滑动验证

function run2() {
    console.show();
    sleep(2 * second);

    var j = 0;
    var butn = [810,1683,1038,1770]; // 运行前先设置要点击的按钮
    var lable1 = "疫苗预约";
    var lable2 = "选择接种时间";
    var lable3 = "填写预约信息";
    while (true) {

        reload();
        var sec = new Date().getSeconds();
        console.log(sec);
        if(sec < 5 && !text(lable2).exists()){
            // console.log("刷新");
            swipe(800,500,800,1200,500);
            sleep(1*second);
        }
        // 点击立即预约
        if(text(lable1).exists() && !text(lable2).exists()){
            console.log("点击立即预约");
            click(butn[0], butn[1], butn[2], butn[3]);
            sleep(0.1*second);
            reload();
        }

        // 可预约时间
        if (text("可预约").exists()) {
            canYY = text("可预约").untilFind();
            sleep(0.1*second);
            // 点击可预约
            console.log("点击可预约",canYY.length);
            if(canYY.length>1 && !text("预约").exists()){
                while (!canYY[1].click());
            }
            if(canYY.length==1 && !text("预约").exists()){
                while (!canYY[0].click());
            }
            sleep(0.2*second);
            // reload();

            
            if(text("预约").exists() && !text(lable3).exists()){
                // 点击预约
                console.log("点击预约");
                while (!text("预约").findOne().click());
                sleep(0.2*second);
                // reload();
            }
        }

        if(text("确定预约").exists()){
            // 确定预约
            console.log("确定预约");
            while (!text("确定预约").findOne().click());
            sleep(10 * second);
            break;
        }

        j += 1;
    }
}

function reload() {
    if (text("重新加载").exists()) {
        while (!text("重新加载").click());
        console.log("重新加载");
    }
}

run2();