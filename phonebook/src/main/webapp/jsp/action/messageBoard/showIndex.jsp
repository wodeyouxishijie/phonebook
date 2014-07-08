<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="s" uri="/struts-tags" %><%--
http://localhost:8080/happin/messageBoard_showIndex
http://localhost:8080/happin/jsp/action/messageBoard/showIndex.jsp
--%><!DOCTYPE html>
<html>
<head>
<%@include file="/style/public/ymodelui.jspf" %>
<title>留言板</title>
<script type="text/javascript">
<%@include file="/jsp/action/index/showIndex.js" %>
</script>
</head>
<body>
	 <s:a action="index_show"></s:a>
</body>
</html>
