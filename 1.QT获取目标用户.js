var appName = "青藤之恋";
launchApp(appName);
second = 1000;
sleep(3 * second);

function run() {
    console.show();
    var labName1 = "村口";
    var labName2 = "同城";  // 推荐
    var ignorePerson = [];
    var city = "商丘";
    var studyLevel = "硕士";
    var currentNum = 0;
    var armNum = 0;

    if (click(labName1)) {
        sleep(2 * second);
        if (click(labName2)) {
            sleep(5 * second);
            while (true) {
                if (id("nickname").exists()) {
                    var names = id("nickname").find();
                    var lables = id("user_other_info").find();
                    var contentInfo = id("com.wepie.ivy:id/moment_comment_op").find();
                    var upId = id("moment_thumbs_up_op").find();
                    // console.log(upId.length, names.length, lables.length, contentInfo.length);
                    var minNum = names.length;
                    if (names.length < lables.length) {
                        minNum = names.length;
                    } else {
                        minNum = lables.length;
                    }

                    for (var i = 1; i < minNum; i++) {
                        var index = ignorePerson.indexOf(names.get(i).text());

                        if (index == -1) { // 在跳过人员的名单中 
                            var temp = lables.get(i).text();
                            if (labName2 == "同城") {
                                temp = lables.get(i).text();
                            }

                            console.log(armNum + "/" + currentNum, names.get(i).text(), temp);

                            var tempText = armNum + "/" + currentNum + "_#" + names.get(i).text() + "_#" + temp;

                            saveInfo(tempText);
                            ignorePerson[ignorePerson.length] = names.get(i).text(); // 加入跳过人员名单中

                            currentNum += 1;

                            // 颜色 #fccaee #ffe4f3

                            // 包含目标城市，关注
                            if (temp.indexOf(city) > 0
                                && temp.indexOf(studyLevel) > 0
                                && color(names.get(i).bounds().right + 10, names.get(i).bounds().centerY())) {
                                // sleep(second);
                                // 点赞
                                upId[i].click();
                                sleep(second);
                                contentInfo[i].click();

                                sleep(2 * second);
                                if (text("取消关注").exists()) {
                                    continue;
                                }
                                if (text("关注").exists()) {
                                    click("关注");
                                    armNum += 1;
                                }
                                back();
                            }
                        }

                    }


                    swipe(60, device.height - 500, 60, device.height / 4, second);

                    if (text("唠唠").exists()) {
                        back();
                        sleep(second);
                    }
                    
                    if (!text("村口").exists() && !text("唠唠").exists()) {
                        sleep(2*second);
                        back();
                    }

                } else {
                    if (text("分享给好友").exists()) {
                        back();
                        sleep(second);
                        continue;
                    }
                    if (!text("村口").exists() && !text("唠唠").exists()&& !text("解锁匿名身份").exists()) {
                        console.log("停止");
                        engines.stopAllAndToast(); // 停止正在运行的脚本
                        break;
                    }
                    console.log("异常");
                    // 防止死锁
                    click("年");
                    sleep(2*second);
                    back();
                    sleep(2*second);

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

function saveInfo(tempText) {
    // 文件地址
    var path = '/storage/emulated/0/脚本/青藤用户信息.txt';

    // var path = './青藤用户信息.txt';

    // 将数据写入文件
    files.append(path, tempText + '\n');
}

function color(x, y) {
    if (!requestScreenCapture()) {
        console.log("请求截图失败");
    }
    var img = captureScreen();

    var point = findColorInRegion(img, "#f7b0d6", x, y, 46, 46);
    if (point) {
        console.log("x = " + point.x + ", y = " + point.y);
        return true;
    } else {
        console.log("没有找到");
        return false;
    }
}

run();