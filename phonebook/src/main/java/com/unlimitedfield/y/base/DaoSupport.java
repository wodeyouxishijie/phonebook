package com.unlimitedfield.y.base;

/**
 * 起这个名字是因为
 * 可以只使用2层的框架。<br>
 * Long 为主键
 * @author y
 * 
 */
public interface DaoSupport<T> extends DaoSupportCore<T, Long>{
//
//	/**
//	 * 保存实体
//	 */
//	void add(T entity);
//
//	/**
//	 * 保存实体<br>
//	 * 可以考虑有个判断重复的功能 <br>
//	 * 目前实现saveOrUpdate
//	 */
//	void save(T entity);
//	/**
//	 * 删除实体
//	 */
//	void delById(Long id);
//
//	/**
//	 * 删除实体<br>
//	 * (如果用了new的临时对象来删除可能会有异常double oid)<br>
//	 * 如果id不存在则必然异常
//	 * 
//	 */
//	void del(T entity);
//
//	/**
//	 * 更新实体
//	 */
//	void update(T entity);
//
//	/**
//	 * 查询实体
//	 */
//	T queryById(Long id);
//
//	/**
//	 * 查询实体
//	 */
//	List<T> queryById(Long[] ids);
//
//	/**
//	 * 查询所有,请基本不要用
//	 */
//	List<T> queryAll();
//
//	/**
//	 * 分页的查询
//	 * 
//	 * @param firstResult
//	 *            开始获取的记录的索引
//	 * @param maxResults
//	 *            最多获取多少条数据
//	 * @return 总记录数 + 一段数据
//	 */
//	QueryResult<T> queryAll(int firstResult, int maxResults);
//
//	/**
//	 * 查询所有,请基本不要用<br>
//	 * 实体中字段有值的按照值查找<br>
//	 * 实体中字段是字符串的按照模糊匹配查找<br>
//	 * 且目前只支持如下基本包装类型，其他无视<br>
//	 * Integer,Long,Boolean,String,Date<br>
//	 * 如果entity是个空对象则和queryAll没什么区别<br>
//	 */
//	List<T> queryAll(T entity);
//	
//	/**
//	 * 实体中字段有值的按照值查找<br>
//	 * 实体中字段是字符串的按照模糊匹配查找<br>
//	 * 且目前只支持如下基本包装类型，其他无视<br>
//	 * Integer,Long,Boolean,String,Date<br>
//	 * 如果entity是个空对象则和queryAll没什么区别<br>
//	 */
//	QueryResult<T> queryAll(T entity, int firstResult, int maxResults);
//	
//	/**
//	 * 查询数量
//	 */
//	Long queryCount();
}
