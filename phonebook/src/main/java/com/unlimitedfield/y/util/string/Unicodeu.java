package com.unlimitedfield.y.util.string;

import java.util.Locale;

/**
 * Unicode和字符串的相互转换
 * 
 * @author y
 * 
 */
public class Unicodeu {
	/**
	 * 将字符串转成unicode编码字符串
	 */
	public static String parse(String string) {
		return parseCore(string, true);
	}

	/**
	 * 将字符串转成unicode编码字符串<br>
	 * 连续的没有\\u的
	 */
	public static String parseLink(String string) {
		return parseCore(string, false);
	}

	private static String parseCore(String string, boolean tag) {
		string = (string == null ? "" : string);
		String tmp;
		StringBuilder sb = new StringBuilder();
		char c;
		for (int i = 0; i < string.length(); i++) {
			c = string.charAt(i);
			if (tag) {
				sb.append("\\u");
			}
			//char本身就是无符号扩展在Integer.toHex方法中
			// 取出高8位
			tmp = Integer.toHexString(c >>> 8);
			if (tmp.length() == 1) {
				sb.append("0");
			}
			sb.append(tmp);
			// 取出低8位
			tmp = Integer.toHexString(c & 0xFF);
			if (tmp.length() == 1) {
				sb.append("0");
			}
			sb.append(tmp);

		}
		return (new String(sb));
	}

	/**
	 * 将unicode字符串 转为 编码好的字符串
	 */
	public static String format(String unicode) {
		return formatCore(unicode);
	}

//	/**
//	 * 将unicode字符串 转为 编码好的字符串<br>
//	 * 连续的4位的
//	 */
//	public static String formatLink(String unicode) {
//		return formatCore(unicode);
//
//	}

	private static String formatCore(String unicode) {
		unicode = unicode == null ? "" : unicode.toLowerCase(Locale.ENGLISH);
		unicode = unicode.replace("\\u", "");

		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < unicode.length(); i += 4) {
			String value =  unicode.substring(i, i + 4);
			int c = 0;
			for (int j = 0; j < 4; j++) {
				char tempChar = value.charAt(j);
				int t = 0;
				switch (tempChar) {
				case 'a':
					t = 10;
					break;
				case 'b':
					t = 11;
					break;
				case 'c':
					t = 12;
					break;
				case 'd':
					t = 13;
					break;
				case 'e':
					t = 14;
					break;
				case 'f':
					t = 15;
					break;
				default:
					t = tempChar - '0';
					break;
				}
				c += t * ((int) Math.pow(16, (4 - j - 1)));
			}
			sb.append((char) c);
		}
		return sb.toString();
	}
}
