package com.unlimitedfield.y.util.string;

/**
 * 字节数组和十六进制字符串间的相互转换
 * 例如：0A0C00010B040F05030608005E122613
 * @author y
 *
 */
public class HexStru {
	/**
	 * 十六进制字符串转字节数组
	 * 每2个符号位为一个字节
	 */
	public static byte[] format(String str){
		byte[] b = new byte[str.length()/2];
		for(int i=0;i<b.length;i++){
			b[i] = (byte)Integer.parseInt(str.substring(i*2, i*2+2),16);
		}
		return b;
	}
	
	/**
	 * 字节数组转16进制字符串
	 * 小写的，需要大写自己转换
	 */
	public static String parse(byte[] b){
		StringBuilder sb=new StringBuilder();
		for(int i:b){
			//byte在运算的时候是按照int来计算的，所以&0xff是必要的
			i &= 0xff;
			if (i <= 0xf) {
				sb.append("0");
			}
			sb.append(Integer.toHexString(i));
		}
		return sb.toString();
	}
	
}
