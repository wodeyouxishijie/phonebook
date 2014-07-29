//onload
$(function(){
	thisIni();
});
//initialize
function thisIni(){}
function ysmodeltag(){};
function ysmodeluitag(){};
//override
function ystest(){
	ystBodyRefresh();
	ysprintln("show result:");
}
function getLength1(){
	var input = $("#input");
	var output = $("#output");
	input.val(output.val().length);
	
}
function getLength2(){
	var input = $("#input");
	var output = $("#output");
	input.val(output.val().Length());
	
}


