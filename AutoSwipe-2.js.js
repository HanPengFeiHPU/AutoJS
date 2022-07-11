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
function main()
{
    var cycleNumber=100000;
    for(var j=0;j<cycleNumber;j++){
        var appName = "快手极速版";
        launchApp(appName);
        sleep(3000);
        run();
    }
}
main()