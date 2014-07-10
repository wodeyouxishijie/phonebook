package com.unlimitedfield.y.view.action;


import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;

/**
 * 获取字符串的长度
 * @author y
 *
 */
@SuppressWarnings("rawtypes")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class StringLengthAction extends BaseAction{
	private static final long serialVersionUID = 1L;

	/**
	 * 显示
	 * http://localhost:8080/phonebook/stringLength_main
	 */
	public String main(){
		return actionResult.getResult();
	}
}
