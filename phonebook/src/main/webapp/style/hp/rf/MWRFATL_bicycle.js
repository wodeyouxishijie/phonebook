//车卡相关的操作

//


//----
/*
 * 0扇区1块的自行车Id
 * null 说明是异常
 *//**/
function readBicycleId(){
	var mode=arguments[0]?arguments[0] : "0";
	var sector = 0;
	var bis = 1;
	var block = sector*4+bis;
	
	var res=rfReadBlock(block,mode);
	if(res==null) return null;
	res = res.substring(0,16);
	return res;
}
/*
 * 需是16位的
 * null
 *//**/
function writeBicycleId(id){
	var mode=arguments[1]?arguments[1] : "0";
	var sector = 0;
	var bis = 1;
	var block = sector*4+bis;
	
	var result = {"result":true,"message":""};
	if(typeof(id)!="string"){
		result.result=false;
		result.message="编号格式不对,请输入字符串";
		return result;
	}
	if(id.length!=16){
		result.result=false;
		result.message="编号长度不符合16位";
		return result;
	}
	id = Number(id);
	if(isNaN(id)){
		result.result=false;
		result.message="编号格式不对";
		return result;
	}
	var sb="";
	var idg=""
	id = id.toString().leftPad("0", 16);
	idg = negateStr(id);
	if(idg==null){
		result.result=false;
		result.message="编号格式不对";
		return result;
	}
	sb = id+idg;
	if(sb.length!=32){
		result.result=false;
		result.message="编号长度异常";
		return result;
	}
	if(!rfWriteBlock(block,sb,mode)){
		result.result=false;
		result.message="写入失败";
		return result;
	}
	return result;
}

/*
 * 2扇区0块的密码
 * 全0说明没有密码为空
 *//**/
function readUserPassword(){
	var mode=arguments[0]?arguments[0] : "0";
	var sector = 2;
	var bis = 0;
	var block = sector*4+bis;
	var res=rfReadBlock(block,mode);
	if(res==null) return null;
	res = res.substring(0,12);
	if(res=="000000000000"){
		return "";
	}else{
		res = toAsc(res);
	}
	return res;
}
/*
 * 需是6位以下的
 * 则null说明是空
 *//**/
function writeUserPassword(pwd){
	var mode=arguments[1]?arguments[1] : "0";
	var sector = 2;
	var bis = 0;
	var block = sector*4+bis;
	var result = {"result":true,"message":""};
	
	if(pwd!=null){
		if(typeof(pwd)!="string"){
			result.result=false;
			result.message="编号格式不对,请输入字符串";
			return result;
		}
		if(pwd.Length()>6){
			result.result=false;
			result.message="编号长度不符合";
			return result;
		}
		pwd = toHex(pwd);
		pwd = pwd.rightPad("0",12);
		if(pwd.length!=12){
			result.result=false;
			result.message="编号长度异常";
			return result;
		}
	}else{
		pwd="000000000000";
	}

	//为了不影响其他块的需先读后写
	var sb=rfReadBlock(block,mode);
	if(sb==null){
		result.result=false;
		result.message="读取异常";
		return result;
	}
	var add = sb.substring(12,32);
	
	var tosb = pwd+add;
	if(tosb.length!=32){
		result.result=false;
		result.message="编号长度异常";
		return result;
	}
	if(!rfWriteBlock(block,tosb,mode)){
		result.result=false;
		result.message="写入失败";
		return result;
	}
	return result;
}