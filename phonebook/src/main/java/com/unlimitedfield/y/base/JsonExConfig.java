package com.unlimitedfield.y.base;

/**
 * json的高级配置<br>
 * 原来：<br>
 * 对数组选择：json.addNotShow("message\\[\\d+\\]\\.dateMoneys");<br>
 * 一个：json.addShow("message\\[1+\\]\\.id");<br>
 * .需要用message\\.list<br>
 * 但是结尾需要用到.*<br>
 * 最后用.*前面用ognl所以要\\.，后面剪应该是正则<br>
 * 
 * <b>现在:</b><br>
 * 优化为[]显示所有数组 用.会自动匹配为\\.<br>
 * 
 * @author y
 * 
 */
public class JsonExConfig {
	/** 需要显示的 */
	private String show = "";
	/** 需要不显示的 */
	private String notShow = "";
	/** false为显示空的对象 */
	private String notShowNull = "false";
	private Object json;

	public Object getJson() {
		return json;
	}

	public void setJson(Object json) {
		this.json = json;
	}

	public String getShow() {
		return show;
	}

	/** 增加需要显示的成员，默认为全部显示 */
	public void addShow(String show) {
		if (show == null)
			return;
		if (this.show.length() != 0) {
			this.show = this.show + "," + dealString(show);
		} else {
			this.show = dealString(show);
		}
	}

	public String getNotShow() {
		return notShow;
	}

	/** 增加不需要显示的成员，默认为无 */
	public void addNotShow(String notShow) {
		if (notShow == null)
			return;
		if (this.notShow.length() != 0) {
			this.notShow = this.notShow + "," + dealString(notShow);
		} else {
			this.notShow = dealString(notShow);
		}
	}

	public String getNotShowNull() {
		return notShowNull;
	}

	/** 是否显示空对象 */
	public void setNotShowNull(Boolean notShowNull) {
		if (notShowNull == null)
			return;
		if (notShowNull) {
			this.notShowNull = "true";
		} else {
			this.notShowNull = "false";
		}
	}

	private String dealString(String content) {
		String result = content.replace("[]", "\\[\\d+\\]")//
				.replaceAll("\\\\\\.|\\.", "\\\\.")//
				.replaceAll("\\\\\\[|\\[", "\\\\[")//
				.replaceAll("\\\\\\]|\\]", "\\\\]");

//		if (result.endsWith("]")) {
//
//		} else {
			result += ".*";
//		}
		return result;
	}
}
