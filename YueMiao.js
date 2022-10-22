// 九价疫苗
auto.waitFor();

var appName = "约苗";
// 启动目标软件
launchApp(appName);

sleep(3000); // 设置等待时间，以免启动太慢

function run() {

    console.show();

    var i = 0;

    while (true) {
        i += 1;
        var button = id("button6").findOne();
        if (button) {
            button.click();

            console.log("if中已执行" + i + "次");
            click("提交订单");
            // 选择日期

            // 选择时间
            click("预约时间");
            click("08:30~17:00");
            click("提交预约");
            continue;
        } else {

            click("提交订单");
            // 选择日期

            // 选择时间
            click("预约时间");
            click("08:30~17:00");
            click("提交预约");
            console.log("else中已执行" + i + "次");
            break
        }
    }
}
run();