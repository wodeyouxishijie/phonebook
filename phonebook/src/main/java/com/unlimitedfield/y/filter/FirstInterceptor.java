package com.unlimitedfield.y.filter;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.unlimitedfield.y.base.ActionContextAware;

/**
 * <pre>
 * description：
 * 	如名
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/19
 */
@SuppressWarnings("unused")
public class FirstInterceptor implements Interceptor {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(FirstInterceptor.class);

	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		// System.out.println("FirstInterceptor begin.");

		//
		// ActionContext ctx = invocation.getInvocationContext();
		// System.out.println(ctx);
		// ValueStack stack = ctx.getValueStack();
		// System.out.println(stack);

		//
		invocation.invoke();

		// System.out.println("FirstInterceptor end.");

		return null;
	}
}
