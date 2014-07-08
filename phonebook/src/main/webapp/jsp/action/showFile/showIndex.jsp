<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="s" uri="/struts-tags" %><%--
http://localhost:8080/happin/showFile_showIndex
http://localhost:8080/happin/jsp/action/showFile/showIndex.jsp
--%><!DOCTYPE html>
<html>
<head>
<%@include file="/style/public/ymodelui.jspf" %>
<title>文件列表</title>
<script type="text/javascript">
<%@include file="/jsp/action/showFile/showIndex.js" %>
</script>
</head>
<body>
	文件列表<br/>
<hr/> 
<%--<s:a action="%{@java.io.File@separator}">bb</s:a>
<a href="javascript:encodeURIComponent('aabb');">xx</a><br>
<s:property value="@java.net.URLEncoder@encode('a','utf-8')"/>
<s:a action="%{@java.net.URLEncoder@encode('aa','utf-8')}">test</s:a>
--%><table>
	<s:if test="page>1">
		<tr><td>
			<s:a action="showFile_showIndex?file=%{file}%{@java.io.File@separator}&page=%{page-1}">上一页</s:a>
		</td></tr>
	</s:if>
	<s:if test="page<#maxPage">
		<tr><td>
			<s:a action="showFile_showIndex?file=%{file}%{@java.io.File@separator}&page=%{page+1}">下一页</s:a>
		</td></tr>
	</s:if>
	<s:if test="file!=null">
		<tr><td>
			<s:a action="showFile_showIndex?file=%{file}%{@java.io.File@separator}..%{@java.io.File@separator}">..</s:a>
		</td></tr>
	</s:if>
	<s:iterator value="#files">
	
		<tr>
		<td>
		
		<s:if test="directory==true">
			<s:a action="showFile_showIndex?file=%{parentFile==null?'':parentFile+@java.io.File@separator}%{name==''?canonicalPath:name}">
				<s:if test="name==''">
					${canonicalPath}
				</s:if>
				<s:else>
					${name} 
				</s:else>
			</s:a>
		</s:if>
		<s:else>
				<s:if test="name==''">
					${canonicalPath}
				</s:if>
				<s:else>
					${name} 
				</s:else>
		</s:else>
		&nbsp;
		</td>
		
		<td>
			<s:if test="directory==true">
				目录
			</s:if>
			<s:elseif test="file==true">
				文件
			</s:elseif>
			<s:else>
				其他 
			</s:else>
		&nbsp;
		</td>
		<td>
			<s:if test="name==''">
				显示
			</s:if>
			<s:else>
				<s:if test="hidden==true">
					隐藏
				</s:if>
				<s:else>
					显示 
				</s:else>
			</s:else>
		&nbsp;
		</td>
		</tr>
	</s:iterator>
</table>
<hr/>
</body>
</html>
