package com.unlimitedfield.phonebook.listener;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

/**
 * Spring做初始化工作时候的事件监听器
 * 
 * @author y
 * 
 */
@SuppressWarnings("rawtypes")
@Component
public class InitListener implements ApplicationListener, ServletContextAware, ApplicationContextAware {

	private static Logger log = Logger.getLogger(InitListener.class);
	private ServletContext application;
	@SuppressWarnings("unused")
	private ApplicationContext applicationContext;

	/**
	 * 初始化事件
	 */
	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		log.trace("-->phonebook 初始化...");
		/**
		 * 启动事件即刷新事件
		 */
		StringBuilder sb = new StringBuilder();
		if (event instanceof ContextRefreshedEvent) {
			sb.append("-->**************************\n");
			sb.append("-->phonebook 初始化工作:(暂未实现)\n");
			//do something
			sb.append("-->Web服务器初始化工作:(暂未实现)\n");
			if (application == null) {
				sb.append("-->Web服务器未启动\n");
			} else {
				sb.append("-->Web服务器已启动\n");
				//对服务器相关操作 do something
			}
			sb.append("-->**************************");
		}
		//log
		log.trace(sb.toString());
	}

	/**
	 * web应用，需要启动才能有，否则null
	 */
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.application = servletContext;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
}
