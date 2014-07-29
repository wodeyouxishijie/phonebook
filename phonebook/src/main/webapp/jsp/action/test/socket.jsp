<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="s" uri="/struts-tags" %><%--
http://localhost:8080/happin/jsp/action/showData/showIndex.jsp
--%><!DOCTYPE html>
<html>
<%@include file="/style/public/ymodelui.jspf" %>
<title>socket连接测试</title>
<script type="text/javascript">
<%@include file="/jsp/action/showData/showIndex.js" %>
</script>
</head>
<body>
	socket连接测试默认是80端口的<br/>
	<form method="post" action="test_socket">
		<input name="url" value="" />
		<input type="submit" value="测试"/>
	</form>
	<hr/>
<div >
<pre id="result">
<s:property value="ms"/>
</pre>
</div>
</body>
</html>
