package com.unlimitedfield.y.util.config;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Locale;
import java.util.Properties;

import javax.swing.filechooser.FileSystemView;

import org.apache.log4j.Logger;

/**
 * 个人的一些信息存放地点<br>
 * 桌面如果不存在则系统自动设定
 * 
 * @author y
 * 
 */
public class YsSubConfigu {
	private static final Logger log = Logger.getLogger(YsSubConfigu.class);

	/** 配置文件名 */
	private static String configName = "yssubconfig.properties";
	/** 测试文件目录 
	 * 如果是在web中，此文件是没有的
	 * */
	private static final String PRO_FILE_NAME = "ProFileName";
	private static String proFileName;
	/** pc3 的桌面 */
	private static final String DESKTOP = "Desktop";
	private static String desktop;
	/** properties */
	private static Properties properties;
	/** 是否自动搜索桌面 */
	private static final String IF_AUTO_STRING = "IfAutoDesktop";
	private static final String TRUE_STRING = "true";
	private static boolean IfAuto = false;// 默认不自动搜索

	static {
		initialize();
	}

	// public
	/** 如果不存在则null */
	public static String getProFileDir() {
		return proFileName;
	}
	public static String getDesktop() {
		return desktop;
	}
	public static Properties getProperties() {
		return properties;
	}
	// 解决修改变动需要重启服务器问题
	public static void reload() {
		initialize();
	}
	
	// private......
	private static void initialize() {
		log.trace("yssubconfig初始化...");
		String path = YsConfigu.getProConfigDir();
		properties = null;
		try {
			properties = new Properties();
			properties.load(new BufferedInputStream(new FileInputStream(path + File.separator + configName)));
		} catch (Exception e) {
			properties = null;
		}
		if (properties == null) {
			proFileName = null;
			desktop = null;
			log.warn("配置文件\"" + configName + "\"不存在未设定...");
			return;
		}
		setProFileDir();
		setdesktop();
	}

	/**
	 * 这个放圈外 圈内的话会有class的问题
	 */
	private static void setProFileDir() {
		String s = properties.getProperty(PRO_FILE_NAME);
		if (s != null) {
			File file = new File(s);
			if (file.exists()) {
				proFileName = file.getAbsolutePath();
				log.trace("设定测试文件目录: " + proFileName);
			} else {
				proFileName = null;
				log.warn("测试文件目录不存在未设定..."+file.toString());
			}
		}
	}

	/**
	 * 超圈外一个地址
	 */
	private static void setdesktop() {
		String s = properties.getProperty(DESKTOP);
		if (s != null) {
			File file = new File(s);
			if (file.exists()) {
				desktop = file.getAbsolutePath();
				log.trace("设定PC桌面: " + desktop);
				return;
			}
		}
		desktop = null;
		try {
			IfAuto = properties.getProperty(IF_AUTO_STRING).toLowerCase(Locale.ENGLISH).trim().equals(TRUE_STRING);
		} catch (Exception e) {
			return;
		}
		if (!IfAuto) {
			log.warn("PC桌面不存在未设定...");
			return;
		}
		FileSystemView fsv = FileSystemView.getFileSystemView();
		desktop = fsv.getHomeDirectory().getAbsolutePath();
		if (new File(desktop).exists()) {
			log.trace("PC桌面不存在,然自动设定：" + desktop);
		} else {
			log.warn("PC桌面不存且自动设定不能,未设定...");
		}
	}

}
