package com.unlimitedfield.y.filter;

import org.apache.log4j.Logger;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.unlimitedfield.y.base.ActionContextAware;

/**
 * <pre>
 * description：
 * SecondInterceptor
 * function as the name
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/01
 */
@SuppressWarnings("unused")
public class ActionContextAwareInterceptor implements Interceptor {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(ActionContextAwareInterceptor.class);

	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		// System.out.println("SecondInterceptor begin.");

		// 获取action
		Object action = invocation.getAction();
		// 设定ActionContext
		if (action instanceof ActionContextAware) {
			((ActionContextAware) action).setActionContext(invocation.getInvocationContext());
		}

		//
		invocation.invoke();

		// System.out.println("SecondInterceptor end.");

		return null;
	}
}
