package com.unlimitedfield.y.base;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

/**
 * struts2通配符的方式之免xml配置的实体
 * 
 * @author y
 * 
 */
public class ActionResult {
	private String dispatcher;
	private String redirect;
	private Object json;
	private JsonExConfig jsonEx;
	private InputStream string;
	private DownLoadConfig downLoad;
	private InputStream image;
	private String result = "success";
	private String redirectAction;
	private String redirectFunction;//同类内的方法
	private String redirectParameter="";//转发参数
	
	public String getDispatcher() {
		return dispatcher;
	}

	public void setDispatcher(String dispatcher) {
		this.dispatcher = dispatcher;
		result = "dispatcher";
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Object getJson() {
		return json;
	}

	public void setJson(Object json) {
		this.json = json;
		result = "json";
	}

	public String getRedirect() {
		return redirect;
	}

	// 没有斜杠就是相对路径
	public void setRedirect(String redirect) {
		this.redirect = redirect;
		result = "redirect";
	}

	public InputStream getString() {
		return string;
	}

	public void setString(String string) {
		try {
			this.string = new ByteArrayInputStream(string.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			try {
				this.string = new ByteArrayInputStream(
						"ErrorEncoding".getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e1) {
			}
		}
		result = "string";
	}

	public DownLoadConfig getDownLoad() {
		return downLoad;
	}

	public void setDownLoad(DownLoadConfig down) {
		this.downLoad = down;
		result = "downLoad";
	}

	public InputStream getImage() {
		return image;
	}

	public void setImage(InputStream image) {
		this.image = image;
		result = "image";
	}

	public JsonExConfig getJsonEx() {
		return jsonEx;
	}

	public void setJsonEx(JsonExConfig jsonEx) {
		this.jsonEx = jsonEx;
		result = "jsonEx";
	}

	public String getRedirectAction() {
		return redirectAction;
	}

	public void setRedirectAction(String redirectAction) {
		this.redirectAction = redirectAction;
		result = "redirectAction";
	}

	public String getRedirectFunction() {
		return redirectFunction;
	}

	public void setRedirectFunction(String redirectFunction) {
		this.redirectFunction = redirectFunction;
		result = "redirectFunction";
	}

	public String getRedirectParameter() {
		return redirectParameter;
	}
	
	/**
	 * 一次添加一个，可以添加多个
	 */
	public void setRedirectParameter(String redirectParameter) {
		if(this.redirectParameter.length()==0){
			this.redirectParameter = "?"+redirectParameter;
		}else{
			this.redirectParameter = this.redirectParameter+"&"+redirectParameter;
		}
	}
	
	/**
	 * 同set
	 */
	public void addRedirectParameter(String redirectParameter){
		setRedirectParameter(redirectParameter);
	}
	
}
