package com.unlimitedfield.y.domain;

import java.io.Serializable;

/**
 * <pre>
 * description：
 * 权限
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/10
 */
public class Privilege extends Parameter implements Serializable {
	private static final long serialVersionUID = 1L;

	// private Boolean show;// 是否启用

	private String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
