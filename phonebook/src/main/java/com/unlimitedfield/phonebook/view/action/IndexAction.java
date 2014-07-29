package com.unlimitedfield.phonebook.view.action;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;
import com.unlimitedfield.y.util.string.Dateu;

/**
 * 主页么
 * 
 * @author y
 * 
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@SuppressWarnings("rawtypes")
public class IndexAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	Logger log = Logger.getLogger(getClass());
	/**
	 * 主页<br>
	 * http://localhost:8080/happin/index_showIndex
	 */
	public String showIndex() {
		return actionResult.getResult();
	}
	
	/**
	 * 查看时间
	 */
	public String showTime() {
		return actionResult.getResult();
	}
	
	/**
	 * 获取服务器时间,一个固定格式的字符串
	 */
	public String getServerDateTime() {
		actionResult.setString(Dateu.formatDateTime(new Date()));
		return actionResult.getResult();
	}
}
