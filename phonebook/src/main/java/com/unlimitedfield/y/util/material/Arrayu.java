package com.unlimitedfield.y.util.material;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

/**
 * <pre>
 * description：
 * 
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/02
 */
public class Arrayu {
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(Arrayu.class);
	
	/**
	 * 按顺序合并2个数组
	 */
	public static byte[] combine(byte[] first, byte[] second){
		int length=0;
		if(first != null){
			length = first.length;
		}
		if(second != null){
			length = length + second.length;
		}
		if(length==0){
			return null;
		}
		byte[] arr = new byte[length];
		if(first!=null){
			System.arraycopy(first,0,arr,0,first.length);
			if(second!=null){
				System.arraycopy(second,0,arr,first.length,second.length);
			}
		}else{
			if(second!=null){
				System.arraycopy(second,0,arr,0,second.length);
			}
		}

		return arr;
	}
	
	/**
	 * List<Byte> 与 byte[] 的转换<br>
	 * 
	 * 数组的赋值底层也是用c语言写的<br>
	 * 也是内容的遍历。<br>
	 * 而我要用目前如此实现<br>
	 */
	public static byte[] list2byte(List<Byte> list) {
		int size = list.size();
		byte[] b = new byte[size];
		for (int i = 0; i < size; i++) {
			b[i] = list.get(i);
		}
		return b;
	}

	public static List<Byte> byte2list(byte[] b) {
		List<Byte> list = new ArrayList<Byte>();
		for (int i = 0; i < b.length; i++) {
			list.add(b[i]);
		}
		return list;
	}
	
	/**
	 * List<Byte> 扩展 byte[]
	 */
	public static List<Byte> listAddByte(List<Byte> list,byte[] b){
		if(b==null){
			return list;
		}
		for (int i = 0; i < b.length; i++) {
			list.add(b[i]);
		}
		return list;
	}
}
