package com.unlimitedfield.y.domain;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * <pre>
 * description：
 * 树形的combox
 * 所以叫treebox
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/10
 */
public class Treebox extends Parameter implements Serializable {
	private static final long serialVersionUID = 1L;
	private Treebox parent;// 父类
	private Set<Treebox> children = new LinkedHashSet<Treebox>();// 子类们

	private String option;// 下拉列表的值

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public Treebox getParent() {
		return parent;
	}

	public void setParent(Treebox parent) {
		this.parent = parent;
	}

	public Set<Treebox> getChildren() {
		return children;
	}

	public void setChildren(Set<Treebox> children) {
		this.children = children;
	}

}
