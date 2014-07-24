package com.unlimitedfield.test.domain;

import java.util.Date;

import com.unlimitedfield.y.util.string.Dateu;

/**
 * 测试用
 * 用户对象 会被后面很多复用
 * 
 * @author y
 * 
 */
public class User {
	private Long id;
	private String name;
	private Date birthday;// 年龄
	private Boolean sex;// true male;false female

	public User() {
		super();
	}

	public User(Long id) {
		super();
		this.id = id;
	}

	public User(String name) {
		super();
		this.name = name;
	}

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
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Boolean getSex() {
		return sex;
	}

	public void setSex(Boolean sex) {
		this.sex = sex;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", birthday=" + Dateu.formatDateTime(birthday) + ", sex=" + sex + "]";
	}

}
