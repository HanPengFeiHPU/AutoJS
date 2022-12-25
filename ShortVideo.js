
console.show();
var second = 1000;
var number = 0;
var ignoreMembers = [];

// 夜神
var noxLike = "gov.hagpp.tdafto:id/text_like_num";
var noxPlay = "gov.hagpp.tdafto:id/text_play_num";
var noxVideoName = "gov.hagpp.tdafto:id/text_video_desc";
var noxErr = "gov.hagpp.tdafto:id/text_load";

// 雷电
var LDLike = "edu.qinghua.spaab.buiyrf:id/text_like_num";
var LDPlay = "edu.qinghua.spaab.buiyrf:id/text_play_num";
var LDVideoName = "edu.qinghua.spaab.buiyrf:id/text_video_desc";
var LDErr = "edu.qinghua.spaab.buiyrf:id/text_load";

// 平板
var PlateLike = "com.zpqsi.qpcceq:id/text_like_num";
var PlatePlay = "com.zpqsi.qpcceq:id/text_play_num";
var PlateVideoName = "com.zpqsi.qpcceq:id/text_video_desc";
var PlateErr = "com.zpqsi.qpcceq:id/text_load";


function closePayment() {
    // 关闭支付
    while (id("text_ok").exists()) {
        sleep(5 * second);
        back();
    }
}

function appStart() {

    var appName = '短視頻';
    var isAppStart = launchApp(appName);

    if (isAppStart) {
        // 进入
        var isIn = click("進入");
        while (isIn == false) {
            sleep(2 * second);
            isIn = click("進入");
        }

        console.log(isIn);
        sleep(10 * second);
        if (isIn) {
            // 关闭广告
            for (var i = 0; i < 5; i++) {
                sleep(5 * second);
                back();
                console.log(isAppStart, isIn, i);
                // launchApp(appName);
            }

            closePayment();
            sleep(second);

            // 创作
            id("tv_main_up").findOne().click();
            sleep(2 * second);

            // 周收益榜
            var isCreate = click("周收益榜");
            while (isCreate == false) {
                sleep(second);
                click("首頁");
                // 创作
                id("tv_main_up").findOne().click();
                sleep(second);
                isCreate = click("周收益榜");
            }

            sleep(2 * second);
            // 列表
            getVideoInfo();

            // 关闭
            stopApp();
        }
    } else {
        appStart();
    }
}

function stopApp() {
    for (var i = 0; i < 5; i++) {
        back();
    }
    console.log("程序运行完毕");
    engines.stopAllAndToast();
}

function getVideoInfo() {

    // 榜单
    var members = id("edu.qinghua.spaab.buiyrf:id/text_username").find();

    if (members.length == 0) {
        members = id("gov.hagpp.tdafto:id/text_username").find();
    } else if (members.length == 0) {
        members = id("com.zpqsi.qpcceq:id/text_username").find();
    }

    for (var i = 0; i < members.length; i++) {
        var memberName = members.get(i).text();

        if (ignoreMembers.indexOf(memberName) == -1) {
            ignoreMembers[number] = memberName;

            click(memberName);
            sleep(2 * second);
            click("作品");
            videoList(memberName);

            number = number + 1;
            console.log(number, memberName);
            if (i == members.length - 1) {

                if (scrollDown()) {     //遍历完完成后进行翻页操作
                    sleep(2 * second);
                    getVideoInfo();
                }
                else {
                    break;
                }
            }
        }
    }
}

function videoList(memberName) {
    var readLikes = [];
    var textViews = className("android.widget.TextView").find();

    var number = "";
    var saveNumber = 0;
    for (var i = 0; i < textViews.length; i++) {
        if (textViews.get(i).text().indexOf('作品') != -1) {
            number = textViews.get(i).text().split(" ")[1];
        }
    }

    saveInfo('Member:' + memberName + '\n');

    while (true) {
        var temp1 = click("作品");
        console.log('作品：', temp1);
        gesture(500, [300, 1000], [300, 10]);
        sleep(second);
        click("作品");

        // 夜神
        var like = id(noxLike).find();
        var play = id(noxPlay).find();

        // 平板
        // var like = id(PlateLike).find();
        // var play = id(PlatePlay).find();

        console.log('like：', like.length);
        console.log('play：', play.length);

        for (var j = 0; j < like.length; j++) {
            var likeNum = like.get(j).text();
            var playNum = play.get(j).text();

            sleep(0.5 * second);

            if (readLikes.indexOf(likeNum) == -1) {

                readLikes[saveNumber] = likeNum;

                // 点击视频
                click(likeNum);
                sleep(second);
                closePayment();

                // 获取视频名称
                // 夜神
                var videoName = id(noxVideoName).findOne().text();
                // 平板
                // var videoName = id(PlateVideoName).findOne().text();

                saveInfo(saveNumber + '\t' + likeNum + '\t' + playNum + '\t' + videoName + '\n');
                saveNumber = saveNumber + 1;
                console.log(saveNumber + '\t' + likeNum + '\t' + playNum + '\t' + videoName);

                closePayment();
                sleep(second);
                back();
            }
        }

        if (saveNumber == number - 1 || saveNumber == 100) {
            back();
            break;
        }
    }
}

function saveInfo(tempText) {
    // 文件地址
    var path = '/storage/emulated/0/脚本/video.text';

    // var path = '/内部存储/脚本/video.text';

    // 将数据写入文件
    files.append(path, tempText + '\n');
}
appStart();