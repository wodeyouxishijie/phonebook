package com.unlimitedfield.y.filter;

import java.lang.reflect.Field;

import org.apache.log4j.Logger;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.opensymphony.xwork2.util.ValueStack;
import com.unlimitedfield.y.base.ActionContextAware;
import com.unlimitedfield.y.base.BaseAction;

/**
 * <pre>
 * description：
 * 
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/19
 */
@SuppressWarnings("unused")
public class LastInterceptor implements Interceptor {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(LastInterceptor.class);

	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		// System.out.println("LastInterceptor begin.");

		// 获得action
		// Object action = invocation.getAction();

		invocation.invoke();

		// System.out.println("LastInterceptor end.");

		return null;
	}
}
