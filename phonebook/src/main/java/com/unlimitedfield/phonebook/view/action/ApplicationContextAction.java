package com.unlimitedfield.phonebook.view.action;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;
import com.unlimitedfield.y.util.material.Hibernateu;
import com.unlimitedfield.y.util.material.Springu;

/**
 * spring相关的一些显示
 * 
 * @author y
 * 
 */
@SuppressWarnings("rawtypes")
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class ApplicationContextAction extends BaseAction{

	private static final long serialVersionUID = 1L;

	/**
	 * 查看spring容器中自己的beans<br>
	 * http://localhost:8080/happin/spring_showBeans
	 */
	public String showBeans() {
		actionResult.setString(Springu.showSlfInstance());
		return actionResult.getResult();
	}

	/**
	 * 查看spring容器中所有Bean
	 */
	public String showAllBeans() {
		actionResult.setString(Springu.showInstance());
		return actionResult.getResult();
	}
	
	/**
	 * 查看数据库对象（session工厂内的实例）
	 */
	public String showDomainBeans(){
		actionResult.setString(Hibernateu.showInstance());
		return actionResult.getResult();
	}
	
	
	
}
