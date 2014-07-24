package com.unlimitedfield.y.util.string;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;

/**
 * y定义的日期格式
 * 
 * @author y
 * 
 */
public class Dateu {
	private static Logger log = Logger.getLogger(Dateu.class);
	
	public static final String DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm:ss";

	public static final String DATE_FORMAT = "yyyy/MM/dd";

	private static SimpleDateFormat sdfdt = new SimpleDateFormat(DATE_TIME_FORMAT);

	private static SimpleDateFormat sdfd = new SimpleDateFormat(DATE_FORMAT);

	// 为了某种兼容,默认的解析格式，就是这个样子的，老外的
	private static SimpleDateFormat sdfdt2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static SimpleDateFormat sdfd2 = new SimpleDateFormat("yyyy-MM-dd");

	public static SimpleDateFormat getDateSimpleDateFormat() {
		return sdfd;
	}

	public static SimpleDateFormat getDateTimeSimpleDateFormat() {
		return sdfd;
	}

	public static Date parseDateTime(String date) {
		if(date==null) return null;
		try {
			if (date.indexOf("-") != -1) {
				return sdfdt2.parse(date);
			} else {
				return sdfdt.parse(date);
			}
		} catch (ParseException e) {
			log.warn("解析格式不正确...");
			return null;
		} catch (NullPointerException e) {
			log.warn("解析格式内容为空...");
			return null;
		}

	}

	public static String formatDateTime(Date date) {
		if(date==null) return null;
		try {
			return sdfdt.format(date);
		} catch (NullPointerException e) {
			log.warn("格式化容为空...");
			return null;
		}
	}

	public static Date parseDate(String date) {
		if(date==null) return null;
		try {
			if (date.indexOf("-") != -1) {
				return sdfd2.parse(date);
			} else {
				return sdfd.parse(date);
			}
		} catch (ParseException e) {
			log.warn("解析格式不正确...");
			return null;
		} catch (NullPointerException e) {
			log.warn("解析格式内容为空...");
			return null;
		}

	}

	public static String formatDate(Date date) {
		if(date==null) return null;
		try {
			return sdfd.format(date);
		} catch (NullPointerException e) {
			log.warn("格式化容为空...");
			return null;
		}
	}
}
