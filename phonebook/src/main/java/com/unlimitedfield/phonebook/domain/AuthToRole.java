package com.unlimitedfield.phonebook.domain;

import org.apache.log4j.Logger;

/** 
 * description： 
 * 	角色对应权限的枚举类
 * @author y 
 * @version createdate：2014/07/29 
 */
public enum AuthToRole {
	
	private Integer roleCode;// 编码
	private String desc;// 描述
	private Long authCode;// 权限码二进制 0<<0这种形式 和 Auth.java 对应
}
