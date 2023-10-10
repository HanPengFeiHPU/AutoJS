// 钉钉打卡

var sec = 1000;
var minute = 60 * sec;
var hour = 60 * minute;
var tryTimes = 0;

function main() {
    console.show();
    var target_1 = "工作台";
    var target_2 = "考勤打卡";
    var target_3 = "上班打卡";
    var target_4 = "下班打卡";
    var isClick = false;

    while (true) {
        var currentTime = new Date();
        console.log("当前时间：", currentTime.getHours(), " : ", currentTime.getMinutes());
        if (
            isClick == false
            && ((currentTime.getHours() > 8 && currentTime.getHours() < 9)
            ||(currentTime.getHours()>17 && currentTime.getHours() < 22))
        ) {
            var app = '钉钉';
            var temp = launchApp(app);
            if (temp) {
                console.log("钉钉已启动");
                tryTimes = 0;
                sleep(2 * sec);
                // 找到“工作台”
                var findTarget_1 = text(target_1).find();
                if (findTarget_1 != null) {
                    console.log("找到--" + target_1);
                    click(target_1);
                    sleep(sec);
                } else {
                    console.log("未找到--" + target_1);
                }
                
                // 找到“考勤打卡”
                var findTarget_2 = text(target_2).find();
                if (findTarget_2 != null) {
                    console.log("找到--" + target_2);
                    click(target_2);
                    sleep(sec);
                } else {
                    console.log("未找到--" + target_2);
                }

                // 上班打卡
                if (
                    currentTime.getHours() == 8
                    && currentTime.getMinutes() > 5
                    && currentTime.getMinutes() < 28
                    && isClick == false
                ) {
                    var findTarget_3 = text(target_3).find();
                    if (findTarget_3 != null) {
                        console.log("找到--" + target_3);
                        click(target_3);
                        isClick = true;
                        sleep(sec);
                    } else {
                        console.log("未找到--" + target_3);
                    }
                }

                // 下班打卡
                if (
                    currentTime.getHours() < 22
                    && currentTime.getHours() > 17
                    && currentTime.getMinutes() > 35
                    && isClick == false
                ) {
                    var findTarget_4 = text(target_4).find();
                    if (findTarget_4 != null) {
                        console.log("找到--" + target_4);
                        click(target_4);
                        isClick = true;
                        sleep(sec);
                    } else {
                        console.log("未找到--" + target_4);
                    }
                }

                if (isClick == true) {
                    sleep(8 * hour);
                    isClick = false;
                }
                
            }else {
                console.log("启动失败", tryTimes);
                tryTimes += 1;
                // 重试
                if(tryTimes < 10){
                    main();
                }else{
                    console.log("运行结束", tryTimes);
                    stop();
                }
            }
        }
        sleep(minute);
    }
}
function stop() {
    engines.stopAllAndToast();
}
main();