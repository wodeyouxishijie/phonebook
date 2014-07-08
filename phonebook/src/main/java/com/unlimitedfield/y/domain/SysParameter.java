package com.unlimitedfield.y.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * <pre>
 * description：
 * 	系统的一些参数配置
 *  不准备用这个了
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/06
 */
@Deprecated
public class SysParameter implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private SysParameter parent;// 父类
	private Set<SysParameter> children = new HashSet<SysParameter>();// 子类们

	private String key;// 键（程序控制其唯一）uk 255
	private String value;// 需要定制的下拉框的值 255
	private String remark;// 备注（此处需要考虑其必要性）255
	
	private String option;// 下拉列表的值
	
//	private Boolean show;// 是否启用(留给权限设置的时候用)

}
