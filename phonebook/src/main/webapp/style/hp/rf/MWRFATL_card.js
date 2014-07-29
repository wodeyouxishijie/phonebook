// 公司里的卡的规范

/*
 * 0扇区，序列号和密码
 * 01,02
 * 序列号是5字节的。密码16字节
 *//**/
function readSystemSector(){
	var ser,pwd1,pwd2;
	//取前10位
	ser = rfReadBlock(0*4+0).substring(0,10);
	pwd1 = rfReadBlock(0*4+1);
	pwd2 = rfReadBlock(0*4+2);
	return {"ser":ser,"pwd1":pwd1,"pwd2":pwd2};
}

function writeSystemSector(obj){
	var pwd1 = obj.pwd1.cardRight(32);
	var pwd2 = obj.pwd2.cardRight(32);
	//右补0
	if(!rfWriteBlock(0*4+1,pwd1)){
		return false;
	}
	if(!rfWriteBlock(0*4+2,pwd2)){
		return false;
	}
	return true;
}

/*
 * sb21
 * 解码2扇区1块的数据 Single
 * 源String,源String,源String
 *//**/
function readCardInfoSector(){
//	var mode=arguments[0]?arguments[0] : "0";
	var sysId;//系统Id 2
	var cardId;//卡号 8
//	var sysExId;//系统Id扩展 2
	var sysAuId;//授权系统Id 2
	var sb21 = rfReadBlock(2*4+1);
	sysId = sb21.substring(0,4);
	cardId = sb21.substring(4,20);
	//sysExId = sb21.substring(20,24);
	sysAuId = sb21.substring(24,28);
	return {"sysId":sysId,"cardId":cardId,"sysAuId":sysAuId};
}

/*
 * sb21
 * 源String,源String,源String
 *//**/
function writeCardInfoSector(obj){
	var sysId = obj.sysId.cardRight(4);
	var cardId = obj.cardId.cardRight(16);
	//var sysExId = obj.sysExId;//以后可以写到新方法去，此处标记 
	var sysAuId = obj.sysAuId.cardRight(4);
	
	var sb21 = rfReadBlock(2*4+1);
	sysExId = sb21.substring(20,24);//未实现，但是为了向后兼容
	var temp = sb21.substring(28,32);
	var tosb21=(sysId+cardId+sysExId+sysAuId+temp).cardRight(32);
	if(!rfWriteBlock(2*4+1,tosb21)){
		return false;
	}
	return true;
}

//sb30
/*
 * 解码30
 * Asc
 */
function readUserName(){
	var userName;//姓名 16B Asc
	var sb30 = rfReadBlock(3*4+0);
	userName = toAsc(sb30).trim();
	return {"userName":userName};
}

/*
 * Asc
 */
function writeUserName(obj){
	var userName = obj.userName;
	
	userName = toHex(userName.cardStringRight(16)).cardRight(32);
	
	var sb30=userName.cardRight(32);
	if(!rfWriteBlock(3*4+0,sb30)){
		return false;
	}
	return true;
}

/*
 * 解码31，32
 * Asc,Asc
 */
function readPaperWork(){
	var paperType;//证件类别 2B Asc
	var paperId;//证件号码 30B Asc
	var sb31 = rfReadBlock(3*4+1);
	var sb32 = rfReadBlock(3*4+2);
	paperType = sb31.substring(0,4);
	paperType = toAsc(paperType).trim();
	paperId = toAsc(sb31.substring(4,32)+sb32).trim();
	return {"paperType":paperType,"paperId":paperId};
}

/*
 * Asc,Asc
 */
function writePaperWork(obj){
	var paperType=obj.paperType;
	var paperId=obj.paperId;
	paperType = toHex(paperType.cardStringRight(2)).cardRight(4);
	paperId = toHex(paperId.cardStringRight(30)).cardRight(60);
	var sb31 = (paperType+paperId.substring(0,28)).cardRight(32);
	var sb32 = (paperId.substring(28,60)).cardRight(32);
	if(!rfWriteBlock(3*4+1,sb31)){
		return false;
	} 
	if(!rfWriteBlock(3*4+2,sb32)){
		return false;
	}
	return true;
}

//卡激活
//sb50
function readUserSta(){
	var pwd;//密码
	var lockSta;//用户卡锁状态
	var actSta;//卡激活状态
	var sb50 = rfReadBlock(5*4+0);
	pwd = sb50.substring(0,24);
	pwd = toAsc(pwd).trim();
	lockSta = sb50.substring(24,26);
	actSta = sb50.substring(26,28);
	return {"pwd":pwd,"lockSta":lockSta,"actSta":actSta};
}

function writeUserSta(obj){
	var pwd = obj.pwd.toString();
	var lockSta = obj.lockSta.toString();
	var actSta = obj.actSta.toString();
	pwd = toHex(pwd.cardStringRight(12)).cardRight(24);
	lockSta = lockSta.cardLeft(2);
	actSta = actSta.cardLeft(2);
	var sb50 = rfReadBlock(5*4+0);
	var temp = sb50.substring(28,32);
	var tosb50 = (pwd+lockSta+actSta+temp).cardRight(32);
	if(!rfWriteBlock(5*4+0,tosb50)){
		return false;
	}
	return true;
}

/*
 * 解码70
 * 单位角
 * IntString
 *//**/
function readCardMoney(){
//	var mode=arguments[0]?arguments[0] : "0";
	var money;//基本金额
	//var phyMoney;//押金金额
	//var gmMoney;//管理员充值金额
	//var gmPay;//管理员支付金额
	var sb70 = rfReadBlock(7*4+0);
	money = hardToDec(sb70.substring(0,4));
	return {"money":money};
}

/*
 * IntString
 *//**/
function writeCardMoney(obj){
	var money = decToHard(obj.money);
	
	var sb70 = rfReadBlock(7*4+0);
	var tosb70 = (money.cardRight(4)+sb70.substring(4,32)).cardRight(32);
	
	if(!rfWriteBlock(7*4+0,tosb70)){
		return false;
	}
	return true;	
}

/*
 * sb92
 */
function readBusinessRent(){
	var station;
	var time;
	var sb92 = rfReadBlock(9*4+2);
	station = sb92.substring(0,8);
	time = sb92.substring(8,22);
	return {"station":station,"time":time};
}

function writeBussinessRent(obj){
	var station = obj.station.toString().cardLeft(8);
	var time = obj.time.toString().cardRight(14);
	var sb92 = rfReadBlock(9*4+2);
	var temp = sb92.substring(22,32);
	var tosb92 = (station+time+temp).cardRight(32);
	if(!rfWriteBlock(9*4+2,tosb92)){
		return false;
	}
	return true;
}

/*
 * 有时候为了方便需要把检查卡的这个功能去掉
 *//**/
function checkTag(){
	return true;//正常
}

/*
 * 检查卡,非独立的
 * 返回:1,新卡  2,正常卡 3,制卡后的新卡 ,false为未知卡
 *//**/
function checkCardSingler(){
	var mode=arguments[0]?arguments[0] : "0";
	var result = {"result":true,"message":""};
	
	//检查是否为新卡
	if(!rfLoadKey()){
		result.result=false;
		result.message="载入新卡密码异常!!!";
		return result;
	}
	if(rfAuthentication()){
		result.message=1;
		return result;
	}
	
	//检查是否为旧卡
	var temp = rfLoadAu2();
	if(!temp.result){
		result.result=false;
		result.message=temp.message;
		return result;
	}
	
	//判断是否为制作过的卡
	var sb21 = readCardInfoSector();
	
	if(sb21.cardId=="0000000000000000"){
		result.message=3;
	}else{
		result.message=2;
	}
	
	return result;
}

/*
 * 卡装载密钥 
 * 参数:是两组解密的密码字符串
 * 对新卡可以载入15组数据
 * 此处用不到的扇区就不加载了
 * 返回：boolean
 *//**/
function rfLoadKey2(destr1, destr2){
	var mode=arguments[2]?arguments[2] : "0";
	var inikey = cardIniKey;
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
			if(!rfLoadKeySector(i,arr[i])){
				return false;
			}
		}
	}
	
	return true;
}

/*
 * 核对密码
 * 返回：boolean
 *//**/
function rfAuthentication2(){
	var mode=arguments[0]?arguments[0] : "0";
	var num=arguments[1]?arguments[1] : 9;
	var arr = new Array(0,1,2,3,4,5,7,8,9);
	var result = new Array();

	//校验卡的内容
	for(var i in arr){
		if(!rfAuthenticationSector(arr[i])){
			return false;
		}
	}
	
	return true;
}

/*
 * 载入校验
 *//**/
function rfLoadAu2(){
	var result = {"result":true,"message":""};
	
	if (!rfLoadKeySector(0)) {
		result.result=false;
		result.message = "载入0扇区密码失败";
		return result;
	}
	if (!rfAuthenticationSector(0)) {
		result.result=false;
		result.message = "验证0扇区密码失败";
		return result;
	}
	
	var sys = readSystemSector();
	var pwd1 = sys.pwd1;
	var pwd2 = sys.pwd2;
	pwd1 = cardDecrypt(sys.pwd1);
	pwd2 = cardDecrypt(sys.pwd2);
	
	if(pwd1==null||pwd2==null){
		result.result=false;
		result.message="解密异常!!!";
		return result;
	}
	
	if(!rfLoadKey2(pwd1,pwd2)){
		result.result=false;
		result.message="装载密码异常!!!";
		return result;
	}
	if(!rfAuthentication2()){
		result.result=false;
		result.message="验证密码失败!!!";
		return result;
	}
	return result;
}

/*
 * 老卡清空
 */
function oldCardClean(){
	var result = {"result":true,"message":""};
	
	//清除数据
	var arrid = new Array(2,3,4,5,7,8,9);
	var iniCode =cardIniCon;//"00000000000000000000000000000000";
	var arr = new Array();
	arr[0] = iniCode;
	arr[1] = iniCode;
	arr[2] = iniCode;
	arr[3] = cardIniCon3;//"FFFFFFFFFFFFFF078069FFFFFFFFFFFF";
	
	for(var e in arrid){
		if(!rfInitSector(arrid[e],arr)){
			result.result = false;
			result.message = "消息","擦除数据异常..."+arrid[e];
			return result;
		}
	}
	
	//清楚块1，2的数据
	//写入扇区0块1
	if(!rfWriteBlock(1,iniCode)){
		result.result = false;
		result.message ="初始化密码1失败。";
		return result;
	}
	//写入扇区0块2
	if(!rfWriteBlock(2,iniCode)){
		result.result = false;
		result.message ="初始化密码2失败。";
		return result;
	}
	
	return result;
}

/*
 * 新卡，从0到15块的扇区都初始化了
 *//**/
function newCardClean(){
	var result = {"result":true,"message":""};
	
	//清除数据
//	var arrid = new Array(2,3,4,5,7,8,9);
	var iniCode =cardIniCon;//"00000000000000000000000000000000";
	var arr = new Array();
	arr[0] = iniCode;
	arr[1] = iniCode;
	arr[2] = iniCode;
//	arr[3] = cardIniCon3;//"FFFFFFFFFFFFFF078069FFFFFFFFFFFF";
	
	for (var i=1;i<16;i+=1){
		if(!rfWriteSector(i,arr)){
			result.result = false;
			result.message = "消息","擦除数据异常..."+i;
			return result;
		}
	}
	
	//清楚块1，2的数据
	//写入扇区0块1
	if(!rfWriteBlock(1,iniCode)){
		result.result = false;
		result.message ="初始化密码1失败。";
		return result;
	}
	//写入扇区0块2
	if(!rfWriteBlock(2,iniCode)){
		result.result = false;
		result.message ="初始化密码2失败。";
		return result;
	}
	
	return result;
}

/*制卡*/
function buildCard(){
	var result = {"result":true,"message":""};
	//读取序列号
	var ser = rfReadBlock(0);

	//产生随机序列
	var ser2 = ser.substring(0,8);
	
	var sourceString1 = (getRnd(12)+ser2);
	var sourceString2 = (getRnd(12)+ser2);
	
	var encodeString1 = cardEncrypt(sourceString1);
	var encodeString2 = cardEncrypt(sourceString2);
	
	//写入密码
	//写入扇区0块1
	if(!rfWriteBlock(1,encodeString1)){
		result.result = false;
		result.message = "写入密码1失败。";
		return result;
	}
	//写入扇区0块2
	if(!rfWriteBlock(2,encodeString2)){
		result.result = false;
		result.message = "写入密码2失败。";
		return result;
	}
	
	//加密
	var setCode1 = sourceString1.substring(0, 12);
	var setCode2 = sourceString1.substring(12, 24);
	var setCode3 = sourceString2.substring(0, 12);
	var setCode4 = sourceString2.substring(12, 24);
	
	//初始化数据
	var iniCode =cardIniCon;//"00000000000000000000000000000000";
	var arr = new Array();
	arr[0] = iniCode;
	arr[1] = iniCode;
	arr[2] = iniCode;
	var arrid = new Array(2,3,4,5,7,8,9);
	for(var e in arrid){
		if(!rfWriteSector(arrid[e],arr)){
			result.result = false;
			result.message = "擦除数据异常..."+arrid[e];
			return result;
		}
	}
	
	//扇区2 加密
	if(!rfWriteBlock(2*4+3,setCode1+"ff078069"+setCode1)){
		result.result = false;
		result.message = "扇区2加密失败...";
		return result;
	}
	
	//扇区3 加密
	if(!rfWriteBlock(3*4+3,setCode1+"ff078069"+setCode1)){
		result.result = false;
		result.message = "扇区3加密失败...";
		return result;
	}

	//扇区4 加密
	if(!rfWriteBlock(4*4+3,setCode1+"ff078069"+setCode1)){
		result.result = false;
		result.message = "扇区4加密失败...";
		return result;
	}

	//扇区5 加密
	if(!rfWriteBlock(5*4+3,setCode2+"ff078069"+setCode2)){
		result.result = false;
		result.message = "扇区5加密失败...";
		return result;
	}

	//扇区7 加密
	if(!rfWriteBlock(7*4+3,setCode3+"ff078069"+setCode3)){
		result.result = false;
		result.message = "扇区7加密失败...";
		return result;
	}

	//扇区8 加密
	if(!rfWriteBlock(8*4+3,setCode4+"ff078069"+setCode4)){
		result.result = false;
		result.message = "扇区8加密失败...";
		return result;
	}

	//扇区9 加密
	if(!rfWriteBlock(9*4+3,setCode4+"ff078069"+setCode4)){
		result.result = false;
		result.message = "扇区9加密失败...";
		return result;
	}
	
	return result;
}

