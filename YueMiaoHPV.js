// 九价疫苗
// auto.waitFor();

var appName = "约苗";
// 启动目标软件
launchApp(appName);
var second = 1000;
var isClick_MS = false;

sleep(3*second); // 设置等待时间，以免启动太慢

function run() {

    console.show();
    var i = 0;
    var can_run = false;

    while (true) {
        i += 1;
        // 等待运行
        if(id("button6").exists()){
            free_time = id("button6").untilFind()[0].text();
            console.log(free_time,i)
            var lab = free_time.split("日")[0] 
            if(lab != "每"){
                id("button6").click();
                can_run = true;
            }
        }

        if(can_run==false){
            continue;
        }


        // 正式运行
        console.log("循环",i);
        if(text("立即秒杀").exists() && isClick_MS == false){
            isClick_MS = click("立即秒杀");
            // sleep(0.5*second);
            console.log("点击立即秒杀，i=" + i);
        }
        // if(text("请选择").exists()){
        //     back();
        // }
        if(!text("请选择").exists() && text("提交订单").exists() ){
            click("提交订单");
            while ((text("秒杀活动未开始!").exists() || text("秒杀活动未开始！").exists())){
                sleep(0.01 * second);                
                click("提交订单");
            }
            sleep(0.2 * second);
            console.log("提交订单，i=" + i);
        }
        if(text("预约时间").exists()){
            click("预约时间");
            console.log("预约时间，i=" + i);
            isClick = true;
        }
        if(text("08:30~17:00").exists()){
            click("08:30~17:00");
            console.log("08:30~17:00，i=" + i);
            isClick = true;
        }
        if(text("提交预约").exists()){
            click("提交预约");
            console.log("提交预约，i=" + i);
            isClick = true;
        }
        if(text("已抢光").exists()){
            console.log("已抢光，运行结束！");
            break;
        }
    }
}
run();