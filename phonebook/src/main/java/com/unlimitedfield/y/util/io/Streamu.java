package com.unlimitedfield.y.util.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.log4j.Logger;

/**
 * <pre>
 * description：
 * 先实现个对字符串操作，utf-8编码的
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/16
 */
public class Streamu {
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(Streamu.class);

	/**
	 * 文件清空
	 * 
	 * @throws IOException
	 */
	public static boolean fileClean(File file) throws IOException {
		fileWrite(file, "");
		return true;
	}

	/**
	 * 文件写入内容
	 * 不存在会创建
	 * @throws IOException
	 */
	public static boolean fileWrite(File file, String string) throws IOException {
		FileOutputStream out = new FileOutputStream(file);
		BufferedOutputStream bos = new BufferedOutputStream(out);
		bos.write(string.getBytes("UTF-8"));
		bos.flush();
		bos.close();
		return true;
	}

	/**
	 * 文件追加内容
	 * 
	 * @throws IOException
	 */
	public static boolean fileAddWrite(File file, String string) throws IOException {
		FileOutputStream out = new FileOutputStream(file, true);
		BufferedOutputStream bos = new BufferedOutputStream(out);
		bos.write(string.getBytes("UTF-8"));
		bos.flush();
		bos.close();
		return true;
	}

	/**
	 * 文件显示内容 针对小内容的一次性读出
	 * 
	 * @throws IOException
	 */
	public static String fileRead(File file) throws IOException {
		FileInputStream in = new FileInputStream(file);
		BufferedInputStream bis = new BufferedInputStream(in);
		byte[] data = new byte[bis.available()];
		bis.read(data);
		bis.close();
		return new String(data, "UTF-8");
	}
}
