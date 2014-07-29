<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="s" uri="/struts-tags" %><%--
http://localhost:8080/happin/jsp/action/showData/showIndex.jsp
--%><!DOCTYPE html>
<html>
<%@include file="/style/public/ymodelui.jspf" %>
<title>临时数据</title>
<script type="text/javascript">
<%@include file="/jsp/action/showData/showIndex.js" %>
</script>
</head>
<body>
	临时数据<br/>
	<input type="submit" value="获取(刷新)" onclick="getdate()"/>
	<input type="submit" value="清除" onclick="cleandate()"/>
	<input type="submit" value="切换" onclick="change()"/>
	<form method="post" action="showData_showIndex">
		<input name="content" value="" />
		<input type="submit" value="增加"/>
	</form>
	<hr/>
<div >
<pre id="result">
<s:property value="ms"/>
</pre>
</div>
</body>
</html>
