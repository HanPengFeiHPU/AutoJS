"ui";

ui.layout(
    <vertical padding="16">
        <button id="start" text="启动" style="Widget.AppCompat.Button.Colored" w="auto" />
        <button id="stop" text="停止" w="auto" />
    </vertical>
);

ui.start.on("click", () => {
    console.log("启动...");
    threads.start(main);
});

ui.stop.on("click", () => {
    console.log("停止...");
    stop();
});

var ignorePerson = ['张耀方', '童鑫麟', '陈夕珩', '黎祥'];
var flag = 0;
var noun = 0;

function dz() {  //点赞功能

    var member = id("com.tencent.mm:id/cmb").find();    //获取控件的全称ID
    var names = id("com.tencent.mm:id/cmp").find();

    for (var i = 1; i < member.length; i++) {          //遍历集合元素
        noun = noun + 1;
        var tempName = names.get(i).text();
        var index = ignorePerson.indexOf(tempName);

        if (index == -1) { // 在跳过人员的名单中

            var temp = member.get(i).click();       //选择元素进行点击

            ignorePerson[ignorePerson.length + noun] = tempName; // 加入跳过人员名单中

            console.log("当前人员：", noun, tempName, temp);
            sleep(200);

        }

        if (text("赞我的朋友").findOnce()) {        // 判断是否点到自己如果是则返回

            back();                               //功能键返回
            sleep(300);
        }

        if (i == member.length - 1) {
            if (scrollDown()) {                           //遍历完完成后进行翻页操作

                sleep(200);
                continue;
            }
            else {
                flag = 1;
                console.log("点赞完成");
                break;
            }
        }
    }
}

function main() {
    console.show();
    var app = '微信';
    var temp = launchApp(app);
    var isSport=null;

    if (temp) {
        console.log("微信已启动");
        sleep(1000);
        // 找到“微信运动”
        var personList = className("android.widget.LinearLayout").find();
        for (var p = 0; p < personList.length; p++) {

            isSport = text("微信运动").findOnce();
            if (isSport != null) {
                console.log("找到微信运动");
                click("微信运动");
                break;
            } else if (p == personList.length - 1) {// 翻页
                if (scrollDown()) {                           //遍历完完成后进行翻页操作
                    sleep(200);
                }
                else {
                    console.log("失败");
                    stop();
                    break;
                }
            }
        }

        while (flag == 0 && isSport != null) {
            // click("微信运动");
            sleep(1000);
            click('步数排行榜');
            sleep(1000);
            dz();
        }

    } else {
        console.log("启动失败");
        stop();
    }
    console.log("程序已退出");
    stop();
}
function stop() {
    engines.stopAllAndToast();
}