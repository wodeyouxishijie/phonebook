//需要jQuery的支持----------------------------------------------------------

//onload
$(function(){
	ysModelIni();
});
//ysInitialize
function ysModelIni(){
	ysmodeltag();
}
//用来被覆盖这样就可以局部实现关闭此功能了
function ysmodeltag(){
	ystBody(true);//用firebug更屌
	ysCheckBrowser(false);
}

/* 一个测试的页面  */
//生成测试页面
function ystBody(tag){
	var testBody = "" +
			"<div id=\"yst\">\n" +
			"<hr/>\n" +
			"<span id=\"ystClick\">onclick</span><br/>\n" +
			"<textarea id=\"ystResult\">testResult</textarea>\n" +
			"<hr/>\n" +
			"<pre id=\"ystBody\"></pre>\n"+
			"</div>\n";
	$("body").last().append(testBody);
	$("#ystClick").click(function(){ystest()});
	$("#ystResult").css({height:"200px",width:$(document).width()-40});
	if(tag){
		//显示
		$("#yst").css({display:"block"});
		ystBodyShow();
	}else{
		//不显示
		$("#yst").css({display:"none"});
	}
}
//更新内容
function ystBodyRefresh(){
	ystBodyShow();
}
//显示内容
function ystBodyShow(){
	$("#ystBody").html("");
	var body = $("html").last().html().replace(/</g,"&lt;");
	$("#ystBody").html(body);
}
//测试方法
function ystest(){
	alert("function ystest need to be override!!!");
}
//获取测试输出对象
function ysGetTestResult(){
	return $("#ystResult");
}
//显示
function ysprint(s){
	$("#ystResult").val(s);
}
//显示并换行
function ysprintln(s){
	s += "\n";
	$("#ystResult").val(s);
}
//追加显示
function ysprintAdd(s){
	$("#ystResult").val($("#ystResult").val()+s);
}
//追加显示
function ysprintlnAdd(s){
	s += "\n";
	$("#ystResult").val($("#ystResult").val()+s);
}
//在浏览器中显示
function ysconsole(str){
	console.info(str);
}

/*浏览器限制*/
//浏览器限制
function ysCheckBrowser(tag){
	if(tag){
		var temp = browserMatch().browser;
		if(temp != "chrome"){
			if(temp != "firefox"){
				chromeOnly();
			}
		}
	}
}
//显示页面
function chromeOnly(){
	document.title="Game Over";
	document.write("非Chrome浏览器,异常,混乱,疑惑,不解...");
}

/*其他*/

//不需要jQuery的支持----------------------------------------------------------

/*
 * 解析日期
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss")
 * 某高手写的
 * 对Date的扩展，将 Date 转化为指定格式的String   
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 例子：   
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
 * author: meizz 
 *//**/
Date.prototype.format = function(fmt){
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
}
/*
 * 自制
 * true datetime false date
 *//**/
Date.prototype.formatDateTime = function() {
	var tag = true;
	if(typeof arguments[0] != "undefined"){
		tag = arguments[0];
	}
	if(tag){//true
		fmt = "yyyy/MM/dd hh:mm:ss";
	}else{//false
		fmt = "yyyy/MM/dd";
	}
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
}

/*
 * 解析日期
 * / :分割的
 * true datetime false date
 * date  datetime(默认)
 *//**/
String.prototype.parseDateTime =function (){
	var tag = true;
	if(typeof arguments[0] != "undefined"){
		tag = arguments[0];
	}
	var a;
	if(!tag){
		var strDate = this.split("/"); 
		if(strDate.length!=3){
			return null;
		}
		a = new Date(strDate[0], (parseInt(strDate[1])-1), strDate[2], 0, 0, 0); 
	}else{
		var strArray = this.split(" ");  
		var strDate = strArray[0].split("/");  
		var strTime = strArray[1].split(":");  
		if(strDate.length!=3||strTime.length!=3){
			return null;
		}
		a = new Date(strDate[0], (parseInt(strDate[1])-1), strDate[2], strTime[0], strTime[1], strTime[2]); 
	}
	if(a.toDateString()=="Invalid Date"){
		return null;
	}
	return a;
};

/*
 * [min,max) 
 * 因为random 只能 0-1 所以需要算法
 * 默认结果是0,1随机
 *//**/
function randomInt(){
	var min,max;
	var numargs = arguments.length;
	if(numargs==1){
		min=0;
		max=arguments[0];
	}else if(numargs==2){
		min=arguments[0];
		max=arguments[1];
	}else{
		min=0;
		max=2;
	}
	return Math.floor(Math.random()*(max-min)+min);
}

/*
 * 获取字符串长度，中文算2字节
 * 本身的.length就是按照字符个数的
 *//**/
String.prototype.Length = function (){
	var l = this.length; 
	var result = 0; 
	for(i=0; i<l; i+=1) { 
		if ((this.charCodeAt(i) & 0xff00) != 0) { 
			result +=1; 
		} 
		result +=1; 
	}
	return result;
};

/*
 * 左补足
 *//**/
String.prototype.leftPad = function (con,num){
	var n = con.length;
    var l = this.length;
	var c = this;
	//this = this + "1";//这样不可以,错误
    while(l < num) {
        c = con + c;
        l+=n;
    }
    return c;
};

/*
 * 左删
 * 数字左补0一般左删
 *//**/
String.prototype.leftTruncate = function(num){
	var len = this.length;
	var c = this;
	if(len>num){
		c = c.substring(len-num,len);
	}
	return c;
}

/*
 * 右补足
 *//**/
String.prototype.rightPad = function (con,num){
	var n = con.length;
    var l = this.length;
	var c = this;
    while(l < num) {
        c = c + con;
        l+=n;
    }
    return c;
};

/*
 * 右删
 * 字符串右补空格一般右删
 *//**/
String.prototype.rightTruncate = function(num){
	var len = this.length;
	var c = this;
	if(len>num){
		c = c.substring(0,num);
	}
	return c;
}

/*
 * 去掉字符串两端的空白字符
 *//**/
String.prototype.trim = function() {
//没有意义null根本就进不来
//	if(this==null){
//		return null;
//	}
    return this.replace(/(^\s+)|(\s+$)/g, "");
};

/*
 * 返回浏览器和版本号
 * 返回结果 ie,firefox,chrome,opera
 *//**/
function browserMatch() {
	var ua = navigator.userAgent.toLowerCase();
	rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
	rFirefox = /(firefox)\/([\w.]+)/;
	rOpera = /(opera).+version\/([\w.]+)/;
	rChrome = /(chrome)\/([\w.]+)/;
	rSafari = /version\/([\w.]+).*(safari)/;
	var match = rMsie.exec(ua);
	if (match != null) {
		return {browser : "ie",version : match[2] || "0"};
	}
	var match = rFirefox.exec(ua);
	if (match != null) {
		return {browser : match[1] || "",version : match[2] || "0"};
	}
	var match = rOpera.exec(ua);
	if (match != null) {
		return {browser : match[1] || "",version : match[2] || "0"};
	}
	var match = rChrome.exec(ua);
	if (match != null) {
		return {browser : match[1] || "",version : match[2] || "0"};
	}
	var match = rSafari.exec(ua);
	if (match != null) {
		return {browser : match[2] || "",version : match[1] || "0"};
	}
	if (match != null) {
		return {browser : "",version : "0"};
	}
}
