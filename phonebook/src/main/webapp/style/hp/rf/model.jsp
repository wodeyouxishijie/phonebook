<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%--
http://localhost:8080/happin/style/rf/model.jsp
--%><!DOCTYPE html>
<html>
<head>
<%@include file="/style/hp/public/ymodelui_hp.jspf" %>
<title>MWRFATL模板</title>
<script type="text/javascript" src="style/rf/MWRFATL_core.js"></script>
<script type="text/javascript" src="style/rf/MWRFATL_string.js"></script>
<script type="text/javascript" src="style/rf/MWRFATL_card.js"></script>
<script type="text/javascript" src="style/rf/model.js"></script>
</head>
<body>
<%--<object id="MWRFATL" type="application/x-itst-activex" style="border:0px;width:0px;height:0px;" clsid="{524BFA54-1715-4436-B2B9-DC5E248BC1C3}"></object>--%>
<%--<object id="MWRFATL" type="application/x-itst-activex" style="border:0px;width:0px;height:0px;" classid="CLSID:524BFA54-1715-4436-B2B9-DC5E248BC1C3"></object>--%>
<div>
	<%-- 用不到了，因为支持firefox了 --%>
	<%--<input type="button" value="refreshJs" onclick="refreshJs()"/>--%>
	<input type="button" value="test" onclick="test()"/>
</div>

<div id="d1">
<fieldset>
<legend>编码转换</legend>
<input type="button" onclick="testToHex()" value="toHex" />
<input type="button" onclick="testToAsc()" value="toAsc" />
转换值：<input type="text" value="测试中文" id="d1Txt" maxlength="16" size="16" /> 
</fieldset>
</div>
<div id="d2">
<fieldset>
<legend>独立的</legend>
<input type="button" value="蜂鸣" onclick="beep()"/>
<input type="button" value="版本号" onclick="getVersion()"/>
</fieldset>
</div>
<div id="d3">
<fieldset>
<legend>连续的</legend>
<input type="button" onclick="testRfOpen()" value="RfOpen" />
<input type="button" onclick="testCardOpen()" value="CardOpen" />
<input type="button" onclick="testCardClose()" value="CardClose" />
<input type="button" onclick="testRfClose()" value="RfClose" />
</fieldset>
</div>
密钥: <input id="d4pwd" />
扇区：<input id="d4sector" />  
块：<input id="d4sb" />  
mode：<input id="d4mode" />
<div id="d5">
<fieldset>
<legend>待定(连续的)</legend>
<input type="button" value="装载校验密码" onclick="d4LoadAuthKey()"/>
<input type="button" value="装载密码" onclick="d4LoadKey()"/>
<input type="button" value="校验密码" onclick="d4AuthKey()"/>
如果密码校验失败则卡需要重新开关的bug已修正
</fieldset>
</div>
<div id="d4">
<fieldset>
<legend>扇区,块读写</legend>
使用前需选择密钥，扇区，块
<br/>
读块：
<input id="d4sbVal" type="text" size="50"/>
<input type="button" value="查" onclick="d4sbRead()"/>
<input type="button" value="改" onclick="d4sbModify()"/>
<input type="button" value="清" onclick="d4sbClean()"/>(如果是3块则为清空密码)
<input type="button" value="查扇区" onclick="d4sbReadSector()"/>
<input type="button" value="清扇区" onclick="d4sbCleanSector()"/>(不对密码处理)
<input type="button" value="改密码" onclick="d4sbModifyPwd()"/>(请慎重并选择密码块)
<br/>
非独立的(设备的开关需要手动)
<br/>
<input type="button" value="查" onclick="d4sbRead2()"/>
<input type="button" value="改" onclick="d4sbModify2()"/>
<input type="button" value="清" onclick="d4sbClean2()"/>(如果是3块则为清空密码)
<input type="button" value="改密码" onclick="d4sbModifyPwd2()"/>(请慎重并选择密码块)
<br/>
独立的
<br/>
<input type="button" value="检查所有扇区" onclick="checkAll()"/>
<input type="button" value="清除显示结果" onclick="cleanResult()"/>
</fieldset>
</div>
<div id="d6">
<fieldset>
<legend>密钥(无关的)</legend>
始：<input id="d61" type="text" size="50" value="0A0C00010B040F05030608005E122613"/>
<br/>
<input type="button" value="加密" onclick="encrypt()" />
<input type="button" value="解密" onclick="decrypt()" />
<br/>
终：<input id="d62" type="text" size="50"/>
</fieldset>
</div>
<div id="d7">
<fieldset>
<legend>服务器数据抓取</legend>
<select id="cardType"></select>
</fieldset>
</div>
<div id="d8">
<fieldset>
<legend>card模式</legend>
<input type="button" value="验证并开启" onclick="verBeginCard()"/>
<input type="button" value="关闭" onclick="verEndCard()"/>
<input type="button" value="检查卡类型(独立)" onclick="verCard()"/><br/>
卡序列：<input id="cser" />(5B,ReadOnly)<br/>
卡密码1：<input id="cpwd1" style="width:250px;"/>解密后：<input id="cpwd1d" style="width:250px;"/><br/>
卡密码2：<input id="cpwd2" style="width:250px;"/>解密后：<input id="cpwd2d" style="width:250px;"/><br/>
<input type="button" value="读系统区" onclick="readCardSys()"/>
(无修改功能避免废卡的出现)<br/>
系统Id:<input id="csysId" /><br/>
卡号：<input id="ccardId" /><br/>
授权系统：<input id="cauId" /><br/>
<input type="button" value="读信息区" onclick="readCardInfo()"/>
<input type="button" value="修改" onclick="writeCardInfo()"/><br/>
卡中金额：<input id="ccardMoney" />单位(元/积分)<br/>
<input type="button" value="读" onclick="readCardMoneyFunc()"/>
<input type="button" value="改" onclick="writeCardMoneyFunc()"/><br/>
用户区50:<br/>
密码：<input id="c50pwd" /><br/>
卡锁标记:<input id="c50lockSta" /><br/>
激活标记:<input id="actSta" /><br/>
<input type="button" value="读" onclick="readCardUser50Func()"/>
<input type="button" value="改" onclick="writeCardUser50Func()"/><br/>
系统区30：<br/>
用户名：<input id="c30userName" /><br/>
<input type="button" value="读" onclick="readCardSys30Func()"/>
<input type="button" value="改" onclick="writeCardSys30Func()"/><br/>
系统区32<br/>
证件类别:<input id="c32type" /><br/>
证件号码:<input id="c32num" /><br/>
<input type="button" value="读" onclick="readCardSys32Func()"/>
<input type="button" value="改" onclick="writeCardSys32Func()"/><br/>
业务区92<br/>
最后租车站:<input id="c92station" /><br/>
最后租车时间:<input id="c92time" /><br/>
<input type="button" value="读" onclick="readCardBus92Func()"/>
<input type="button" value="改" onclick="writeCardBus92Func()"/><br/>




</fieldset>
</div>
<div id="d9">
<fieldset>
<legend>卡操作(独立的)</legend>
<input type="button" value="老卡清空" onclick="cardInitFunc()"/>
<input type="button" value="新卡清空" onclick="cardNewInitFunc()"/>
<input type="button" value="制卡" onclick="cardMakeFunc()"/>
</fieldset>
</div>
<div id="d10">
<fieldset>
<legend>待定</legend>
</fieldset>
</div>
</body>
</html>
