package com.unlimitedfield.phonebook.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * description： 班级对象
 * 
 * @author y
 * @version createdate：2014/07/29
 */
public class Classes implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;// 主键
	private String name;// 班级名称
	private String level;// 班级级别，如06级，07级
	private String qq;// 负责人qq
	private Integer status;// 状态
	private String creator;// 创建者
	private String modifier;// 最近修改者
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
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
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
