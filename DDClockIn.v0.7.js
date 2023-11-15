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
    var lable = "未打卡";
    var lable2 = "统计";

    while (true) {
        var currentTime = new Date();
        var tempHour = currentTime.getHours();
        var tempMinutes = currentTime.getMinutes();
        var tempSeconds = currentTime.getSeconds();
        console.log("当前时间：", tempHour, " : ", tempMinutes, " : ", tempSeconds);
        
        if(!text(target_1).exists()&&!text(lable2).exists()){
            
            if(tempHour != 8 && tempHour != 17 && tempHour != 18){
                handBack(); // 防止熄屏
                sleep(5 * minute);
                continue;
            }
            var app = '钉钉';
            var temp = launchApp(app);
            sleep(5 * sec);
            if(!temp){
                continue;
            }
        }else{
            if(tempHour != 8 && tempHour != 17 && tempHour != 18){
                handBack();
                sleep(5 * minute);
                continue;
            }
            // 工作台页面
            if(text(target_1).exists()){
                click(target_1);
                sleep(2 * sec);
                // “考勤打卡”
                for(var i=0; i<4; i++){
                    click(target_2);
                    sleep(sec);
                }
            }
            sleep(10 * sec);
            console.log(lable,text(lable).exists());
            console.log("上午",tempHour == 8 && tempMinutes > 5 && tempMinutes < 28 && text(lable).exists());
            console.log("下午",((tempHour == 17 && tempMinutes > 35) || (tempMinutes >= 18)) && text(lable).exists());
            // 打卡页面
            if(text(lable2).exists()){
                // 上班打卡
                if(tempHour == 8 && tempMinutes > 5 && tempMinutes < 28 && text(lable).exists()){
                    console.log("上班打卡中...");
                    click(target_3);
                    sleep(sec);
                }
                // 下班打卡
                else if(((tempHour == 17 && tempMinutes > 35) || (tempHour >= 18)) && text(lable).exists()){
                    console.log("下班打卡中...");
                    click(target_4);
                    sleep(sec);
                }else{
                    console.log("关闭1中...");
                    for(var i=0;i<10;i++){
                        back();
                        sleep(0.1 * sec);
                    }
                }
            }else{
                console.log("关闭2中...");
                handBack();
            }
            // if(tempSeconds < 10){
            //     handBack();
            // }
        }

        if(tempSeconds < 10){
            handBack();
        }

        sleep(10 * sec);
    }
}

function handBack(){
    for(var i=0;i<10;i++){
        back();
        sleep(0.1 * sec);
    }
}

function stop() {
    engines.stopAllAndToast();
}
main();