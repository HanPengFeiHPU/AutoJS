// 手动调出点赞页面

function run() {
    console.show();
    console.log("手动调出点赞页面");
    var labName1 = "村口";
    var labName2 = "关注";  // 推荐
    var currentNum = 0;
    var ignorePerson = ["测试"];
    var maxUpNum = 20;
    var second = 1000;

    // 写成true目的是直接在当前页面点击，避免自动刷新
    if (true) {
        sleep(10 * second);
        if (true) {
            while (true) {
                if (id("nickname").exists()) {
                    var names = id("nickname").find();
                    var lables = id("user_other_info").find();
                    var upId = id("moment_thumbs_up_op").find();
                    var minNum = names.length;
                    if (names.length < lables.length) {
                        minNum = names.length;
                    } else {
                        minNum = lables.length;
                    }

                    for (var i = 1; i < minNum; i++) {
                        var temp = lables.get(i).text();
                        
                        if(ignorePerson[ignorePerson.length-1] != names.get(i).text()){
                            ignorePerson[ignorePerson.length] = names.get(i).text(); // 加入跳过人员名单中
                            console.log(currentNum,"点赞：", names.get(i).text(), temp);
                            currentNum += 1;
                            upId[i].click();
                            sleep(5*second);

                            if(currentNum > maxUpNum){
                                console.log("完成");
                                engines.stopAllAndToast(); // 停止正在运行的脚本        
                            }
                        }
                    }


                    swipe(60, device.height - 500, 60, device.height / 4, second);

                    if (text("唠唠").exists()) {
                        back();
                        sleep(second);
                    }

                    if (!text("村口").exists() && !text("唠唠").exists()) {
                        sleep(2 * second);
                        back();
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
    } else {
        console.log("尚未开抢");
        engines.stopAllAndToast(); // 停止正在运行的脚本
    }
}

run();