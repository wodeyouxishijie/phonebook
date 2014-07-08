<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%--
http://localhost:8080/happin/index_showIndex
http://localhost:8080/happin/jsp/action/index/showIndex.jsp
--%><!DOCTYPE html>
<html>
<head>
<%@include file="/style/public/ymodelui.jspf" %>
<title>首页</title>
<script type="text/javascript">
<%@include file="/jsp/action/index/showIndex.js" %>
</script>
</head>
<body>
	首页<br/>
    <a href="stringLength_main">获取字符串长度</a><br/>
    <a href="applicationContext_showBeans">容器内对象</a><br/>
    <%--<a href="applicationContext_showAllBeans">容器内所有对象</a><br/>--%>
    <a href="applicationContext_showDomainBeans">SessionFactory内所有对象</a><br/>
    <a href="jsp/test/time/time.jsp" target="_blank">服务器时间</a><br/>
</body>
</html>
