package com.unlimitedfield.y.filter;

import java.lang.reflect.Field;

import org.apache.log4j.Logger;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.unlimitedfield.y.base.BaseAction;

/**
 * <pre>
 * description：
 * SecondLastInterceptor
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/01
 */
public class PageRowsInterceptor implements Interceptor {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(PageRowsInterceptor.class);

	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}

	/*
	 * 对页面的页面数 和 行数 进行后期处理
	 */
	private void dealPageRows(Object action) {
		if (action instanceof BaseAction) {
			BaseAction<?> ba = (BaseAction<?>) action;
			// 获取页数，每页行数
			Integer page = ba.getPage();
			Integer rows = ba.getRows();

			// 获取默认行数
			Integer defaultRows = null;
			try {
				Field field = null;
				try {
					field = ba.getClass().getDeclaredField("defaultRows");
				} catch (Exception e) {
					try {
						field = BaseAction.class.getDeclaredField("defaultRows");
					} catch (Exception e1) {
						log.warn("defaultRows 未设定于BaseAction");
					}
				}
				field.setAccessible(true);
				defaultRows = (Integer) field.get(ba);
			} catch (Exception e) {
				log.warn("defaultRows 获取异常");
			}

			if (page == null || page < 1) {
				ba.setPage(1);
			}
			if (rows == null || rows < 1) {
				if (defaultRows == null || defaultRows < 1) {
					defaultRows = 1;
				}
				ba.setRows(defaultRows);
			}
		}
	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		// System.out.println("SecondLastInterceptor begin.");

		// 获得action
		Object action = invocation.getAction();
		// 页面 页数 行数 处理
		dealPageRows(action);

		invocation.invoke();

		// System.out.println("SecondLastInterceptor end.");

		return null;
	}
}
