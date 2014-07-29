//onload
$(function() {
	thisIni();
});
// function ysmodeltag(){};
// function ysmodeluitag(){};
// override
function ystest() {
	ystBodyRefresh();
	ysprintln("show result:");
}
// initialize
function thisIni() {
	// d3
	// d4_改
	d4_gai_ini();
	// d4
	// d7
	d7_ini();
}
//
function test() {
	ysconsole("测试3");
	
	//01030103010000010133000000000000
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
	var temp = rfLoadAu2();
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}else{
		ysshow("密码载入验证成功！");
	}
	
	var cardMoney = readCardMoney();
	//
	ysconsole(cardMoney.money/10);
	ysconsole(typeof cardMoney.money);
	ysconsole(typeof (cardMoney.money/10));
	
	rfBeep();
	cardEnd();
}

/* Ie定制,用不到了，因为支持firefox了(弃)
function refreshJs() {
	window.open("jsp/proother/hp/rf/model.js?" + randomInt(10000));
	window.open("jsp/proother/hp/rf/MWRFATL_core.js?" + randomInt(10000));
	window.open("jsp/proother/hp/rf/MWRFATL_string.js?" + randomInt(10000));
}
*//**/

// 通用了。
function d4_gai_ini() {
	$('#d4pwd').combobox({
		valueField : 'value',
		textField : 'text',
		data : [ {
			value : '1',
			text : 'FFFFFFFFFFFF',
			"selected" : true
		}, {
			value : '2',
			text : 'FFFEFFFFFFFF'
		}, {
			value : '3',
			text : '000000000000'
		} ],
		width : 120,
	});
	var sector = new Array();
	for ( var i = 0; i < 16; i++) {
		sector[i] = new Object();
		sector[i].value = i;
		sector[i].text = i;
	}
	$('#d4sector').combobox({
		editable : false,
		valueField : 'value',
		textField : 'text',
		data : sector,
		width : 50,
	});
	var sb = new Array();
	for ( var i = 0; i < 4; i++) {
		sb[i] = new Object();
		sb[i].value = i;
		sb[i].text = i;
	}
	$('#d4sb').combobox({
		editable : false,
		valueField : 'value',
		textField : 'text',
		data : sb,
		width : 50,
	});

	$('#d4mode').combobox({
		editable : false,
		valueField : 'value',
		textField : 'text',
		data : [ {
			value : '0',
			text : 'A',
			"selected" : true
		}, {
			value : '4',
			text : 'B'
		} ],
		width : 50,
	});
}

function pwdGet() {
	return pwd4Get();
}
function pwd4Get() {
	return $('#d4pwd').combobox("getText");
}
function sectorGet() {
	return sector4Get();
}
function sector4Get() {
	return $('#d4sector').combobox("getText");
}
function sbGet() {
	return sb4Get();
}
function sb4Get() {
	return $('#d4sb').combobox("getText");
}
function modeGet() {
	return mode4Get();
}
function mode4Get() {
	return $('#d4mode').combobox("getValue");
}
function unMake() {
	ysshow("未实现");
}

// d1
// 字符串的转换
function testToHex() {
	var a = toHex($("#d1Txt").val());
	if (a != null) {
		$("#d1Txt").val(a);
	}
}
function testToAsc() {
	var a = toAsc($("#d1Txt").val());
	if (a != null) {
		$("#d1Txt").val(a);
	}
}
// d2
// 独立的获取信息
function beep() {
	var temp = rfBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	rfBeep();
	rfEnd();
	ysshow("beep");
}
function getVersion() {
	var temp = rfVer();
	if (temp == null) {
		ysshow("设备没能打开");
	} else {
		ysshow(temp);
	}
}
// d3
// 打开设备
function testRfOpen() {
	if (rfOpen()) {
		ysshow("yes");
	} else {
		ysshow("no");
	}
}

// 关闭设备
function testRfClose() {
	if (rfClose()) {
		ysshow("yes");
	} else {
		ysshow("no");
	}
}

// 寻卡
function testCardOpen() {
	var result = cardOpen();
	if (result != null) {
		ysshow("yes:" + result);
	} else {
		ysshow("no");
	}
}

// 关卡
function testCardClose() {
	if (cardClose()) {
		ysshow("yes");
	} else {
		ysshow("no");
	}
}
// d4
function d4sbRead() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	sbVal.val("");
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	if (!rfLoadKeySingle(sector, key, mode)) {
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	var content = rfReadBlock(block, mode);
	if (content == null) {
		cardEnd();
		ysshow("读取异常");
		return;
	}
	//
	sbVal.val(content);
	//
	// rfBeep();
	cardEnd();
	return;
}

function d4sbModify() {
	var mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	var content = sbVal.val();
	if (sb == 3) {
		ysalert("此功能被禁用");
		return;
	}
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	if (!rfLoadKeySingle(sector, key, mode)) {
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if (content.length != 32) {
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		cardEnd();
		ysshow("写入异常");
		return;
	}
	sbVal.val("");
	//
	// rfBeep();
	cardEnd();
	return;
}

function d4sbModifyPwd() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	var content = sbVal.val();
	//
	if (sb != 3) {
		ysalert("选择不正确");
		return;
	}
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	if (!rfLoadKeySingle(sector, key, mode)) {
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if (content.length != 32) {
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		cardEnd();
		ysshow("写入异常");
		return;
	}
	sbVal.val("");
	//
	// rfBeep();
	cardEnd();
	return;
}

function d4sbClean() {
	var mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	var content = "00000000000000000000000000000000";
	if (sb == 3) {
		content = "FFFFFFFFFFFFFF078069FFFFFFFFFFFF";
	}
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	if (!rfLoadKeySingle(sector, key, mode)) {
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if (content.length != 32) {
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		cardEnd();
		ysshow("写入异常");
		return;
	}
	sbVal.val("");
	//
	// rfBeep();
	cardEnd();
	return;
}

// d4扇区的
function d4sbReadSector() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	sector = Number(sector);
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	// --
	ysprint();
	var temp;
	for ( var j = 0; j < 3; j++) {
		ysprintAdd("扇区" + (sector < 10 ? "0" + sector : sector) + "块" + j + ",");
		temp = checkBlock(key, sector, j, mode);
		if (temp.result) {
			ysprintlnAdd("成功:" + temp.message);
		} else {
			ysprintlnAdd("失败:" + temp.message);
		}

	}
	ysshow("运算结束，请查阅Debug");
	// --
	// rfBeep();
	cardEnd();
	return;
}
function d4sbCleanSector() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	sector = Number(sector);
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	// --
	ysprint();
	var temp;
	for ( var j = 0; j < 3; j++) {
		ysprintAdd("扇区" + (sector < 10 ? "0" + sector : sector) + "块" + j + ",");
		temp = cleanBlock(key, sector, j);
		if (temp.result) {
			ysprintlnAdd("成功:" + temp.message);
		} else {
			ysprintlnAdd("失败:" + temp.message);
		}

	}
	ysshow("运算结束，请查阅Debug");
	// --
	// rfBeep();
	cardEnd();
	return;
}

// d4非独立的
function d4sbRead2() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	sbVal.val("");
	//
	var content = rfReadBlock(block, mode);
	if (content == null) {
		ysshow("读取异常");
		return;
	}
	sbVal.val(content);
	rfBeep();
}

function d4sbModify2() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	var content = sbVal.val();
	if (sb == 3) {
		ysalert("此功能被禁用");
		return;
	}
	//
	if (content.length != 32) {
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		ysshow("写入异常");
		return;
	}
	sbVal.val("");
	rfBeep();
}

function d4sbModifyPwd2() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	var content = sbVal.val();
	//
	if (sb != 3) {
		ysalert("选择不正确");
		return;
	}
	//
	if (content.length != 32) {
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		ysshow("写入异常");
		return;
	}
	sbVal.val("");
	rfBeep();
}

function d4sbClean2() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	var sb = sb4Get();
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	var sbVal = $("#d4sbVal");
	var content = "00000000000000000000000000000000";
	if (sb == 3) {
		content = "FFFFFFFFFFFFFF078069FFFFFFFFFFFF";
	}
	//
	if (content.length != 32) {
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		ysshow("写入异常");
		return;
	}
	sbVal.val("");
	//
	rfBeep();
}

//
function checkAll() {
	var mode = arguments[0] ? arguments[0] : "0";
	mode = mode4Get();
	var key = pwd4Get();
	ysprint();
	//
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	// --
	var temp;
	for ( var i = 0; i < 16; i++) {
		for ( var j = 0; j < 3; j++) {
			ysprintAdd("扇区" + (i < 10 ? "0" + i : i) + "块" + j + ",");
			temp = checkBlock(key, i, j, mode);
			if (temp.result) {
				ysprintlnAdd("成功:" + temp.message);
			} else {
				ysprintlnAdd("失败:" + temp.message);
			}
		}
	}
	// --
	ysshow("运算结束。");
	rfBeep();
	cardEnd();
	return;
}
function cleanResult() {
	ysprint();
}

// d4_sub Function
function checkBlock(key, sector, sb) {
	var result = {
		"result" : true,
		"message" : ""
	};
	var mode = arguments[3] ? arguments[3] : "0";
	var sector = Number(sector);
	var sb = Number(sb);
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	if (!rfLoadKeySingle(sector, key, mode)) {
		result.result = false;
		result.message = "载入密码失败";
		return result;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		cardClose();
		cardOpen();
		result.result = false;
		result.message = "验证密码失败";
		return result;
	}
	//
	var content = rfReadBlock(block, mode);
	if (content == null) {
		// cardEnd();
		result.result = false;
		result.message = "读取异常";
		return result;
	}
	result.message = content;
	//
	return result;
}

function cleanBlock(key, sector, sb) {
	var result = {
		"result" : true,
		"message" : ""
	};
	var content = arguments[3] ? arguments[3]
			: "00000000000000000000000000000000";
	var mode = arguments[4] ? arguments[4] : "0";
	var sector = Number(sector);
	var sb = Number(sb);
	sector = Number(sector);
	sb = Number(sb);
	var block = sector * 4 + sb;
	if (!rfLoadKeySingle(sector, key, mode)) {
		result.result = false;
		result.message = "载入密码失败";
		return result;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		cardClose();
		cardOpen();
		result.result = false;
		result.message = "验证密码失败";
		return result;
	}
	//
	if (content.length != 32) {
		result.result = false;
		result.message = "格式不对";
		return result;
	}
	var tag = rfWriteBlock(block, content, mode);
	if (!tag) {
		// cardEnd();
		result.result = false;
		result.message = "写入异常";
		return result;
	}
	//
	return result;
}

// d5
function d4LoadKey() {
	var mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	sector = Number(sector);
	if (!rfLoadKeySingle(sector, key, mode)) {
		cardClose();
		cardOpen();
		ysshow("载入密码失败");
	} else {
		ysshow("载入密码成功");
	}
}

function d4AuthKey() {
	var mode = mode4Get();
	var sector = sector4Get();
	sector = Number(sector);
	if (!rfAuthenticationSingle(sector, mode)) {
		ysshow("验证密码失败");
		cardClose();
		cardOpen();
	} else {
		ysshow("验证密码成功");
	}
}

function d4LoadAuthKey() {
	var mode = mode4Get();
	var key = pwd4Get();
	var sector = sector4Get();
	sector = Number(sector);

	if (!rfLoadKeySingle(sector, key, mode)) {
		ysshow("载入密码失败");
		cardClose();
		cardOpen();
		return;
	}
	if (!rfAuthenticationSingle(sector, mode)) {
		ysshow("验证密码失败");
		cardClose();
		cardOpen();
		return;
	}
	ysshow("载入验证成功");
}

// d6
function encrypt() {
	$("#d62").val("");
	var v = $("#d61").val();
	$("#d62").val(cardEncrypt(v));
}
function decrypt() {
	$("#d62").val("");
	var v = $("#d61").val();
	$("#d62").val(cardDecrypt(v));
}
// d7
function d7_ini() {
	getCardTypes($("#cardType"));
}

// d8
function verBeginCard() {

	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
	var temp = rfLoadAu2();
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}else{
		ysshow("密码载入验证成功！");
	}
	
	// rfBeep();
//	cardEnd();
	return;
}

function verEndCard() {
//	var obj = new Object();
//	obj.pwd1 = cpwd1;
//	obj.pwd2 = cpwd2;
//	if(!writeSystemSector(obj)){
//		cardEnd();
//		ysshow("写入失败！");
//		return;
//	}
	cardEnd();
	ysshow("关闭。。。");
	return;
}

function verCard(){
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
//	temp = checkCardSingler();
//	if(temp.result){
//		if(temp.message==1){
//			ysshow("新卡");
//		}else if(temp.message==2){
//			ysshow("正常卡");
//		}else if(temp.message==3){
//			ysshow("刚初始化的卡");
//		}else{
//			ysshow("异常,无此类型,不可能");
//		}
//	}else{
//		ysshow(temp.message+"\n非本系统卡");
//	}
	
	//前置卡片片段
	if(checkTag()){
		temp = checkCardSingler();
		if(temp.result!=true||temp.message!=2){
			ysshow("非正常卡");
		}else{
			console.info("正常卡");
		}
	}
	
	cardEnd();
}

/*
 * 系统信息
 *//**/
function readCardSys(){
	$("#cser").val("");
	$("#cpwd1").val("");
	$("#cpwd2").val("");
	$("#cpwd1d").val("");
	$("#cpwd2d").val("");

	//
//	var temp = cardBegin();
//	if (!temp.result) {
//		ysshow(temp.message);
//		return;
//	}
//	if (!rfLoadKeySector(0)) {
//		cardEnd();
//		ysshow("载入密码失败");
//		return;
//	}
	if (!rfAuthenticationSector(0)) {
//		cardEnd();
		ysshow("验证密码失败");
		return;
	}

	//
	var sys = readSystemSector();
	$("#cser").val(sys.ser);
	$("#cpwd1").val(sys.pwd1);
	$("#cpwd2").val(sys.pwd2);
	$("#cpwd1d").val(cardDecrypt(sys.pwd1));
	$("#cpwd2d").val(cardDecrypt(sys.pwd2));
}

/*
 * 卡系统信息
 *//**/
function readCardInfo(){
	$("#csysId").val("");
	$("#ccardId").val("");
	$("#cauId").val("");
	//
	var sysInfo = readCardInfoSector();
	//
	$("#csysId").val(sysInfo.sysId);
	$("#ccardId").val(sysInfo.cardId);
	$("#cauId").val(sysInfo.sysAuId);
	
}

function writeCardInfo(){
	var csysId = $("#csysId").val();
	var ccardId = $("#ccardId").val();
	var cauId = $("#cauId").val();
	//
	var sysInfo = readCardInfoSector();
	sysInfo.sysId = csysId;
	sysInfo.cardId = ccardId;
	sysInfo.sysAuId = cauId;
	if(!writeCardInfoSector(sysInfo)){
		ysshow("写入失败！");
		return;
	}
	//
	$("#csysId").val("");
	$("#ccardId").val("");
	$("#cauId").val("");
}

//卡金额操作
function readCardMoneyFunc(){
	$("#ccardMoney").val("");
	//
	var cardMoney = readCardMoney();
	//
	$("#ccardMoney").val(cardMoney.money/10);
}

function writeCardMoneyFunc(){
	var cardMoney = $("#ccardMoney").val();
	cardMoney=toInt(cardMoney)*10;
	//需要判断下最大值
	if(cardMoney>parseInt("7fff",16)||cardMoney<parseInt("-8000",16)){
		ysshow("金额超出范围!!!");
		return;
	}
	//
	sb70 = readCardMoney();
	sb70.money = cardMoney;
	writeCardMoney(sb70);
	//
	$("#ccardMoney").val("");
}

//用户区50
function readCardUser50Func(){
	$("#c50pwd").val("");
	$("#c50lockSta").val("");
	$("#actSta").val("");
	//
	var user50 = readUserSta();
	//
	$("#c50pwd").val(user50.pwd);
	$("#c50lockSta").val(toInt(user50.lockSta));
	$("#actSta").val(toInt(user50.actSta));
}

function writeCardUser50Func(){
	var pwd = $("#c50pwd").val();
	var lockSta = $("#c50lockSta").val();
	var actSta = $("#actSta").val();
	//
	var user50 = readUserSta();
	user50.pwd = pwd;
	user50.lockSta = lockSta;
	user50.actSta = actSta;
	
	if(!writeUserSta(user50)){
		ysshow("写入失败！");
		return;
	}
	//
	$("#c50pwd").val("");
	$("#c50lockSta").val("");
	$("#actSta").val("");
}

//系统区30
function readCardSys30Func(){
	$("#c30userName").val("");
	//
	var sys30 = readUserName();
	//
	$("#c30userName").val(sys30.userName);
}

function writeCardSys30Func(){
	var userName = $("#c30userName").val();
	//
	var sys30 = readUserName();
	sys30.userName = userName;
	if(!writeUserName(sys30)){
		ysshow("写入失败！");
		return;
	}
	//
	$("#c30userName").val("");
}

//系统区31，32
function readCardSys32Func(){
	$("#c32type").val("");
	$("#c32num").val("");
	//
	var sys32 = readPaperWork();
	//
	$("#c32type").val(sys32.paperType);
	$("#c32num").val(sys32.paperId);
}

function writeCardSys32Func(){
	var type = $("#c32type").val();
	var num = $("#c32num").val();
	//
	var sys32 = readPaperWork();
	sys32.paperType = type;
	sys32.paperId = num;
	if(!writePaperWork(sys32)){
		ysshow("写入失败！");
		return;
	}
	//
	$("#c32type").val("");
	$("#c32num").val("");
}

//业务区92
function readCardBus92Func(){
	$("#c92station").val("");
	$("#c92time").val("");
	//
	var sys92 = readBusinessRent();
	//
	$("#c92station").val(sys92.station);
	$("#c92time").val(sys92.time);
}

function writeCardBus92Func(){
	var station = $("#c92station").val();
	var time = $("#c92time").val();
	//
	var sys92 = readBusinessRent();
	sys92.station = station;
	sys92.time = time;
	if(!writeBussinessRent(sys92)){
		ysshow("写入失败！");
		return;
	}
	//
	$("#c92station").val("");
	$("#c92time").val("");
}

//d9
//老卡清空
function cardInitFunc(){
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
	temp = rfLoadAu2();
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}
	
	temp = oldCardClean();
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}
	
	ysshow("true end");
	// rfBeep();
	cardEnd();
	return;
}

//新卡清空
function cardNewInitFunc(){
	var temp = cardBeginLoadAuth();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
	temp = newCardClean()
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}
	
	ysshow("true end");
	// rfBeep();
	cardEnd();
	return;
}

function cardMakeFunc(){
	var temp = cardBegin();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
	var arrid = new Array(2,3,4,5,7,8,9);
	for(var e in arrid){
		if(!rfLoadKeySector(arrid[e])){
			ysshow("载入密码异常");
			return;
		}
	}
	
	for(var e in arrid){
		if(!rfAuthenticationSector(arrid[e])){
			ysshow("验证密码异常");
			return;
		}
	}
	
	temp = buildCard();
	if (!temp.result) {
		ysshow(temp.message);
		return;
	}
	
	ysshow("true end");
	// rfBeep();
	cardEnd();
	return;
}