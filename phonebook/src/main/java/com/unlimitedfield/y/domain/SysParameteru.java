package com.unlimitedfield.y.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;

import com.unlimitedfield.y.service.SysParameterService;

/**
 * <pre>
 *  description：
 * 	系统参数工具
 * 默认会自动载入默认的如果不存在
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/10
 */
public class SysParameteru {
	private static Logger log = Logger.getLogger(SysParameteru.class);
	/** servletcontext中的参数获取key */
	public static final String SYSTEM_PARAMETERS = SysParameteru.class.getName() + ".systemParamters";
	/** 系统标题 */
	public static final String SYSTEM_TITLE_KEY = "systemTitle";

	private static SysParameterService service;

	private static Map<String, Object> map;

	/** 传入service,application获得内容并放置 */
	public static void initialise(ApplicationContext applicationContext) {
		SysParameteru.service = (SysParameterService) applicationContext.getBean("sysParameterService");
		SysParameteru.map = new HashMap<String, Object>();
		initialiseParameters();
	}

	private static void initialiseParameters() {

		/*
		 * 系统标题 不存在则创建
		 */
//		SysParameter s = service.queryByKey(SYSTEM_TITLE_KEY);
//		if (s == null) {
//			s = new SysParameter();
//			s.setKey(SYSTEM_TITLE_KEY);
//			s.setValue("xxx系统");
//			s.setShow(true);
//			s.setRemark("系统标题");
//			service.save(s);
//		}
//		map.put(SYSTEM_TITLE_KEY, s.getValue());

	}

	/**
	 * 如果配置被修改需要重新载入
	 */
	public static void reloadParameters() {
		log.trace("内存中的系统参数变更...");
		initialiseParameters();
	}

	public static Object getParameter(String key) {
		return map.get(key);
	}

	public static String getSystemTitle() {
		return (String) map.get(SYSTEM_TITLE_KEY);
	}

//	/**
//	 * 遍历部门树<br>
//	 * 把所有的遍历出来放到同一个集合中返回<br>
//	 * 并且其中所有部门的名称都修改了，以表示层次。
//	 * 
//	 */
//	public static List<SysParameter> treeAllParameter(List<SysParameter> topList) {
//		List<SysParameter> list = new ArrayList<SysParameter>();
//		treeAllParameterCore(topList, "┣", list, null);
//		return list;
//	}
//
//	/**
//	 * 遍历部门树<br>
//	 * 不显示子级和本身<br>
//	 * 业务需要,自身不能修改父级别为子级
//	 * 
//	 */
//	public static List<SysParameter> treeAllParentParameter(List<SysParameter> topList, Long slf) {
//		List<SysParameter> list = new ArrayList<SysParameter>();
//		treeAllParameterCore(topList, "┣", list, slf);
//		return list;
//	}
//
//	private static void treeAllParameterCore(Collection<SysParameter> topList, String prefix, List<SysParameter> list, Long slf) {
//		for (SysParameter top : topList) {
//			SysParameter copy = new SysParameter();
//			// 本身则不显示
//			if (top.getId() == slf) {
//				continue;
//			}
//			// 停用则不显示
//			if (top.getShow() == null || !top.getShow()) {
//				continue;
//			}
//			copy.setId(top.getId());
//			copy.setValue(prefix + top.getValue());
//			list.add(copy);
//
//			treeAllParameterCore(top.getChildren(), "　" + prefix, list, slf);
//		}
//	}
}
