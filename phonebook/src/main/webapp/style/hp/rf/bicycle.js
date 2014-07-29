//onload
$(function(){
	thisIni();
});
function ysmodeltag(){};
function ysmodeluitag(){};
//override
function ystest(){
	ystBodyRefresh();
	ysprintln("show result:");
}
//initialize
function thisIni(){}

//其他处需要用到的方法的测试地点

//d0
function test(){
	
	bicycleCardIni("","FFFEFFFFFFFF");

}
//Ie定制
function refreshJs(){
	window.open("jsp/proother/hp/rf/bicycle.js?"+randomInt(10000));
	window.open("jsp/proother/hp/rf/MWRFATL_core.js?"+randomInt(10000));
	window.open("jsp/proother/hp/rf/MWRFATL_bicycle.js?"+randomInt(10000));
	window.open("jsp/proother/hp/rf/MWRFATL_string.js?"+randomInt(10000));
}
//d1
function d1Get(){
	var v = $("#d1select  option:selected").val();
	//ysshow(v);
	return v;
}
function showd1Get(){
	ysalert(d1Get());
}
function d1sRead(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d1Get();
	var sector = 0;
	var bis = 1;
	var block = sector*4+bis;
	var vbbs=$("#bbs");
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	var sb = rfReadBlockSingle(block);
	if(sb==null){
		cardEnd();
		ysshow("读取异常");
		return;
	}
	vbbs.val(sb);
	//
	rfBeep();
	cardEnd();
	return;
}
function d1sModify(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d1Get();
	var sector = 0;
	var bis = 1;
	var block = sector*4+bis;
	var vbbs=$("#bbs");
	var bbs = vbbs.val();
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if(bbs.length!=32){
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block,bbs,mode);
	if(!tag){
		cardEnd();
		ysshow("写入异常");
		return;
	}
	vbbs.val("");
	//
	rfBeep();
	cardEnd();
	return;
}
function d1Read(){
	var mode=arguments[0]?arguments[0] : "0";
	
	var bbid=$("#bbid");
	
	var key = d1Get();
	var sector = 0;
	var bis = 1;
	var block = sector*4+bis;
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	
	if(!rfLoadKeySingle(sector,key,mode)){
		ysshow("载入密码失败");
		return;
	}
	
	if(!rfAuthenticationSingle(sector, mode)){
		ysshow("验证密码失败");
		return;
	}
	
	//--
	bbid.val(readBicycleId(mode));
	//--
	rfBeep();
	
	cardEnd();
}
function d1Modify(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d1Get();
	var sector = 0;
	var bis = 1;
	var block = sector*4+bis;
	var bbid=$("#bbid");
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败2");
		return;
	}
	//--
	var bid = bbid.val();
	temp=writeBicycleId(bid);
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}
	
	rfBeep();
	//--
	cardEnd();
	return;
}

//d2
function d2Get(){
	var v = $("#d2select  option:selected").val();
	return v;
}
function showd2Get(){
	ysalert(d2Get());
}
function d2sRead(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d2Get();
	var sector = 2;
	var bis = 0;
	var block = sector*4+bis;
	var vbbs=$("#bbs2");
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	var sb = rfReadBlock(block,mode);
	if(sb==null){
		cardEnd();
		ysshow("读取异常");
		return;
	}
	vbbs.val(sb);
	//
	rfBeep();
	cardEnd();
	return;
}
function d2sModify(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d2Get();
	var sector = 2;
	var bis = 0;
	var block = sector*4+bis;
	var vbbs=$("#bbs2");
	var bbs = vbbs.val();
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if(bbs.length!=32){
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block,bbs);
	if(!tag){
		cardEnd();
		ysshow("写入异常");
		return;
	}
	vbbs.val("");
	//
	rfBeep();
	cardEnd();
	return;
}
function d2Read(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d2Get();
	var sector = 2;
	var bis = 0;
	var block = sector*4+bis;
	var bbid=$("#bbid2");
	//--
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//--
	temp = readUserPassword(mode);
	if(temp==null){
		cardEnd();
		ysshow("读取失败");
		return;
	}
	bbid.val(temp);
	//--
	rfBeep();
	cardEnd();
	return;
	
}
function d2Modify(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d2Get();
	var sector = 2;
	var bis = 0;
	var block = sector*4+bis;
	var bbid=$("#bbid2");
	var bid = bbid.val();
	//--
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//--
	temp = writeUserPassword(bid,mode);
	if(!temp.result){
		cardEnd();
		ysshow(temp.message);
		return;
	}
	//--
	rfBeep();
	cardEnd();
	return;
}
//d3
function d3Get(){
	var v = $("#d3select  option:selected").val();
	return v;
}
function showd3Get(){
	ysalert(d3Get());
}
function encodesb0(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d3Get();
	var sector = 0;
	var bis = 3;
	var block = sector*4+bis;
	var bbs = "FFFEFFFFFFFFFF078069FFFFFFFFFFFF"
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if(bbs.length!=32){
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block,bbs,mode);
	if(!tag){
		cardEnd();
		ysshow("写入异常");
		return;
	}
	//
	rfBeep();
	cardEnd();
	return;
}
function decodesb0(){
	var mode=arguments[0]?arguments[0] : "0";
	var key = d3Get();
	var sector = 0;
	var bis = 3;
	var block = sector*4+bis;
	var bbs = "FFFFFFFFFFFFFF078069FFFFFFFFFFFF";
	//
	var temp = cardBegin();
	if(!temp.result){
		ysshow(temp.message);
		return;
	}
	if(!rfLoadKeySingle(sector,key,mode)){
		cardEnd();
		ysshow("载入密码失败");
		return;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardEnd();
		ysshow("验证密码失败");
		return;
	}
	//
	if(bbs.length!=32){
		cardEnd();
		ysshow("格式不对");
		return;
	}
	var tag = rfWriteBlock(block,bbs,mode);
	if(!tag){
		cardEnd();
		ysshow("写入异常");
		return;
	}
	//
	rfBeep();
	cardEnd();
	return;
}
//fun
