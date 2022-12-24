// 青藤之恋，访问关注用户
// 手动进入用户列表

function run() {
    console.show();
    var currentNum = 0;
    var ignorePerson = [];
    var second = 1000;
    var personNum = 50; // 超参，关注人数
    var visitTimes = 5; // 超参，访问次数
    console.log("手动进入已关注用户列表");
    sleep(10 * second);

    while (true) {
        if (id("nickname").exists()) {
            var names = id("nickname").find();
            var lables = id("basic_info").find();
            var minNum = names.length;
            if (names.length < lables.length) {
                minNum = names.length;
            } else {
                minNum = lables.length;
            }

            for (var i = 0; i < minNum; i++) {

                var index = ignorePerson.indexOf(names.get(i).text());
                if (index == -1) {
                    var temp = lables.get(i).text();
                    ignorePerson[ignorePerson.length] = names.get(i).text(); // 加入跳过人员名单中

                    currentNum += 1;
                    // 访问用户
                    if (click(names.get(i).text())) {
                        console.log(currentNum + "/" + personNum, "访问：", names.get(i).text(), temp);
                        for (var swipeNum = 0; swipeNum < 3; swipeNum++) {
                            sleep(2 * second);
                            swipe(60, device.height - 500, 60, device.height / 4, second);
                        }
                        back();
                    }
                    sleep(2 * second);
                }
                // 访问指定次数后，停止程序
                if (visitTimes < 0) {
                    console.log("完成");
                    engines.stopAllAndToast(); // 停止正在运行的脚本
                }
                // 向上滑动至首
                if (currentNum >= personNum) {
                    for (var dropdown = 0; dropdown < currentNum; dropdown++) {
                        swipe(device.width - 60, device.height / 4, device.width - 60, device.height - 500, second);
                        // sleep(0.1*second);
                    }
                    currentNum = 0;
                    ignorePerson = [];
                    visitTimes -= 1;
                }
            }

            swipe(60, device.height - 500, 60, device.height / 4, second);

            if (text("唠唠").exists()) {
                back();
                sleep(second);
            }

        } else {
            if (text("分享给好友").exists()) {
                back();
                sleep(second);
                continue;
            }
            if (!text("村口").exists() && !text("唠唠").exists() && !text("解锁匿名身份").exists()) {
                console.log("停止");
                engines.stopAllAndToast(); // 停止正在运行的脚本
                break;
            }
            console.log("异常");
            // 防止死锁
            click("年");
            sleep(2 * second);
            back();
            sleep(2 * second);

            if (!text("村口").exists() || !text("唠唠").exists()) {
                back();
                sleep(second);
            }
        }
    }
}

run();