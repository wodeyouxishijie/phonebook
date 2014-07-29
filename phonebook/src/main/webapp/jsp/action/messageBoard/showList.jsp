<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="s" uri="/struts-tags" %><%--
http://localhost:8080/happin/messageBoard_showList
--%><!DOCTYPE html>
<html>
<head>
<%@include file="/style/public/ymodelui.jspf" %>
<title>留言板列表</title>
<script type="text/javascript">
<%@include file="/jsp/action/messageBoard/showList.js" %>
</script>
</head>
<body>
<table>
	<s:debug></s:debug>
	<s:iterator value="#list">
		<tr>
			<td>${message}&nbsp;</td>
		</tr>
	</s:iterator> 
</table>
</body>
</html>
