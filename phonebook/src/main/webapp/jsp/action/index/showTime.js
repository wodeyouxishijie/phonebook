<%@page language="java" pageEncoding="UTF-8" %>
// onload
$(function(){
	thisIni();
});
function ysmodeltag(){};
function ysmodeluitag(){};
// override
function ystest(){
// ystBodyRefresh();
// ysprintln("show result:");
}
// initialize
function thisIni(){
}

// temp
function stopShowTime(){
	endShowTime();
	
	showClientTime("");
	showServerTime("");
}

// -----------------------------------------------------------------------------------------

function showClientTime(str){
	$("#d1").html(str);
}

function showServerTime(str){
	$("#d2").html(str);
}

function showTimeErr(){
	showServerTime("err");
	showClientTime("err");
}

function endShowTime(){
	if(cshowTime!=undefined){
		clearInterval(cshowTime);
		cshowTime = undefined;
	}
}
// -----------------------------------------------------------------------------------------
var cclientTime;
var cserverTime;
var cshowTime;

// 如果是长时间不刷新的可以考虑每过一段时间同步一次
// 从服务器获取一个固定格式的时间字符串
// 2014/06/18 15:40:54
function getServerDateTime(){
	// 避免越开越多
	if(cshowTime!=undefined){
		endShowTime();
	}
	$.ajax({
		"url":"index_getServerDateTime",
		"type":"post",
		"dataType":"text",
		"timeout":1000*9,
		"success":function (data) {
			try{
				cserverTime = data.parseDateTime();
				cclientTime = new Date();
				if(cserverTime==null){
					ysconsole("格式不正确异常");
					showTimeErr();
					return;
				}
				// 正题
				cshowTime = setInterval(showTimeCore,300);
			}catch(e){
				ysconsole("无法解析异常"+e);
				showTimeErr();
			}
		},
		"error":function(XMLHttpRequest, textStatus, errorThrown){
			showTimeErr();
			if("timeout"==textStatus){
				ysconsole("超时异常");
			}else{
				ysconsole("错误异常："+textStatus);
			}
		}
	});
}
// 时间变动
function showTimeCore(){
	var temp = new Date();
	var l = temp - cclientTime;
	// 如此大变动必然是问题
	if(Math.abs(l)>1000*2){
		// 客户端更改异常
		// ysconsole(l);
		// ysconsole("异常，重新校验");
		endShowTime();
		getServerDateTime();
		return;
	}
	cclientTime = new Date(cclientTime.getTime()+l);
	cserverTime = new Date(cserverTime.getTime()+l);
	showClientTime(temp.formatDateTime());
	showServerTime(cserverTime.formatDateTime());
}

// -----------------------------------------------------------------------------------------


// 完整的ajax案例
function modelAjax(){
	$.ajax({
		"url":"hp/areaPermission_queryAllAreas.action",
		// 方式
		"type":"post",
		// 内容
		"data":"value="+v,
		"timeout":1000*9,
		"dataType":"json",
		// 是否为异步,default true
		"async":true,
		"success":function (data) {
			// 能正常打开页面就到这里，即时为空哪么data为空
	        if (data.success){
	        	var objFormat = new Array();
	        	for(var i=0;i<data.message.length;i++){
	        		objFormat[i] = new Object();
	        		objFormat[i].key = data.message[i].id;
	        		objFormat[i].value = data.message[i].value;
	        	}
	        	$("#area").combobox({
	        	    valueField:"key",
	        	    textField:"value",
	        		data:objFormat
	        	});
	        }
		},
		"error":function(XMLHttpRequest, textStatus, errorThrown){
			// 如果打开网址错误等会到这里
			// this; //调用本次ajax请求时传递的options参数
			if("timeout"==textStatus){
				ysconsole("超时");
			}else{
				ysconsole("错误"+textStatus);
			}
		}
	});
}

