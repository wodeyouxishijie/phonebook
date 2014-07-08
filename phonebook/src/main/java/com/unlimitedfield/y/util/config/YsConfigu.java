package com.unlimitedfield.y.util.config;

import java.io.File;
import java.net.URL;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * 配置路径类 无路径分割符号
 * 
 * @author y
 * 
 */
public class YsConfigu extends YsProperties {
	private static Logger log = Logger.getLogger(YsConfigu.class);
	private static final String PRO_CONFIG_DIR = "SubConfigDir";
	
	/** properties */
	private static Properties properties;
	/** 配置文件目录 */
	private static String proConfigDir;

	static {
		initialize();
	}

	// public
	public static String getProConfigDir() {
		return proConfigDir;
	}

	public static Properties getProperties() {
		return properties;
	}
	//解决修改变动需要重启服务器问题
	public static void reload(){
		initialize();
	}
	// private
	private static void initialize() {
		properties = YsProperties.getProperties();
		if (properties == null) {
			proConfigDir = null;
			log.warn("ysproperties不存在，ysconfig未初始化...");
			return;
		}
		log.trace("ysconfig初始化...");

		setProConfigDir();
		return;
	}

	private static void setProConfigDir() {
		String s = properties.getProperty(PRO_CONFIG_DIR);
		URL url = YsConfigu.class.getClassLoader().getResource(s);
		if (url != null) {
			proConfigDir = new File(url.getFile()).getAbsolutePath();
			log.trace("设定配置文件目录: " + proConfigDir);
		} else {
			proConfigDir = null;
			log.warn("配置文件目录\"" + PRO_CONFIG_DIR + "\"不存在未设定...");
		}
		return;
	}

}
