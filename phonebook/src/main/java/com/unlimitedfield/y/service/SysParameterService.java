package com.unlimitedfield.y.service;

import java.util.List;

import com.unlimitedfield.y.base.DaoSupport;
import com.unlimitedfield.y.domain.SysParameter;

/**
 * <pre>
 * description：
 * 	系统参数服务
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/10
 */
public interface SysParameterService extends DaoSupport<SysParameter> {
	/**
	 * 查询顶级节点
	 */
	List<SysParameter> queryTopList();
	
	/**
	 * 查询子节点
	 */
	List<SysParameter> queryChildren(Long parentId);

	/**
	 * 通过关键词查找
	 */
	SysParameter queryByKey(String key);

	/**
	 * 通过关键词找到子节点
	 */
	List<SysParameter> queryChildernByKey(String key);
}
