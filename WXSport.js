var app = '微信';
var temp = launchApp(app);
var ignorePerson = ['user1', 'user2', 'user3']; // 跳过人员
var flag = 0;

function dz() {  //点赞功能

    var member = id("com.tencent.mm:id/cmb").find();    //获取控件的全称ID
    var names = id("com.tencent.mm:id/cmp").find();

    for (var i = 1; i < member.length; i++) {          //遍历集合元素

        var index = ignorePerson.indexOf(names.get(i).text());

        if (index == -1) { // 在跳过人员的名单中

            member.get(i).click();       //选择元素进行点击

            ignorePerson[ignorePerson.length] = names.get(i).text(); // 加入跳过人员名单中

            sleep(600);
        }

        if (text("赞我的朋友").findOnce()) {        // 判断是否点到自己如果是则返回

            back();                               //功能键返回
            sleep(700);
        }

        if (i == member.length - 1) {
            if (scrollDown()) {                           //遍历完完成后进行翻页操作
                sleep(200);
            }
            else {
                flag = 1;
                toast("点赞完成");
            }
        }
    }
}

function main() {
    while (flag == 0) {
        if (temp) {
            sleep(1000);
            click("微信运动");
            sleep(1000);
            click('步数排行榜');
            sleep(1000);
            dz();
        }
        else {
            toast("程序出错");
        }
    }

    toast("程序已退出");
}
main();