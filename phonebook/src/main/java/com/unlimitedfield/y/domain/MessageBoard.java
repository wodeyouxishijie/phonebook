package com.unlimitedfield.y.domain;

import java.io.Serializable;

/**
 * <pre>
 * description：
 * 留言版，目前先实现个简单的功能,具体以后实现
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/16
 */
public class MessageBoard implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String message;// 255
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "MessageBoard [id=" + id + ", message=" + message + "]";
	}
}
