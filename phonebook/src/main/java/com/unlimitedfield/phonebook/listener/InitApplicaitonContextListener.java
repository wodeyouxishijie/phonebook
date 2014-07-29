package com.unlimitedfield.phonebook.listener;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import com.unlimitedfield.y.util.material.Hibernateu;
import com.unlimitedfield.y.util.material.Springu;

/**
 * Spring做初始化工作时候的事件监听器
 * 
 * @author y
 * 
 */
@SuppressWarnings("rawtypes")
@Component
public class InitApplicaitonContextListener implements ApplicationListener,
		ServletContextAware,ApplicationContextAware {

	private static Logger log = Logger.getLogger(InitApplicaitonContextListener.class);
	private static boolean isOpen = true;
	private ServletContext application;
	private ApplicationContext applicationContext;
	
	/**
	 * 初始化事件
	 */
	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		log.trace("-->Spring初始化...");
		/**
		 * 启动事件即刷新事件
		 */
		StringBuilder sb = new StringBuilder();
		if (event instanceof ContextRefreshedEvent) {
			sb.append("-->**************************\n");
			sb.append("-->Spring初始化工作:\n");
			sb.append("-->Spring Util 初始化applicationContext实例\n");
			Springu.setApplicationContext(applicationContext);
			sb.append("-->Hibernate Util 初始化sessionFactory实例\n");
			Hibernateu.setSessionFactory((SessionFactory) applicationContext.getBean("sessionFactory"));
			//因为测试的时候不需要设置初始化参数--------
			if(isOpen){
				sb.append("-->系统初始化工作:(暂未实现)\n");
				// 把内容都写到容器里面去，这样脱离了服务器也能测试
				sb.append("-->初始化系统参数:(暂未实现)\n");
				sb.append("-->Web服务器初始化工作:(暂未实现)\n");
				if (application == null) {
					sb.append("-->Web服务器未启动\n");
				} else {
					sb.append("-->Web服务器已启动\n");
					//对服务器相关操作
				}
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
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}

	public static boolean getIsOpen() {
		return isOpen;
	}

	public static void setIsOpen(boolean isOpen) {
		InitApplicaitonContextListener.isOpen = isOpen;
	}
	
}
