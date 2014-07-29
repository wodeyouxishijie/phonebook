package com.unlimitedfield.y.base;

import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

/**
 * <pre>
 * description：
 * getSession如果是3层模式的就用不到了
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/11
 */
public class BaseServiceImpl<T> extends DaoSupportImpl<T> implements BaseService<T> {

	// implements
	@Override
	public QueryResult<T> queryByPage(int page, int rows) {
		// 业务检查
		if (page < 1)
			page = 1;

		if (rows < 1)
			rows = 1;

		// 调用dao
		page = page - 1;
		return queryAll(page * rows, rows);
	}

	@Override
	public QueryResult<T> queryByPage(T entity, int page, int rows) {
		// 业务检查
		if (page < 1)
			page = 1;

		if (rows < 1)
			rows = 1;

		// 调用dao
		page = page - 1;
		return queryAll(entity, page * rows, rows);
	}

	// override Dao
	@Transactional
	@Override
	public void add(T entity) {
		if (entity == null)
			return;
		super.add(entity);
	}

	@Transactional
	@Override
	public void save(T entity) {
		if (entity == null)
			return;
		super.save(entity);
	}

	@Transactional
	@Override
	public void update(T entity) {
		if (entity == null)
			return;
		super.update(entity);
	}

	@Transactional
	@Override
	public void delById(Long id) {
		if (id == null)
			return;
		super.delById(id);
	}

	@Transactional
	@Override
	public void del(T entity) {
		if (entity == null)
			return;
		super.del(entity);
	}

	@Override
	public T queryById(Long id) {
		if (id == null)
			return null;
		return super.queryById(id);
	}

	@Override
	public List<T> queryById(Long[] ids) {
		if (ids == null || ids.length == 0) {
			// return Collections.EMPTY_LIST;
			return new ArrayList<T>();
		}
		return super.queryById(ids);
	}

	@Override
	public List<T> queryAll() {
		return super.queryAll();
	}

	/* 这里用不到 */
	@Override
	public QueryResult<T> queryAll(int firstResult, int maxResults) {
		if (firstResult < 0)
			firstResult = 0;
		if (maxResults < 1)
			maxResults = 1;
		return super.queryAll(firstResult, maxResults);
	}
	@Override
	public Long queryCount() {
		return super.queryCount();
	}

	@Override
	public QueryResult<T> queryAll(T entity, int firstResult, int maxResults) {
		if (entity == null) {
			return new QueryResult<T>(new ArrayList<T>(), 0L);
		}
		if (firstResult < 0)
			firstResult = 0;
		if (maxResults < 1)
			maxResults = 1;
		return super.queryAll(entity, firstResult, maxResults);
	}

}
