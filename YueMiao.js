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
    var free_time = "";
    var free_time_d = "";
    var free_time_h = "";
    var free_time_m = "";
    var free_time_s = "";
    var can_run = false;

    while (true) {
        
        // 等待运行
        if(id("button6").exists()){
            free_time = id("button6").untilFind()[0].text();
            if(free_time.length > 8){
                free_time_d = free_time.split("有")[1].split("天")[0];
                free_time_h = free_time.split("天")[1].split(":")[0];
                free_time_m = free_time.split(":")[1];
                free_time_s = free_time.split(":")[2];

                if(free_time_d=="00"&&free_time_h=="00"&&free_time_m <3){
                    can_run = true;
                }else{
                    console.log("等待运行：",free_time);
                    sleep(60*second);
                }
            }else{
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
        i += 1;
    }
}
run();