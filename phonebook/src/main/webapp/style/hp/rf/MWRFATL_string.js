//字符串相关的处理
var cryptUrl="hp/secret_deal.action";
var cardIniCon =  "00000000000000000000000000000000";
var cardIniCon3 = "FFFFFFFFFFFFFF078069FFFFFFFFFFFF";
var cardIniKey =  "FFFFFFFFFFFF";

//0-F的取反字典表
function negate(str){
	str = str.toUpperCase();
	switch (str){
	   case "0":
		   return "F";
	   case "1":
		   return "E";
	   case "2":
		   return "D";
	   case "3":
		   return "C";
	   case "4":
		   return "B";
	   case "5":
		   return "A";
	   case "6":
		   return "9";
	   case "7":
		   return "8";
	   case "8":
		   return "7";
	   case "9":
		   return "6";
	   case "A":
		   return "5";
	   case "B":
		   return "4";
	   case "C":
		   return "3";
	   case "D":
		   return "2";
	   case "E":
		   return "1";
	   case "F":
		   return "0";
	   default: 
		   return null;
	}
}

/*
 * 对一组字符串取反
 *//**/
function negateStr(str){
	var res = "";
	for(var i=0;i<str.length;i++){
		var t = negate(str.substring(i,i+1));
		if(t==null) return null;
		res += t;
	}
	return res;
}


function cardEncrypt(str){
	var temp = cardCryptCore(str,true);
	if(temp.result){
		return temp.message;
	}else{
		return null;
	}
}

function cardDecrypt(str){
	var temp = cardCryptCore(str,false);
	if(temp.result){
		return temp.message;
	}else{
		return null;
	}
}

/*
 * true加密 false解密
 *//**/
function cardCryptCore(str,mode){
	var result = {"result":true,"message":""};
	if(mode){
		mode = 1;
	}else{
		mode = 2;
	}
	$.ajax({
		url:cryptUrl,
		type:"post",
		dataType:"json",
		data: "mode="+mode+"&string="+str,
		async:false,
		success:function (data) {
	        if (data.success){
	        	if(data.message.success){
	        		result.message = data.message.message;
	        	}else{
	        		result.result=false;
	        	}
	        }
		}
	});
	return result;
}

/*
 * 获取服务器上的卡类型
 *//**/
function getCardTypes($select){
	$.ajax({
		url:"hp/systemParameter_getChildren.action",
		type:"post",
		dataType:"json",
		data: "key=cardType",
		success:function (data) {
	        if (data!=null){
	        	$select.append("<option value=\"\">请选择</option>");
//	        	var obj2 = new Array();
	        	for(var i=0;i<data.length;i++){
//	        		obj2[i] = new Object();
//	        		obj2[i].id = data[i].id;
//	        		obj2[i].comboValue = data[i].comboValue;
//	        		obj2[i].value = data[i].value;
	        		$select.append("<option value=\""+data[i].comboValue
	        				+"\">"+data[i].value+"</option>");
	        	}
	        }
		}
	});
//	$select.append("<option value=\"\">请选择</option>");
//	$select.append("<option value=\"1\">会员卡</option>");
//	$select.append("<option value=\"9\">内部员工卡</option>");
//	$select.append("<option value=\"82\">管理员卡</option>");
//	$select.append("<option value=\"\">未知</option>");
}

/*
 * 字符串右补0右切除
 *//**/
String.prototype.cardRight =function(num){
	return this.rightPad("0",num).rightTruncate(num).toString();
}

/*
 * 字符串右补空格右切除
 *//**/
String.prototype.cardStringRight =function(num){
	return this.rightPad(" ",num).rightTruncate(num).toString();
}

/*
 *数字左补，左切除 
 *//**/
String.prototype.cardLeft =function(num){
	return this.leftPad("0",num).leftTruncate(num).toString();
}

//16有符号的int 的物理存放 即高地位互换，未判断存入的范围
//返回 "FFFF"
function decToHard(number){
	number = (parseInt(number,10)>>>0).toString(16).toLocaleUpperCase();
	if(number.length==8){
		number = number.substring(4,8);
	}else{
		//左补0
		number = number.cardLeft(4);
	}
	number = number.substring(2,4)+number.substring(0,2);
	return number;
}

//以上的反转
//返回int
function hardToDec(number){
	number = number.cardLeft(4);
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

//获取一个随机长度的16进制，高位为0
//null or string
function getRnd(length){
	var result="";
	for (i=0; i<length; i+=1){
		result += randomInt(16).toString(16).toUpperCase().cardLeft(2);
	}
	if(result=="") return null;
	return result;
}

//获得字符串的整型
//ie8 不写参数会异常
//传数字进来前先isNaN(aa)判断是不是数字  true说明不能转换
function toInt(num){
	return parseInt(num,'10');
}

//卡日期解析 格式为：20140524185117
function cardDateParse(strDate){
	return new Date(strDate.substring(0,4), 
			(parseInt(strDate.substring(4,6),"10")-1), 
			strDate.substring(6,8), 
			strDate.substring(8,10), 
			strDate.substring(10,12), 
			strDate.substring(12,14));
}