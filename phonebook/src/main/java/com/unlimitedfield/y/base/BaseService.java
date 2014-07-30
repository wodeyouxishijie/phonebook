package com.unlimitedfield.y.base;

/**
 * <pre>
 *  description：
 *   service 只考虑业务逻辑
 *   还是分层的比较好
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/11
 */
public interface BaseService<T> extends BaseDao<T> {
	/**
	 * 按页查找
	 */
	QueryResult<T> queryByPage(int page, int rows);

	/**
	 * 按页按条件查找<br>
	 * 条件如queryAll里面的queryByCondition一致
	 */
	QueryResult<T> queryByPage(T entity, int page, int rows);
}
