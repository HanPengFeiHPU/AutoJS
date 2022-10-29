//var appName = "快手极速版";
//launchApp(appName);
//sleep(3000);

function run()
{
    var i = 1;
    var total = 20;
    while (i<total)
    {
        //click(10,10);
        //click(500,100);
        //findLable=text("首页").findOnce();
        if (i % 2 == 0)
        {
            click("首页");
            sleep(1000*3);
        }
        if(i % 3 == 0)
        {
            click("我知道了");
            sleep(1000*4);
            click("点击翻倍");
        }
        
        gesture(500, [300, 1000], [300, 10]); // 划动时长及坐标
        i++;
        if (i == -1)
        {
            engines.stopAllAndToast(); // 停止正在运行的脚本
            break;
        }
        // 继续看视频
        toast("以观看个数："+i+"\n剩余个数："+(total-i))
    }
}

function clean()
{
    var appName2 = "手机管家";
    launchApp(appName2);
    sleep(3000);
    
    if(text("不同意").exists()){
        while(!text("不同意").click());
        sleep(1000);
    }

    if(text("取消").exists()){
        text("取消").click();
        sleep(1000);
    }

    if(text("垃圾清理").exists()){
        while(!click("垃圾清理")){
            toast("点击垃圾清理");
        };
        sleep(1000);
    }

    // 停止清理按钮
    while(id("button_stop").exists()){
        sleep(3000);
    }

    // 清理按钮
    if(id("button_clean").exists()){
        id("button_clean").click();
        sleep(5000);
    }

    while(!id("icon_folder_creation_bg").exists()){
        back();
        if(text("取消").exists()){
            text("取消").click();
            sleep(1000);
        }
    }
}

function main()
{
    var i = 0;
    while(true){
        var appName = "快手极速版";
        launchApp(appName);
        sleep(3000);
        run();
        i = i + 1;
        // if(i % 100 == 0){
        //     clean();
        // }
        clean();
    }
}
main()