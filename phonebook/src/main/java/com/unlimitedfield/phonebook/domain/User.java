package com.unlimitedfield.phonebook.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * description： 用户
 * 
 * @author y
 * @version createdate：2014/07/29
 */
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;// 主键
	private String name;// 用户明
	private String qq;// QQ
	private String pwd;// md5密码
	private Integer role;// 角色
	private String telphone;// 联系座机
	private String cellphone;// 手机
	private String picUrl;// 个人头像
	private String desc;// 描述
	private Date gmtCreate;// 创建时间
	private Date gmtModified;// 修改时间
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
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public Integer getRole() {
		return role;
	}
	public void setRole(Integer role) {
		this.role = role;
	}
	public String getTelphone() {
		return telphone;
	}
	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}
	public String getCellphone() {
		return cellphone;
	}
	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}
	public String getPicUrl() {
		return picUrl;
	}
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public Date getGmtCreate() {
		return gmtCreate;
	}
	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}
	public Date getGmtModified() {
		return gmtModified;
	}
	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}

}
