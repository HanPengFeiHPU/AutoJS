// 九价

// 需要手动选择待约医院，再执行程序。
// var appName = "微信";
var second = 1000;
// // 启动目标软件
// launchApp(appName);
// sleep(5*second);

function run() {
    console.show();
    sleep(2 * second);

    var i = 0;
    var start = false;
    var reload = false;
    var notStart = false;
    while (true) {

        if (text("立即预约").exists()) {
            // 抢排在第一位的疫苗
            start = text("立即预约").findOne().click();
            if (start) {
                while (!text("可预约").findOne().click());
                while (!text("预约").findOne().click());
                while (!text("确定预约").findOne().click());
            }
        }

        if(text("暂未开始").exists()){
            notStart = text("暂未开始").findOne().click();
        }

        if(text("重新加载").exists()){
            reload = click("重新加载");
        }

        console.log("第" + i + "次:", start, notStart,reload);
        i += 1;
    }
}

run();