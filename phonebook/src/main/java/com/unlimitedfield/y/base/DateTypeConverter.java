package com.unlimitedfield.y.base;

import java.util.Date;
import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

import com.unlimitedfield.y.util.string.Dateu;

/**
 * struts string 参数转为Date的转换器
 * 
 * @author y
 * 
 */
@SuppressWarnings("rawtypes")
public class DateTypeConverter extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass) {
		// System.out.println("convertFromString............");
		// System.out.println(context);
		// System.out.println(Arrays.toString(values));
		if (toClass == Date.class) {
			String dateTime = values[0];
			int l = dateTime.trim().length();
			if (l == Dateu.DATE_TIME_FORMAT.length()) {
				return Dateu.parseDateTime(dateTime);
			} else if (l == Dateu.DATE_FORMAT.length()) {
				return Dateu.parseDate(dateTime);
			}
		}
		return null;
	}

	@Override
	public String convertToString(Map context, Object o) {
		// System.out.println("convertToString............");
		// System.out.println(context);
		// System.out.println(o);
		// struts优化了，空不会到达此处
		Date v = (Date) o;
		String date = Dateu.formatDateTime(v);
		String date2 = date.substring(date.indexOf(' ') + 1);
		if ("00:00:00".equals(date2)) {
			return date.substring(0, date.indexOf(' '));
		} else {
			return date;
		}
	}

}
