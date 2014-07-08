<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="s" uri="/struts-tags" %><!DOCTYPE html>
<html>
<head>
<title>测试</title>
<%--
<script type="text/javascript" src="jsp/action/index/showIndex2.js"></script>
<script type="text/javascript" src="http://www.unlimitedfield.com/clean/jsp/action/index/showIndex2.js"></script>
--%>
</head>
<body>
	测试页<br/>
	http://www.baidu.com/<br/>
	<br/>
	<form method="post" action="index_testHtml">
		<input name="url" value="<s:property value="url"/>" />
		<input type="submit" value="submit"/>
	</form>
	<s:property value="ms"/>
</body>
</html>