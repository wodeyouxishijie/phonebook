package com.unlimitedfield.y.base;

import java.util.Collection;

/**
 * 分页对象
 * 
 * @author y
 */
public class QueryResult<T> {
	private Collection<T> rows; // 一段数据
	private Long total; // 总记录数

	public QueryResult() {
		super();
	}

	public QueryResult(Collection<T> rows, Long total) {
		super();
		this.rows = rows;
		this.total = total;
	}

	public Collection<T> getRows() {
		return rows;
	}

	public void setRows(Collection<T> rows) {
		this.rows = rows;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

}
