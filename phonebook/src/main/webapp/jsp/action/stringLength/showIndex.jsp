<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%--
http://localhost:8080/happin/tool/stringLength_main
--%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/style/public/ymodelui.jspf" %>
<title>StringLength</title>
<script type="text/javascript" src="jsp/action/stringLength/showIndex.js"></script>
</head>
<body>
<div id="click1" style="width:200px;height:25px;margin:0px;border:0px solid red;" onclick="getLength2()">获取字符串长度(中文2字节)</div>
<div id="click1" style="width:200px;height:25px;margin:0px;border:0px solid red;" onclick="getLength1()">获取字符串长度(中文1字节)</div>
<div>
<span>输入</span><textarea id="output" rows="" cols="50"></textarea>
</div>
<div>
结果<input id="input" type="text" size="	50"/>
</div>
</body>
</html>
