package com.unlimitedfield.y.domain;



/**
 * <pre>
 * description：
 * 系统参数的基础
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/10
 */
public abstract class Parameter {
	protected Long id;
	protected String key;// 键（程序控制其唯一）uk 255
	protected String value;// 需要定制的下拉框的值 255
	protected String remark;// 备注（此处需要考虑其必要性）255
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
