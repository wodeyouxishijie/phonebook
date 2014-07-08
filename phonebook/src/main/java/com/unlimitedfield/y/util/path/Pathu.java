package com.unlimitedfield.y.util.path;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

import org.apache.log4j.Logger;

/**
 * 一些路径的操作
 * 尾部无斜杠
 * @author y
 *
 */
public class Pathu {
	
	private static Logger log = Logger.getLogger(Pathu.class);

	/**
	 * java里面/可以用作路径分割，所以不用考虑 系统？
	 * 获取当前类的所在目录
	 * 例：.../path/xx.class  则获得 .../path
	 */
	public static URL getClassPath(Class<?> clazz) {
		String str = clazz.getName().substring(0, clazz.getName().lastIndexOf(".")).replaceAll("\\.", "/");
		return clazz.getClassLoader().getResource(str);
		// return clazz.getResource("");//这个最后会有斜杠
	}
	
	/**
	 * 默认源文件是在src下面的
	 */
	public static URL getSrcPath(Class<?> clazz){
		return getSrcPath(clazz,"src");
	}
	
	/**
	 * 如果分源文件的话，此方法
	 */
	public static URL getSrcPath(Class<?> clazz,String sourceFileName){
		String str = clazz.getName().substring(0, clazz.getName().lastIndexOf(".")).replaceAll("\\.", "/");
		try {
			return new File(sourceFileName+File.separator+str).toURI().toURL();
		} catch (MalformedURLException e) {
			log.error("路径转化异常...");
			return null;
		}
	}
	
}
