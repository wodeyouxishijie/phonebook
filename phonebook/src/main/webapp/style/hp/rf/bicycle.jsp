<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%--
http://localhost:8080/happin/style/rf/bicycle.jsp
自行车卡的相关操作
--%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/style/hp/public/ymodelui_hp.jspf" %>
<%--<%@include file="/jsp/public/base.jsp" %>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<script type="text/javascript" src="js/jquery.js" charset="UTF-8"></script>
<link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css" charset="UTF-8" />   
<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css"  charset="UTF-8" />   
<script type="text/javascript" src="easyui/jquery.easyui.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js" charset="UTF-8"></script>
<script type="text/javascript" src="js/ysModelv0.js" charset="UTF-8"></script>
<script type="text/javascript" src="js/ysModeluiv0.js" charset="UTF-8"></script>
--%><title>MWRFATL For Bicycle</title>
<script type="text/javascript" src="style/rf/MWRFATL_core.js"></script>
<script type="text/javascript" src="style/rf/MWRFATL_string.js"></script>
<script type="text/javascript" src="style/rf/MWRFATL_bicycle.js"></script>
<script type="text/javascript" src="style/rf/bicycle.js"></script>
</head>
<body>
<%--<%@include file="/jsp/toother/hp/rf/mwrfatl.jsp" %>
--%><div>
	<input type="button" value="refreshJs" onclick="refreshJs()"/>
	<input type="button" value="test" onclick="test()"/>
</div>
<div id="d1">
<fieldset>
<legend>自行车编号</legend>
<select id="d1select">
	<option value="FFFFFFFFFFFF" selected="selected">原始</option>
	<option value="FFFEFFFFFFFF" >进化</option>
</select>
<input type="button" value="查" onclick="showd1Get()"/>(看选中的值)
<br/>
读块：
<input id="bbs" type="text" size="50"/>
<input type="button" value="查" onclick="d1sRead()"/>
<input type="button" value="改" onclick="d1sModify()"/>
(单扇区校验读写,0扇区1块)
<br/>
车Id：
<input id="bbid" type="text" />
<input type="button" value="查" onclick="d1Read()"/>
<input type="button" value="改" onclick="d1Modify()"/>
(自行车卡的自行车Id)(校验读写3个扇区,明显是不可能的)
<br/>
</fieldset>
</div>
<div id="d2">
<fieldset>
<legend>用户密码的写入</legend>
<select id="d2select">
	<option value="FFFFFFFFFFFF" selected="selected">原始</option>
	<option value="FFFEFFFFFFFF" >进化</option>
</select>
<input type="button" value="查" onclick="showd2Get()"/>(看选中的值)
<br/>
读块：
<input id="bbs2" type="text" size="50"/>
<input type="button" value="查" onclick="d2sRead()"/>
<input type="button" value="改" onclick="d2sModify()"/>
(单扇区校验读写,2扇区0块)
<br/>
密码：
<input id="bbid2" type="text" />
<input type="button" value="查" onclick="d2Read()"/>
<input type="button" value="改" onclick="d2Modify()"/>
<br/>
</fieldset>
</div>
<div id="d3">
<fieldset>
<legend>0扇区加密解密</legend>
解密用密码：
<select id="d3select">
	<option value="FFFFFFFFFFFF" selected="selected">原始</option>
	<option value="FFFEFFFFFFFF" >进化</option>
</select>
<input type="button" value="查" onclick="showd2Get()"/>(看选中的值)
<br/>
<input type="button" value="0扇区加密" onclick="encodesb0()"/>
<input type="button" value="0扇区解密" onclick="decodesb0()"/>
<br/>
</fieldset>
<br/>
</div>
</body>
</html>
