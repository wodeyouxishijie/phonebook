<%@page language="java" pageEncoding="UTF-8" %>
//如果是include js方式引入则需要此来避免乱码
//onload
$(function(){
	thisIni();
});
function ysmodeltag(){};
function ysmodeluitag(){};
//override
function ystest(){
	//ystBodyRefresh();
	//ysprintln("show result:");
}
//initialize
function thisIni(){}

function getdate(){
	$.ajax({
		"url":"showData_getData",
		"type":"post",
		"dataType":"text",
		"async":true,
		"success":function (data) {
//			ysconsole("data1:"+data);
			$("#result").text(data);
        }
	});
}

function cleandate(){
	$.ajax({
		"url":"showData_cleanData",
		"type":"post",
		"dataType":"text",
		"async":true,
		"success":function (data) {
			getdate();
//			ysconsole("data2:"+data);
        }
	});
}

function change(){
	$.ajax({
		"url":"showData_checkStatus",
		"type":"post",
		"dataType":"text",
		"async":true,
		"success":function (data) {
			//ysconsole("data:"+data);
			if(data==1){
				ysshow("记录开启");
			}else{
				ysshow("记录关闭");
			}
        }
	});
}

