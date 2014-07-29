//此js使用前必须启用 activeX 对象



//以下需要考虑到服务端口的------------------------------------------------------------------
/*
 * 通过ajax 解密一组数据
 * 同时在使用的时候复制过去重载 或者设置base属性
 * js里面不能用el所以传入
 * 返回ArrayOrNull
 */
function decryptPwd(arr){
	var deout1=null;
	var deout2=null;
	$.ajax({url:"makeCard/makeCardAction!endecrypt.action", 
	data:"mode=1&ser1="+arr[0]+"&ser2="+arr[1],
	type:"post",
	dataType:"json", 
	async:false, 
	success:function (data) {
		if(data.ser1 != null){
			deout1 = data.ser1;
		}
		if(data.ser2 != null){
			deout2 = data.ser2;
		}
	}});
	
	if(deout1==null || deout2==null){
		return null;
	}
	
	var keyArr = new Array();
	keyArr[0]=deout1;
	keyArr[1]=deout2;
	return keyArr;
}

/*
 * 通过ajax 加密一组数据
 * 返回ArrayOrNull
 */
function encryptPwd(arr){
	var in1=arr[0];
	var in2=arr[1];
	//加密
	var out1=null;
	var out2=null;
	//http://localhost:8080/hb/json/test?mode=0&ser1=2CF342D16EBC4AA1C0E8E906195596BD&ser2=2CF342D16EBC4AA1C0E8E906195596BD
	$.ajax({url:"makeCard/makeCardAction!endecrypt.action", 
	data:"mode=0&ser1="+in1+"&ser2="+in2,
	type:"post",
	dataType:"json", 
	async:false, 
	success:function (data) {
		if(data.ser1 != null){
			out1 = data.ser1;
		}
		if(data.ser2 != null){
			out2 = data.ser2;
		}
	}});
	
	if(out1==null || out2==null){
		return null;
	}
	
	var resArr = new Array();
	resArr[0]=out1;
	resArr[1]=out2;
	return resArr;
}



//html页面的一些select对象 jquery对象-------------------------------
/*
 * 卡类型
 */
function getCardTypes($select){
	$select.append("<option value=\"\">请选择</option>");
	$select.append("<option value=\"1\">会员卡</option>");
	$select.append("<option value=\"9\">内部员工卡</option>");
	$select.append("<option value=\"82\">管理员卡</option>");
}

/*
 * 对应的卡类型所需要增加的年份
 * 返回需要增加的年份
 */
function getCardTypeAdd(val){
	switch(val){
	case 1:
		return 3;
	case 9:
		return 1;
	case 82:
		return 1;
	default:
		return 0;
	}
}

/*
 * 返回对应卡增加的年份
 * 传入的2个jquery对象
 * 案例在make2.js
 * 如果穿如空则回执空
 */
function getCardTypeAddYear($type,$date){
	var v = $type.val();
	v = parseInt(v);
	if(isNaN(v)){
		$date.val("");
		return;
	}
	var addy = getCardTypeAdd(v);
	var date = new Date();
	date.setFullYear(date.getFullYear()+addy);
	$date.val(date.Format("yyyy/MM/dd hh:mm:ss"));
}

/*
 * 收费方式
 */
function getChargeTypes($select){
	$select.append("<option value=\"\">请选择</option>");
	$select.append("<option value=\"1\">1小时1元，前1小时免费</option>");
	$select.append("<option value=\"2\">临时卡－每小时2元</option>");
}

/*
 * 充值类别
 */
function getRechargeTypes($select){
	$select.append("<option value=\"\">请选择</option>");
	$select.append("<option value=\"1\">正常充值</option>");
	$select.append("<option value=\"2\">异常充值</option>");
}

//core begin...
//考虑到会换型号，以下对底层的封装单独列出来----------------------------------------------------
/*
 * 关闭设备
 * 返回：boolean
 */
function rfClose(){
	MWRFATL.CloseReader();
	if(rfRight()){
		return true;
	}else{
		return false;
	}
}

/*
 * 开启设备
 * 返回：boolean
 */
function rfOpen(){
	MWRFATL.CloseReader();//这段需要加上，否则连续开两次则会异常
	MWRFATL.OpenReader();
	if(rfRight()){
		return true;
	}else{
		return false;
	}
}

/*
 * 是否成功
 * 返回：boolean
 */
function rfRight(){
	if(MWRFATL.LastRet==0){
		return true;
	}else{
		return false;
	}
}

/*
 * 复位(手册上说)
 * 不确定，因为无法测试
 * 单位毫秒
 * 按照流程图设计需要
 */
function rfReset(){
	var time=arguments[0]?arguments[0] : 5;
	MWRFATL.MF_Reset(time);
}

/*
 * 寻卡
 * 返回StringOrNull
 * 如果设备没开，打开card就会直接js错误--（即不再运行下去）
 */
function cardOpen(){
	rfReset();//此段用意不明,厂商提供上有
    var result=MWRFATL.OpenCard(1);
	if(rfRight()){
		return result;
	}else{
		return null;
	}
}

/*
 * 中止卡片
 * 返回：boolean
 */
function cardClose(){
	MWRFATL.CloseCard();
	if(rfRight()){
		return true;
	}else{
		return false;
	}
}

/*
 * 蜂鸣 
 * 单位：毫秒
 */
function rfBeep(){
	var time=arguments[0]?arguments[0] : 10;
	MWRFATL.RF_Beep(time); 
}

/*
 * 获取设备版本号
 * 只能在一开始使用，不能在读卡途中使用否则设备会被关闭
 * null 说明设备异常
 * 返回StringOrNull
 */
function rfVer(){
		MWRFATL.CloseReader();
        ver = MWRFATL.OpenReader();
		MWRFATL.CloseReader();
		if(rfRight()){
			return ver;
		}else{
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
 */
function rfLoadKeySingle(mode, sector, key){
	MWRFATL.RF_LoadKey(mode, sector, key);
	if(rfRight()){
		return true;
	}else{
		return false;
	}
}

/*
 * 核对密码
 * 参数： mode：密码类型
 * 	     sector: 扇区
 * 返回：boolean
 */
function rfAuthenticationSingle(mode, sector){
	MWRFATL.RF_Authentication(mode, sector);
	if(rfRight()){
		return true;
	}else{
		return false;
	}
}

/*
 * 读取某块
 * 返回StringOrNull
 */
function rfReadBlockSingle(block){
	if (block > 63){
		alert("BlockError!");
		return null;
	}
	var result = MWRFATL.MF_Read(block).slice(0,32);
	if(rfRight()){
		return result;
	}else{
		return null;
	}
}

/*
 * 写入某块
 * boolean
 */
function rfWriteBlockSingle(block,string){
	if (block > 63){
		alert("BlockError!");
		return false;
	}
	MWRFATL.MF_Write(block, string);
	if(rfRight()){
		return true;
	}else{
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
 */
function toHex(string) {
	var result = MWRFATL.MF_hex_a(string, getLen(string));
	if(rfRight()){
		return result;
	}else{
		return null;
	}
}

/*
 * 十六进制转字符串
 * 调用的是dll封装的。
 * 支持中文
 * 十六进制和Asc之间的转换
 * String or null
 */
function toAsc(string) {
	var result = MWRFATL.MF_a_hex(string, getLen(string));
	if(rfRight()){
		return result;
	}else{
		return null;
	}
}
//core end...
//-----------------------------------------------------------------------------------------

//以下是对以上基础的封装------------------------------------------------------------------
/*
 * 新卡装载密钥 
 * 因为密码是一份的
 * 第三个参数默认是16
 * 返回：boolean
 */
function rfLoadKeyforNew(mode){
	var key=arguments[1]?arguments[1] : "FFFFFFFFFFFF";
	var num=arguments[2]?arguments[2] : 16;
	for (i=0;i<num;i+=1){
		if(!rfLoadKeySingle(mode,i,key)){
			return false;
		}
	}
	return true;
}

/*
 * 卡装载密钥 
 * 参数:是两组解密的密码字符串
 * 对新卡可以载入15组数据
 * 此处用不到的扇区就不加载了
 * 返回：boolean
 */
function rfLoadKey(mode, keyArr){
	var inikey = "FFFFFFFFFFFF";
	var destr1=keyArr[0];
	var destr2=keyArr[1];
	var setCode1 = destr1.substring(0, 12);
	var setCode2 = destr1.substring(12, 24);
	var setCode3 = destr2.substring(0, 12);
	var setCode4 = destr2.substring(12, 24);
	var arr = new Array();
	arr[0] = inikey;
	arr[1] = inikey;
	arr[2] = setCode1;
	arr[3] = setCode1;
	arr[4] = setCode1;
	arr[5] = setCode2;
	arr[6] = null;
	arr[7] = setCode3;
	arr[8] = setCode4;
	arr[9] = setCode4;
	
	for(var i=0;i<arr.length;i+=1){
		if(arr[i]!=null){
			if(!rfLoadKeySingle(mode,i,arr[i])){
				return false;
			}
		}
	}
	
	return true;
}

/*
 * 核对密码
 * 第二个参数默认是9，可以是16(对新卡而言)
 * 返回：boolean
 */
function rfAuthentication(mode){
	var num=arguments[1]?arguments[1] : 9;
	var arr = new Array(0,1,2,3,4,5,7,8,9);
	var result = new Array();
	
	if(num==16){
		//校验新卡
		for (var i=0;i<num;i+=1){
			if(!rfAuthenticationSingle(mode,i)){
				return false;
			}
		}
	}else if(num==9){
		//校验卡的内容
		for(var i in arr){
			if(!rfAuthenticationSingle(mode,arr[i])){
				return false;
			}
		}
	}else{
		return false;
	}
	
	return true;
}

/*
 * 读取某一块,自带验证
 * 返回StringOrNull
 */
function rfReadBlock(mode,block){
	var sector = Math.floor(block/4);
	if (sector > 15){
		alert("SecError!");
		return null;
	}
	if(rfAuthenticationSingle(mode,sector)){
		return rfReadBlockSingle(block);
	}
	return null;
}

/*
 * 读扇区数据 
 * 最后一块没有读取的意义
 * 返回StringOrNull
 */
function rfReadSingle(sector) {
	if (sector > 15){
		alert("SecError!");
		return null;
	}
	var address = sector * 4;
	var result = new Array();
	result[0]=rfReadBlockSingle(address);
	result[1]=rfReadBlockSingle(address+1);
	result[2]=rfReadBlockSingle(address+2);
	if(result[0]!=null && result[1]!=null && result[2]!=null ){
		return result;
	}else{
		return null;
	}
}

/*
 * 读扇区数据,自带验证
 * 集成核对密码，因为每次读取扇区都需要核对密码
 * 返回StringOrNull
 */
function rfRead(mode,sector) {
	if(rfAuthenticationSingle(mode,sector)){
		return rfReadSingle(sector);
	}
	return null;
}

/*
 * 写入某块,自带验证
 * 返回：boolean
 */
function rfWriteBlock(mode,block,string){
	var sector = Math.floor(block/4);
	if (sector > 15){
		alert("SecError!");
		return false;
	}
	if(rfAuthenticationSingle(mode,sector)){
		return rfWriteBlockSingle(block,string);
	}
	return false;
}

/*
 * 块写数据
 * 最后一块密码块不写
 * 返回：boolean
 */
function rfWriteSingle(sector,array) {
	if (sector > 15){
		alert("SecError!");
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

/*
 * 块写数据,自带验证
 * 最后一块密码块不写
 * 返回：boolean
 */
function rfWrite(mode,sector,array) {
	if(rfAuthenticationSingle(mode,sector)){
		return rfWriteSingle(sector,array);
	}
	return false;
}

/*
 * 新卡初始化
 * 除了新卡初始化别的用不到
 * 最后一块密码块写
 * 返回：boolean
 */
function rfInitSingle(sector,array) {
	if (sector > 15){
		alert("SecError!");
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
 * 新卡初始化,自带验证
 * 最后一块数据写内容
 * 返回：boolean
 */
function rfInit(mode,sector,array) {
	if(rfAuthenticationSingle(mode,sector)){
		return rfInitSingle(sector,array);
	}
	return false;
}

/*
 * 读取所有的数据
 * 默认是9，读新卡可以用16
 * 第二个参数默认是9
 * 返回的是一个二维数组
 * 返回StringOrNull
 */
function rfReadAll(mode){
	var num=arguments[1]?arguments[1] : 9;
	var arr = new Array(0,1,2,3,4,5,7,8,9);
	var result = new Array();
	
	if(num==16){
		//读取新卡
		for (var i=0;i<num;i+=1){
			result[i] = rfRead(mode,i);
			if(result[i]==null){
				return null;
			}
		}
	}else if(num==9){
		//读取卡的内容
		for(var i in arr){
			result[arr[i]] = rfRead(mode,arr[i]);
			if(result[arr[i]]==null){
				return null;
			}
		}
	}else{
		return null;
	}
	
	return result;
}

/*
 * 读取卡的序列号
 * 
 */
function rfReadSer(mode){
	var sector = 0;
	var inikey = "FFFFFFFFFFFF";
	//装载
	if(!rfLoadKeySingle(mode, sector, inikey)){
		return null;
	}
	//验证
	if(!rfAuthenticationSingle(mode, sector)){
		return null;
	}
	return rfReadBlockSingle(0);
}

/*
 * 读取0扇区一组密码
 * 如果没处理过的卡则 00000000000000000000000000000000
 * 返回ArrayOrNull
 */
function rfReadPwd(mode){
	var sector = 0;
	var inikey = "FFFFFFFFFFFF";
	
	//装载
	if(!rfLoadKeySingle(mode, sector, inikey)){
		return null;
	}
	
	//验证
	if(!rfAuthenticationSingle(mode, sector)){
		return null;
	}
	
	//读取
	var out1 = rfReadBlockSingle(sector*4+1);
	var out2 = rfReadBlockSingle(sector*4+2);
	
	if(out1==null || out2==null){
		return null;
	}
	
	//返回
	var result = new Array();
	result[0] = out1;
	result[1] = out2;
	return result;
}

//对基础的封装------------------------------------------------------------------
//失败则直接收尾了
//检查密码
function checkPwdSin(){
	var mode=arguments[0]?arguments[0] : "0";
	var result = {"result":true,"message":""};
	//获取密码
	var pwd = rfReadPwd(mode);
	if(pwd==null){
		cardEnd();
		result.result=false;
		result.message="获取密码异常...";
		return result;
	}
	//解密
	var dePwd = decryptPwd(pwd);
	if(dePwd==null){
		cardEnd();
		result.result=false;
		result.message="解密异常...";
		return result;
	}
	result.message = dePwd;
	return result;
}

//检查密码并装载
function checkLoadPwdSin(){
	var mode=arguments[0]?arguments[0] : "0";
	var result = {"result":true,"message":""};
	
	//解密
	var temp = checkPwdSin(mode);
	if(!temp.result){
		cardEnd();
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	var dePwd = temp.message;
	
	//装载密码
	if(!rfLoadKey(mode,dePwd)){
		cardEnd();
		result.result=false;
		result.message="装载密码异常...";
		return result;
	}
	
	//密码验证
	if(!rfAuthentication(mode)){
		cardEnd();
		result.result=false;
		result.message="验证密码异常...";
		return result;
	}
	
	return result;
}

//对以上基础的封装且附带alert提示、警告(重构去掉了alert)--------------------------------------------------------------
/*
 * rf开
 */
function rfBegin(){
	if(!rfOpen()){
		rfClose();
		alert("设备没有打开!!!");
		return false;
	}
	return true;
}

/*
 * 重制
 */
function rfBeginr(){
	var result = {"result":true,"message":""};
	if(!rfOpen()){
		rfClose();
		result.result=false;
		result.message="设备没有打开!!!";
		return result;
	}
	return result;
}

/*
 * rf关
 */
function rfEnd(){
	rfClose();
}

/*
 * 对卡操作(无关rf设备)
 */
function cardBeginSingle(){
	//寻卡
	if(!cardOpen()){
		cardClose();
		rfClose();
		alert("没有找到卡!!!");
		return false;;
	}
	return true;
}

/*
 * 重制
 */
function cardBeginSingler(){
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

/*
 * 卡操作的起始操作
 */
function cardBegin(){
	//开启设备
	if(!rfBegin()) return false;
	
	//寻卡
	if(!cardBeginSingle()) return false;
	
	return true;
}

/*
 * 重制
 */
function cardBeginr(){
	var result = {"result":true,"message":""};
	var temp = rfBeginr();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	temp = cardBeginSingler();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	return result;
}

/*
 * 卡操作结束的收尾(无关rf设备)
 */
function cardEndSingle(){
	rfReset();
	cardClose();
}

/*
 * 卡操作结束的收尾
 */
function cardEnd(){
	cardEndSingle();
	rfEnd();
}

/*
 * 读卡前 检查是新卡还是已经制作
 * 返回:1,新卡 2,正常卡 3,为未知卡
 */
function checkCard(){
	if(!rfBegin()) return false;
	var res = checkCardSingle();
	rfEnd();
	return res;
}

/*
 * 重制
 * 返回:1,新卡  2,正常卡 3,制卡后的新卡 ,false为未知卡
 */
function checkCardr(){
	var result = {"result":true,"message":""};
	var temp = rfBeginr();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	temp = checkCardSingler();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	rfEnd();
	result.message=temp.message;
	return result;
}
/*
 * 读卡前 检查是新卡还是已经制作(不包含开关设备)
 * 1,新卡 2，正常卡 3，未知卡
 */
function checkCardSingle(){
	var mode=arguments[0]?arguments[0] : "0";
	var key="FFFFFFFFFFFF";
	if(!cardBeginSingle()){
		cardEndSingle();
		alert("寻卡异常!!!");
		return false;
	}
	
	//检查是否为新卡
	if(!rfLoadKeyforNew(mode,key)){
		cardEndSingle();
		alert("CheckCard error code:[1]!!!");
		return false;
	}
	if(rfAuthentication(mode,16)){
		cardEndSingle();
		return 1;
	}
	
	cardEndSingle();
	if(!cardBeginSingle()) return false;
	
	//检查是否为旧卡
	var pwd = rfReadPwd(mode);
	if(pwd==null){
		cardEndSingle();
		alert("获取密码异常!!!");
		return false;
	}
	var dePwd = decryptPwd(pwd);
	if(dePwd==null){
		cardEndSingle();
		alert("解密异常!!!");
		return false;
	}
	if(!rfLoadKey(mode,dePwd)){
		cardEndSingle();
		alert("装载密码异常!!!");
		return false;
	}
	if(rfAuthentication(mode)){
		cardEndSingle();
		return 2;
	}
	
	cardEndSingle();
	return 3;
}

/*
 * 重制
 * 返回:1,新卡  2,正常卡 3,制卡后的新卡 ,false为未知卡
 */
function checkCardSingler(){
	var mode=arguments[0]?arguments[0] : "0";
	var result = {"result":true,"message":""};
	var temp = cardBeginSingler();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	//检查是否为新卡
	if(!rfLoadKeyforNew(mode)){
		cardEndSingle();
		result.result=false;
		result.message="载入新卡密码!!!";
		return result;
	}
	if(rfAuthentication(mode,16)){
		cardEndSingle();
		result.message=1;
		return result;
	}
	
	cardEndSingle();
	
	temp = cardBeginSingler();
	if(!temp.result){
		result.result=false;
		result.message=temp.message+"2";
		return result;
	}
	
	//检查是否为旧卡
	var pwd = rfReadPwd(mode);
	if(pwd==null){
		cardEndSingle();
		result.result=false;
		result.message="获取密码异常!!!";
		return result;
	}
	var dePwd = decryptPwd(pwd);
	if(dePwd==null){
		cardEndSingle();
		result.result=false;
		result.message="解密异常!!!";
		return result;
	}
	if(!rfLoadKey(mode,dePwd)){
		cardEndSingle();
		result.result=false;
		result.message="装载密码异常!!!";
		return result;
	}
	if(!rfAuthentication(mode)){
		cardEndSingle();
		result.result=false;
		result.message="验证密码失败!!!";
		return result;
	}
	
	//判断是否为制作过的卡
	var sb21 = readsb21Sin();
	
	if(sb21.cardId=="0000000000000000"){
		result.message=3;
	}else{
		result.message=2;
	}
	
	cardEndSingle();
	return result;

}

/*
 *打开设备，校验卡，校验密码，装载 
 */
function rfcdBegin(){
	var mode=arguments[0]?arguments[0] : "0";
	//开启设备
	if(!rfBegin()) return false;
	//检查卡
	if(checkCardSingle()!=2){
		cardEnd();
		alert("此非正常卡!!!");
		return false;
	}
	//加载
	cardBeginSingle();
	
	var pwd = rfReadPwd(mode);
	if(pwd==null){
		cardEnd();
		alert("读取异常1!!!");
		return false;
	}
	var dePwd = decryptPwd(pwd);
	if(dePwd==null){
		cardEnd();
		alert("读取异常2!!!");
		return false;
	}
	if(!rfLoadKey(mode,dePwd)){
		cardEnd();
		alert("读取异常3!!!");
		return false;
	}
}

/*
 * 重制
 */
function rfcdBeginr(){
	var mode=arguments[0]?arguments[0] : "0";
	var result = {"result":true,"message":""};
	//开始
	var temp = rfBeginr();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	//检查卡
	temp = checkCardSingler();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	if(temp.message!=2){
		cardEnd();
		result.result=false;
		result.message="此非正常卡!!!";
		return result;
	}
	
	temp = cardBeginSingler();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	//装载密码
	var temp = checkLoadPwdSin();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	return result;
}
//读卡的封装----------------------------------------------------------------------------------------
//系统区
/*
 * sb21
 * 解码2扇区1块的数据 Single
 * 源String,源String,源String
 */
function readsb21Sin(){
	var mode=arguments[0]?arguments[0] : "0";
	var sysId;//系统Id 2
	var cardId;//卡号 8
	//var sysExId;//系统Id扩展 2
	var sysAuId;//授权系统Id 2
	var sb21 = rfReadBlock(mode,2*4+1);
	//printAdd("sb21:"+sb21+"\n");
	sysId = sb21.substring(0,4);
	cardId = sb21.substring(4,20);
	//sysExId = sb21.substring(20,24);
	sysAuId = sb21.substring(24,28);
	return {"sysId":sysId,"cardId":cardId,"sysAuId":sysAuId};
}

/*
 * sb21
 * 源String,源String,源String
 */
function writesb21Sin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var sysId = obj.sysId;
	var cardId = obj.cardId;
	//var sysExId = obj.sysExId;
	var sysAuId = obj.sysAuId;
	sysId = getPad(sysId,4);
	cardId = getPad(cardId,16);
	//sysExId = getPad(sysExId,4);
	sysAuId = getPad(sysAuId,4);
	var sb21=rightPad(sysId+cardId+"0000"+sysAuId,32);
	if(!rfWriteBlock(mode,2*4+1,sb21)){
		return false;
	}
	return true;
}

/*
 * sb22
 * 日期，源String，数组，Int
 */
function readsb22Sin(){
	var mode=arguments[0]?arguments[0] : "0";
	var validDay;//有效期限 7
	var cardType;//卡属性  2+2卡角色+6个0
	var cardRole = new Array();//卡角色
	var chargeType;//卡收费方式 2 1+1 16进制
	
	var sb22 = rfReadBlock(mode,2*4+2);
	
	var vdstr = sb22.substring(0,14);
	validDay = new Date(vdstr.substring(0,4),parseInt(vdstr.substring(4,6))-parseInt(1),vdstr.substring(6,8),vdstr.substring(8,10),
			vdstr.substring(10,12),vdstr.substring(12,14)); 
	if(validDay.toDateString()=="Invalid Date"){
		validDay = null;
	}
	//菜单
	cardType = sb22.substring(14,16);
	//角色
	var cardRoles = sb22.substring(16,18);
	cardRoles = parseInt(cardRoles,16);
	cardRole[0] = (cardRoles&1);
	cardRole[1] = (cardRoles>>1&1);
	cardRole[2] = (cardRoles>>2&1);
	cardRole[3] = (cardRoles>>3&1);
	cardRole[4] = (cardRoles>>4&1);
	cardRole[5] = (cardRoles>>5&1);
	cardRole[6] = (cardRoles>>6&1);
	cardRole[7] = (cardRoles>>7&1);
	//收费方式
	chargeType = parseInt(sb22.substring(24,26),16);
	return {"validDay":validDay,"cardType":cardType,"cardRole":cardRole,"chargeType":chargeType};
}

/*
 * 日期，源String，数组，Int
 */
function writesb22Sin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var validDay = obj.validDay;
	var cardType = obj.cardType;
	var cardRole = obj.cardRole
	var chargeType = obj.chargeType;
	validDay = validDay.Format("yyyyMMddhhmmss");
	validDay = getPad(validDay,14);
	cardType = getPad(cardType,2);
	cardRole = (cardRole[6]<<6)+(cardRole[5]<<5)+(cardRole[4]<<4)+(cardRole[3]<<3)+(cardRole[2]<<2)+(cardRole[1]<<1)+(cardRole[0]<<0);
	cardRole = cardRole.toString(16);
	cardRole = getPad(cardRole,2);
	chargeType = parseInt(chargeType).toString(16);
	chargeType = getPad(chargeType,2);
	var sb22=rightPad(validDay+cardType+cardRole+"000000"+chargeType+"01",32);
	if(!rfWriteBlock(mode,2*4+2,sb22)){
		return false;
	}
	return true;
}

/*
 * 解码30
 * Asc
 */
function readUserNameSin(){
	var mode=arguments[0]?arguments[0] : "0";
	var userName;//姓名 16B Asc
	var sb30 = rfReadBlock(mode,3*4+0);
	userName = toAsc(sb30).trim();
	return {"userName":userName};
}

/*
 * Asc
 */
function writeUserNameSin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var userName = obj.userName;
	
	userName = getPadAsctoHex(userName,32);
	
	var sb30=rightPad(userName,32);
	if(!rfWriteBlock(mode,3*4+0,sb30)){
		return false;
	}
	return true;
}

/*
 * 解码31，32
 * Asc,Asc
 */
function readPaperWorkSin(){
	var mode=arguments[0]?arguments[0] : "0";
	var paperType;//证件类别 2B Asc
	var paperId;//证件号码 30B Asc
	var sb31 = rfReadBlock(mode,3*4+1);
	var sb32 = rfReadBlock(mode,3*4+2);
	paperType = sb31.substring(0,4);
	paperType = toAsc(paperType).trim();
	paperId = toAsc(sb31.substring(4,32)+sb32).trim();
	return {"paperType":paperType,"paperId":paperId};
}

/*
 * Asc,Asc
 */
function writePaperWorkSin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var paperType=obj.paperType;
	var paperId=obj.paperId;
	paperType = getPadAsctoHex(paperType,4);
	paperId = getPadAsctoHex(paperId,60);
	var sb31 = rightPad(paperType+paperId.substring(0,28),32);
	var sb32 = rightPad(paperId.substring(28,60),32);
	if(!rfWriteBlock(mode,3*4+1,sb31)){
		return false;
	}
	if(!rfWriteBlock(mode,3*4+2,sb32)){
		return false;
	}
	return true;
}

/*
 * 解码40
 * Asc
 */
function readPhoneNumSin(){
	var mode=arguments[0]?arguments[0] : "0";
	var phoneNum;//手机号 11B
	var sb40 = rfReadBlock(mode,4*4+0);
	phoneNum = sb40.substring(0,22);
	phoneNum = toAsc(phoneNum).trim();
	return {"phoneNum":phoneNum};
}

/*
 * 传入Asc
 */
function writePhoneNumSin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var phoneNum = obj.phoneNum;
	
	phoneNum = getPadAsctoHex(phoneNum,22);
	
	var sb40 = rightPad(phoneNum+"0000000000",32);
	if(!rfWriteBlock(mode,4*4+0,sb40)){
		return false;
	}
	return true;
}

/*
 * 解码50
 * Asc,源String
 */
function readsb50Sin(){
	var mode=arguments[0]?arguments[0] : "0";
	var pwd;//密码
	var lockSta;//用户卡锁状态
	var sb50 = rfReadBlock(mode,5*4+0);
	pwd = sb50.substring(0,24);
	pwd = toAsc(pwd).trim();
	lockSta = sb50.substring(24,26);
	
	return {"pwd":pwd,"lockSta":lockSta};
}

/*
 * Asc,源String
 */
function writesb50Sin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var pwd = obj.pwd;
	var lockSta = obj.lockSta;
	pwd = getPadAsctoHex(pwd,24);
	lockSta = getPad(lockSta,2);
	var sb50 = rightPad(pwd+lockSta+"000000",32);
	if(!rfWriteBlock(mode,5*4+0,sb50)){
		return false;
	}
	return true;
}

/*
 * 解码70
 * 单位角
 * IntString
 */
function readsb70Sin(){
	var mode=arguments[0]?arguments[0] : "0";
	var money;//基本金额
	//var phyMoney;//押金金额
	//var gmMoney;//管理员充值金额
	//var gmPay;//管理员支付金额
	var sb70 = rfReadBlock(mode,7*4+0);
	money = hardToDec(sb70.substring(0,4));
	return {"money":money};
}

/*
 * IntString
 */
function writesb70Sin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var money = decToHard(obj.money);
	var sb70 = rightPad(money,32);
	if(!rfWriteBlock(mode,7*4+0,sb70)){
		return false;
	}
	return true;	
}

/*
 * 解码91
 * 源String,源String
 */
function readsb91Sin(){
	var mode=arguments[0]?arguments[0] : "0";
	var biSta;//租车状态
	var biId;//车辆ID
	var sb91 = rfReadBlock(mode,9*4+1);
	biSta = sb91.substring(0,2);
	biId = sb91.substring(2,22);
	return {"biSta":biSta,"biId":biId};
}

/*
 * 源String,源String
 */
function write91Sin(obj){
	var mode=arguments[1]?arguments[1] : "0";
	var biSta = obj.biSta;
	var biId = obj.biId;
	biSta = getPad(biSta,2);
	biId = getPad(biId,20);
	var sb91 = rightPad(biSta+biId,32);
	if(!rfWriteBlock(mode,9*4+1,sb91)){
		return false;
	}
	return true;
}


//以下仅仅是封装---------------------------------------------------------------------------------
//获取字符串的长度
//中文算2个长度，英文字母算1个
//num
function getLen(string){
	var l = string.length; 
	var result = 0; 
	for(i=0; i<l; i+=1) { 
		if ((string.charCodeAt(i) & 0xff00) != 0) { 
			result +=1; 
		} 
		result +=1; 
	}
	return result;
}

//获取一个随机长度的16进制，高位为0
//null or string
function getRnd(length){
	var result="";
	for (i=0; i<length; i+=1){
		result += leftPad(myRandom(16).toString(16).toUpperCase(),2);
	}
	if(result=="") return null;
	return result;
}

//说明：默认左补0
//content 要处理的内容
//num 长度，不足左补0
function leftPad(content, num) {
	var tag=arguments[2]?arguments[2] : "0";
	var n = tag.length;
	var len = content.length;
    while(len < num) {
        content = tag + content;
        len+=n;
    }
    return content;
}


//不足左补 足则cut取低位
function getPad(content, num){
	var tag=arguments[2]?arguments[2] : "0";
	content = content.toString();
	var n = tag.length;
	var len = content.length;
	if(len<num){
	    while(len < num) {
	        content = tag + content;
	        len+=n;
	    }
	}else{
		content = content.substring(len-num,len);
	}
    return content;
}

//说明：右补 默认是0
function rightPad(content, num){
	var tag=arguments[2]?arguments[2] : "0";
	var n = tag.length;
    var len = content.length;
    while(len < num) {
        content = content + tag;
        len+=n;
    }
    return content;
}

//Asc字符串转Hex 右补空格 多则保留低位
function getPadAsctoHex(string,num){
	string = string.toString();
	string = string.trim();
	string = toHex(string);
	string = rightPad(string,num,"20");
	string = getPad(string,num);
	return string;
}

//[0-max)
function myRandom(max){
	return Math.floor(Math.random()*max);
}

//var ua = navigator.userAgent.toLowerCase();
//查看浏览器版本
function getBrowser(ua){
    rMsie = /(msie\s|trident.*rv:)/;   
    rFirefox = /(firefox)/;  
    rOpera = /(opera)/;   
    rChrome = /(chrome)/;
    rSafari = /(safari)/; 
    var match = rMsie.exec(ua);  
    if (match != null) {  
        return "ie";  
    }  
    var match = rFirefox.exec(ua);  
    if (match != null) {  
        return match[1] || "";  
    }  
    var match = rOpera.exec(ua);  
    if (match != null) {  
        return match[1] || "";  
    }  
    var match = rChrome.exec(ua);  
    if (match != null) {  
        return match[1] || "";  
    }  
    var match = rSafari.exec(ua);  
    if (match != null) {  
        return match[2] || "";  
    }  
    if (match != null) {  
        return "";  
    }
}

/*
 * 去掉字符串两端的空白字符
 */
String.prototype.trim = function() {
    return this.replace(/(^\s+)|(\s+$)/g, "");
};

/*
 *去掉所有的空白字符
 */
String.prototype.trimAll = function() {
    return this.replace(/(\s+)/g, "");
};

//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
//author: meizz 
Date.prototype.Format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};  

//解析日期
// / :分割的
String.prototype.parseDate =function (){  
	var strArray = this.split(" ");  
	var strDate = strArray[0].split("/");  
	var strTime = strArray[1].split(":");  
	if(strDate.length!=3||strTime.length!=3){
		return null;
	}
	var a = new Date(strDate[0], (strDate[1]-parseInt(1)), strDate[2], strTime[0], strTime[1], strTime[2]); 
	if(a.toDateString()=="Invalid Date"){
		return null;
	}
	return a;
};

//16有符号的int 的物理存放 即高地位互换，未判断存入的范围
//返回 "FFFF"
function decToHard(number){
	number = (parseInt(number,10)>>>0).toString(16).toLocaleUpperCase();
	if(number.length==8){
		number = number.substring(4,8);
	}else{
		//左补0
		number = getPad(number,4);
	}
	number = number.substring(2,4)+number.substring(0,2);
	return number;
}

//以上的反转
//返回int
function hardToDec(number){
	number = getPad(number,4);
	number = number.substring(2,4)+number.substring(0,2);
	if(parseInt(number.substring(0,1),16)<8){
		//正数
		return (parseInt(number,16)<<0).toString(10).toLocaleUpperCase();
	}else{
		//负数
		number="FFFF"+number;
		return (parseInt(number,16)<<0).toString(10).toLocaleUpperCase();
	}	
}

