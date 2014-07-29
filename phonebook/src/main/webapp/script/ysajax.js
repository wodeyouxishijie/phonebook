
//js版

/*
 * 创建 XMLHttpRequest 对象
 *//**/
function getXhr(){
	var xhr = null;
	//if(window.XMLHttpRequest){//此亦可
	if((typeof XMLHttpRequest)!='undefined'){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xhr = new XMLHttpRequest();
	}else{
		// code for IE6, IE5
		xhr = new ActiveXObject('Microsoft.XMLHttp');
	}
	return xhr;
}

//jquery版
