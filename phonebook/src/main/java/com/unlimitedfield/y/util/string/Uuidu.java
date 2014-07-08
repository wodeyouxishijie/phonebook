package com.unlimitedfield.y.util.string;

import java.util.UUID;

import org.apache.log4j.Logger;

/**
 * <pre>
 * description：
 *	
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/03 
 */
public class Uuidu {
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(Uuidu.class);
	
	/**
	 * 返回一个32位的uuid 小写,去-符号
	 * @return
	 */
	public static String getUuid(){
		return UUID.randomUUID().toString().replace("-", "");
	}
}

