package com.unlimitedfield.y.util.material;

import org.apache.log4j.Logger;

import com.unlimitedfield.y.listener.InitApplicaitonContextListener;

/**
 * <pre>
 * description：
 *	初始化相关的工具
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/24 
 */
public class Initu {
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(Initu.class);
	
	/**
	 * 系统启动的一些参数等额外的配置
	 */
	public static void initOpen(){
		InitApplicaitonContextListener.setIsOpen(true);
	}
	
	/**
	 * 系统启动的一些参数等额外的配置
	 */
	public static void initClose(){
		InitApplicaitonContextListener.setIsOpen(false);
	}
}

