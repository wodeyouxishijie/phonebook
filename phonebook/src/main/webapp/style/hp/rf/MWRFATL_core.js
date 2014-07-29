/*core begin... */
//考虑到会换型号，以下对底层的封装单独列出来----------------------------------------------
$(function(){
	wmrfatlCoreIni();
});

/*
 *添加支持firefox,chorme
 *前提是需要jquery,ysmodel的支持 ,并且安装其对应的控件
 *clsid="{524BFA54-1715-4436-B2B9-DC5E248BC1C3}" fox,chrome
 *classid="CLSID:524BFA54-1715-4436-B2B9-DC5E248BC1C3" ie
 *//**/
function wmrfatlCoreIni(){
	var fox = "<object id=\"MWRFATL\" style=\"border:0px;width:0px;height:0px;\" type=\"application/x-itst-activex\" clsid=\"{524BFA54-1715-4436-B2B9-DC5E248BC1C3}\"></object>";
	var ie= "<object id=\"MWRFATL\" type=\"application/x-itst-activex\" style=\"border:0px;width:0px;height:0px;\" classid=\"CLSID:524BFA54-1715-4436-B2B9-DC5E248BC1C3\"></object>";
	//if(typeof $("#MWRFATL").attr("classid") != "undefined"){
		//对Object操作
		var temp = browserMatch().browser;
		if(temp=="firefox"){
			//ysconsole("firefox 控件载入")
			$("body").append(fox);
		}else if(temp=="chrome"){
			//ysconsole("chrome 控件载入");
			$("body").append(fox);
		}else if(temp=="ie"){
			//ysconsole("ie 控件载入");
			$("body").append(ie);
		}
	//}else{
		//ysconsole("warn:未引入Object");
	//}
}

/*
 * 关闭设备
 * 返回：boolean
 *//**/
function rfClose(){
	try{
		MWRFATL.CloseReader();
		if(rfRight()){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 开启设备
 * 返回：boolean
 *//**/
function rfOpen(){
	try{
		MWRFATL.CloseReader();//这段需要加上，否则连续开两次则会异常
		MWRFATL.OpenReader();
		if(rfRight()){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 是否成功
 * 返回：boolean
 *//**/
function rfRight(){
	try{
		if(MWRFATL.LastRet==0){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 复位(手册上说)
 * 不确定，因为无法测试
 * 单位毫秒
 * 按照流程图设计需要
 *//**/
function rfReset(){
	var time=arguments[0]?arguments[0] : 5;
	try{
		MWRFATL.MF_Reset(time);
	}catch (e) {
		console.info(e);
	}
}

/*
 * 寻卡
 * 返回StringOrNull
 * 如果设备没开，打开card就会直接js错误--（即不再运行下去）
 *//**/
function cardOpen(){
	try{
		rfReset();//此段用意不明,厂商提供上有
	    var result=MWRFATL.OpenCard(1);
		if(rfRight()){
			return result;
		}else{
			return null;
		}
	}catch (e) {
		console.info(e);
		return null;
	}
}

/*
 * 中止卡片
 * 返回：boolean
 *//**/
function cardClose(){
	try{
		MWRFATL.CloseCard();
		if(rfRight()){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 蜂鸣 
 * 单位：毫秒
 *//**/
function rfBeep(){
	var time=arguments[0]?arguments[0] : 10;
	try{
		MWRFATL.RF_Beep(time);
	}catch (e) {
		console.info(e);
	}
}

/*
 * 获取设备版本号
 * 只能在一开始使用，不能在读卡途中使用否则设备会被关闭
 * null 说明设备异常
 * 返回StringOrNull
 *//**/
function rfVer(){
	try{
		MWRFATL.CloseReader();
        ver = MWRFATL.OpenReader();
		MWRFATL.CloseReader();
		if(rfRight()){
			return ver;
		}else{
			return null;
		}
	}catch (e) {
		console.info(e);
		return null;
	}
}

/*
 * 装载密钥 
 * mode: 密码类型
 * 		 0 — KEY A
 * 		 4 — KEY B
 * sector: 须装载密码的扇区号(0～15) 
 * key:  写入读写器的12字节新密码
 * 返回：boolean
 *//**/
function rfLoadKeySingle(sector, key, mode){
	try{
		if(sector>15){
			return false;
		}
		MWRFATL.RF_LoadKey(mode, sector, key);
		if(rfRight()){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 核对密码
 * 参数： mode：密码类型
 * 	     sector: 扇区
 * 返回：boolean
 *//**/
function rfAuthenticationSingle(sector, mode){
	try{
		if(sector>15){
			return false;
		}
		MWRFATL.RF_Authentication(mode, sector);
		if(rfRight()){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 读取某块
 * 返回StringOrNull
 *//**/
function rfReadBlockSingle(block){
	try{
		if (block > 63){
			return null;
		}
		var result = MWRFATL.MF_Read(block).slice(0,32);
		if(rfRight()){
			return result;
		}else{
			return null;
		}
	}catch (e) {
		console.info(e);
		return null;
	}
}

/*
 * 写入某块
 * boolean
 *//**/
function rfWriteBlockSingle(block,string){
	string = string.toString();
	try{
		if (block > 63){
			return false;
		}
		MWRFATL.MF_Write(block, string);
		if(rfRight()){
			return true;
		}else{
			return false;
		}
	}catch (e) {
		console.info(e);
		return false;
	}
}

/*
 * 字符串转十六进制
 * 调用的是dll封装的
 * 测试后发现是转gbk编码
 * 支持中文
 * 十六进制和Asc之间的转换
 * String or null
 *//**/
function toHex(string) {
	try{
		var result = MWRFATL.MF_hex_a(string, string.Length());
		if(rfRight()){
			return result;
		}else{
			return null;
		}
	}catch (e) {
		console.info(e);
		return null;
	}
}

/*
 * 十六进制转字符串
 * 调用的是dll封装的。
 * 支持中文
 * 十六进制和Asc之间的转换
 * String or null
 *//**/
function toAsc(string) {
	try{
		var result = MWRFATL.MF_a_hex(string, string.Length());
		if(rfRight()){
			return result;
		}else{
			return null;
	}
	}catch (e) {
		console.info(e);
		return null;
	}
}
//core end...
//------------------------------------------------------------------------------------
//base
/*
 * 装载密码
 * 密钥，数量，模式
 *//**/
function rfLoadKey(){
	//密码
	var key=arguments[0]?arguments[0] : "FFFFFFFFFFFF";
	//需要装载的扇区数量
	var num=arguments[1]?arguments[1] : 16;
	//模式
	var mode=arguments[2]?arguments[2] : "0";
	for (i=0;i<num;i+=1){
		if(!rfLoadKeySingle(i, key, mode)){
			cardClose();
			cardOpen();
			return false;
		}
	}
	return true;
}

/*
 * 块，密钥，模式
 *//**/
function rfLoadKeySector(sector){
	var key=arguments[1]?arguments[1] : "FFFFFFFFFFFF";
	var mode=arguments[2]?arguments[2] : "0";
	if (sector > 15){
		return false;
	}
	if(!rfLoadKeySingle(sector, key, mode)){
		cardClose();
		cardOpen();
		return false;
	}
	return true;
}

function rfLoadKeyBlock(block){
	var key=arguments[1]?arguments[1] : "FFFFFFFFFFFF";
	var mode=arguments[2]?arguments[2] : "0";
	var sector = Math.floor(block/4);
	if (sector > 15){
		return false;
	}
	if(!rfLoadKeySingle(sector, key, mode)){
		cardClose();
		cardOpen();
		return false;
	}
	return true;
}

/*
 * 校验密码
 *//**/
function rfAuthentication(){
	var num=arguments[0]?arguments[0] : 16;
	var mode=arguments[1]?arguments[1] : "0";
	for (var i=0;i<num;i+=1){
		if(!rfAuthenticationSingle(i, mode)){
			cardClose();
			cardOpen();
			return false;
		}
	}
	return true;
}

function rfAuthenticationSector(sector){
	var mode=arguments[1]?arguments[1] : "0";
	if (sector > 15){
		return false;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardClose();
		cardOpen();
		return false;
	}
	return true;
}

function rfAuthenticationBlock(block){
	var mode=arguments[1]?arguments[1] : "0";
	var sector = Math.floor(block/4);
	if (sector > 15){
		return false;
	}
	if(!rfAuthenticationSingle(sector, mode)){
		cardClose();
		cardOpen();
		return false;
	}
	return true;
}

/*
 * 读取某一块,自带验证
 * 返回StringOrNull
 *//**/
function rfReadBlock(block){
	var mode=arguments[1]?arguments[1] : "0";
	var sector = Math.floor(block/4);
	if (sector > 15){
		return null;
	}
	if(rfAuthenticationSingle(sector, mode)){
		return rfReadBlockSingle(block);
	}
	return null;
}

/*
 * 写入某块,自带验证
 * 返回：boolean
 *//**/
function rfWriteBlock(block,string){
	var mode=arguments[2]?arguments[2] : "0";
	var sector = Math.floor(block/4);
	if (sector > 15){
		return false;
	}
	if(rfAuthenticationSingle(sector,mode)){
		return rfWriteBlockSingle(block,string);
	}
	return false;
}

/*
 * 新卡初始化
 * 除了新卡初始化别的用不到
 * 最后一块密码块写
 * 返回：boolean
 */
function rfInitSector(sector,array) {
	if(!rfAuthenticationSector(sector)){
		return false;
	}
	if (sector > 15){
		return false;
	}
	//最后一块数据写内容
	if(!rfWriteBlockSingle(sector * 4, array[0])){
		return false;
	}
	if(!rfWriteBlockSingle(sector * 4+1, array[1])){
		return false;
	}
	if(!rfWriteBlockSingle(sector * 4+2, array[2])){
		return false;
	}
	if(!rfWriteBlockSingle(sector * 4+3, array[3])){
		return false;
	}
	return true;
}

/*
 * 块写数据
 * 最后一块密码块不写
 * 返回：boolean
 */
function rfWriteSector(sector,array) {
	if(!rfAuthenticationSector(sector)){
		return false;
	}
	if (sector > 15){
		return false;
	}
	//最后一块数据不写内容
	if(!rfWriteBlockSingle(sector * 4, array[0])){
		return false;
	}
	if(!rfWriteBlockSingle(sector * 4+1, array[1])){
		return false;
	}
	if(!rfWriteBlockSingle(sector * 4+2, array[2])){
		return false;
	}
	return true;
}

//base end...
//------------------------------------------------------------------------------------
//base ex
//带返回信息的
//开和关
function rfBegin(){
	var result = {"result":true,"message":""};
	if(!rfOpen()){
		rfClose();
		result.result=false;
		result.message="设备没有打开!!!";
		return result;
	}
	return result;
}
function rfEnd(){
	rfClose();
}
function cardBeginSingle(){
	var result = {"result":true,"message":""};
	//寻卡
	if(!cardOpen()){
		cardClose();
		rfClose();
		result.result=false;
		result.message="没有找到卡!!!";
		return result;
	}
	return result;
}
function cardBegin(){
	var result = {"result":true,"message":""};
	var temp = rfBegin();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	temp = cardBeginSingle();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	return result;
}
function cardBeginLoadAuth(){
	//密码
	var key=arguments[0]?arguments[0] : "FFFFFFFFFFFF";
	//需要装载的扇区数量
	var num=arguments[1]?arguments[1] : 16;
	//模式
	var mode=arguments[2]?arguments[2] : "0";
	var result = {"result":true,"message":""};
	var temp = cardBegin();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	if(!rfLoadKey(key,num,mode)){
		cardEnd();
		result.result=false;
		result.message="载入失败";
		return result;
	}
	
	if(!rfAuthentication(num,mode)){
		cardEnd();
		result.result=false;
		result.message="校验失败";
		return result;
	}
	
	return result;
}
function cardEndSingle(){
	cardClose();
}
function cardEnd(){
	cardEndSingle();
	rfEnd();
}

//