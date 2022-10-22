auto.waitFor();
var appName = "学习强国";
launchApp(appName);
sleep(3000);

function run()
{
    console.show();
    var i = 0;
    var labName1 = "马上抢"
;
    var labName2 = "兑换";
    while (true)
    {
        
        i++;
        if(click(labName1))
        {
            click(labName2);
            continue;
        }else
        {
            gesture(500, [200, 500], [200, 1000])
            sleep(2*1000);
            console.log("尚未开抢"+i);
            continue;
        }
    }
}
run();