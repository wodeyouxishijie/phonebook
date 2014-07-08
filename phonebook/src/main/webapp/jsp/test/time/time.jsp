<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%--
http://localhost:8080/happin/jsp/test/time/time.jsp
--%><!DOCTYPE html>
<html>
<head>
<%@include file="/style/public/ymodelui.jspf" %>
<title>server time running</title>
<script type="text/javascript">
<%@include file="/jsp/test/time/time.js" %>
</script>
</head>
<body>
	<input type="button" value="begin" onclick = "getServerDateTime()"/>
	<input type="button" value="stop" onclick = "stopShowTime()"/>
	<br>
	客户端：<div id="d1"></div>
	服务器：<div id="d2"></div>
</body>
</html>
