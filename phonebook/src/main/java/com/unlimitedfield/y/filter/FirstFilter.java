package com.unlimitedfield.y.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.log4j.Logger;

/**
 * <pre>
 * description：
 * as the class name
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/01 
 */
public class FirstFilter implements Filter{
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(FirstFilter.class);

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//		System.out.println("first filter begin");
//		HttpServletRequest r = (HttpServletRequest) request;
//		System.out.println(r.getRequestURI());
//		System.out.println(r.getRequestURL());
		chain.doFilter(request, response);
//		System.out.println("first filter end");
	}

	@Override
	public void destroy() {
	}
}

