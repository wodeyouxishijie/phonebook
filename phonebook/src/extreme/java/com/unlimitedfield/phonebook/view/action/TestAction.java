package com.unlimitedfield.phonebook.view.action;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;

/**
 * <pre>
 * description：
 *	测试页面
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/10 
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@SuppressWarnings("rawtypes")
public class TestAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(TestAction.class);
	/**
	 * http://localhost:8080/phonebook/test_testLog
	 * 测试日志位置
	 */
	public String testLog() {
		log.error("测试异常");
		// System.out.println(1/0);
		return null;
	}
}

