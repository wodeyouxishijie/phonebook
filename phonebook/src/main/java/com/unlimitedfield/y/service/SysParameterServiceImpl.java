package com.unlimitedfield.y.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.unlimitedfield.y.base.DaoSupportImpl;
import com.unlimitedfield.y.domain.SysParameter;

/**
 * <pre>
 * description：
 * 减少内存的一种方式
 * 
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/10
 */
@Service("sysParameterService")
@SuppressWarnings({"unchecked", "unused"})
public class SysParameterServiceImpl extends DaoSupportImpl<SysParameter> implements SysParameterService {
	private static Logger log = Logger.getLogger(SysParameterService.class);

	private String from = "from " + clazz.getSimpleName() + " s ";
	@Override
	public List<SysParameter> queryTopList() {
		return getSession().createQuery(//
				from + "where s.parent is null")//
				.list();
	}

	@Override
	public List<SysParameter> queryChildren(Long parentId) {
		return getSession().createQuery(//
				from + "where s.parent.id=?")//
				.setParameter(0, parentId)//
				.list();
	}

	@Override
	public SysParameter queryByKey(String key) {
		return (SysParameter) getSession().createQuery(//
				from + "where s.key=?")//
				.setParameter(0, key)//
				.uniqueResult();
	}

	@Override
	public List<SysParameter> queryChildernByKey(String key) {
		return getSession().createQuery(//
				from + "where s.parent.key=?")//
				.setParameter(0, key)//
				.list();
	}

}
