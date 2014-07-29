package com.unlimitedfield.phonebook.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * description： 学校
 * 
 * @author y
 * @version createdate：2014/07/29
 */
public class School implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;// 主键
	private String name;// 学校名称
	private String address;// 学校地址
	private String creator;// 创建者
	private String modifier;// 最近修改者
	private Integer status;// 状态 是否被删除
	private Date gmtCreate;// 创建时间
	private Date gmtModifed;// 修改时间
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getModifier() {
		return modifier;
	}
	public void setModifier(String modifier) {
		this.modifier = modifier;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Date getGmtCreate() {
		return gmtCreate;
	}
	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}
	public Date getGmtModifed() {
		return gmtModifed;
	}
	public void setGmtModifed(Date gmtModifed) {
		this.gmtModifed = gmtModifed;
	}

}
