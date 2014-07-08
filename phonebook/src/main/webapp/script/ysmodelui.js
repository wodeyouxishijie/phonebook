/*需要jqeasyUi的支持*/

//需要立即执行的
try{
	ysEasyuiDatebox();
}catch (e) {
	//这样就能解决要用解析的方式了
	easyloader.load('datebox',function(){
		ysEasyuiDatebox();
	})
}


$(function(){
	ysModelUiIni();
});
function ysModelUiIni(){
	ysmodeluitag();
}

//用来被覆盖从而实现单个的关闭功能
function ysmodeluitag(){
	ysbeautifultestbody(true);
}

function ysbeautifultestbody(tag){
	if(tag){//是否美化testbody
		$("#yst").panel({
			title: 'Debug',
			iconCls:"icon-edit",
			width:"auto",
			height:"auto"
		}).panel('collapse').panel("header").click(function(){
			if($("#yst").panel('options').collapsed){
				$("#yst").panel("expand");
			}else{
				$("#yst").panel("collapse");
			}
		});
	}
}

function ysalert(str){
	$.messager.alert('message',str,'info');
}

function ysshow(str){
	$.messager.show({
		title:'message',
		msg:str,
		timeout:5000,
		showType:'slide'
	});

}

/*
 * 决定把内容放在方法里
 */
function ysEasyuiDatebox(){
	/*用不到这个按钮*/
	/*$.fn.datetimebox.defaults.currentText = "现在";*/
	
	/*
	 * 不知道为什么自己写的日期函数老是出错，一怒之下，调出系统的，修改个符号--
	 * 结果原因是function(s) 写成了 function(date)就是错的
	 * 所以以后少用标识符--
	 *//**/
	$.fn.datebox.defaults.formatter = function (date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'/'+(m<10?('0'+m):m)+'/'+(d<10?('0'+d):d);
	};
	
	$.fn.datebox.defaults.parser = function (s){
		if (!s) return new Date();
		var ss = s.split('/');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};
}