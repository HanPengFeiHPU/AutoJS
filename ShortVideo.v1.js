
console.show();
var second = 1000;
var number = 0;
var ignoreMembers = [];

// 夜神
var noxLike = "gov.hagpp.tdafto:id/text_like_num";
var noxPlay = "gov.hagpp.tdafto:id/text_play_num";
var noxVideoName = "gov.hagpp.tdafto:id/text_video_desc";
var noxErr = "gov.hagpp.tdafto:id/text_load";
var noxTalkNum = "gov.hagpp.tdafto:id/text_comment_num";

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
        sleep(1 * second);
        back();
        break;
    }
}

function appStart() {

    var appName = '91短視頻';
    var isAppStart = launchApp(appName);
    sleep(5*second);    

    if (isAppStart) {
        // 进入
        var isIn = click("進入");
        
        while (isIn == false) {
            sleep(2*second);
            isIn = click("進入");
        }
        
        sleep(5*second);
        while (id("btn_cancel").exists()) {
            sleep(second);
            cancer=id("btn_cancel").findOne().click();
        }

        console.log(isIn);
        sleep(10*second);
        if (isIn) {
            // 关闭广告
            for(var i=0;i<5;i++){
                sleep(5*second);
                console.log("广告",i);
                back();
            }

            sleep(second);
            videoList();

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

function videoList(){
    var videoName = "";
    var saveNumber=0;
    var likeNum = 0;
    var talkNum = 0;
    while (true){
        
        closePayment();
        videoName = id(noxVideoName).findOne().text();
        likeNum = id(noxLike).findOne().text();
        talkNum = id(noxTalkNum).findOne().text();
                
        saveInfo(saveNumber+'\t'+likeNum+'\t'+ talkNum+'\t'+videoName+'\n');
        saveNumber = saveNumber+1;
        console.log(saveNumber+'\t'+likeNum+'\t'+ talkNum+'\t'+videoName);
        
        gesture(1000,[300,900],[300,10]);
        sleep(second);
    }
}

function saveInfo(tempText) {
    // 文件地址
    var path = '/storage/emulated/0/脚本/video.text';
    
    // var path = './video.text';

    // 将数据写入文件
    files.append(path, tempText + '\n');
}
appStart();
// videoList();