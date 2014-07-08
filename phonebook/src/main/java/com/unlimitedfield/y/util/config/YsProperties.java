package com.unlimitedfield.y.util.config;

import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * 
 * 关于主目录里面ysconfig.properties的配置内容的获取
 * 要活的内容通过ysConfig
 * @author y
 */
public class YsProperties {
	private static Logger log = Logger.getLogger(YsProperties.class);

	/** 主配置文件名 */
	private static String configName = "ysconfig.properties";
	/** properties */
	private static Properties properties;

	static {
		log.trace("加载\"" + configName + "\"...");
		initialize();
	}

	private static void initialize() {
		try {
			properties = new Properties();
			properties.load(YsProperties.class.getClassLoader()//
					.getResourceAsStream(configName));
		} catch (Exception e) {
			properties = null;
			log.warn("友情提醒：无配置文件\"" + configName + "\"...");
		}
	}

	protected static Properties getProperties() {
		return properties;
	}
}
