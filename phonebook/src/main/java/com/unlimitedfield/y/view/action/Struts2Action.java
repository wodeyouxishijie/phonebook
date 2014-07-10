package com.unlimitedfield.y.view.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;
import com.unlimitedfield.y.base.DownLoadConfig;


/**
 * <pre>
 * description：
 *	演示我的struts2的防装
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/10 
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@SuppressWarnings("rawtypes")
public class Struts2Action extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 测试转发
	 */
	
	/**
	 * 测试重定向
	 */
	
	/**
	 * 测试Json
	 */
	
	/**
	 * http://localhost:8080/phonebook/struts2_testDown
	 * 测试下载
	 */
	public String testDown(){
		DownLoadConfig down = new DownLoadConfig();
		down.setFileName("test.jpg");
		try {
			down.setInputStream(new FileInputStream(new File(Struts2Action.class
						.getResource("绝对领域.jpg").getPath())));
		} catch (FileNotFoundException e) {
		}
		actionResult.setDownLoad(down);
		return actionResult.getResult();
	}
	
	/**
	 * http://localhost:8080/phonebook/struts2_testImg
	 * 测试输出字符串
	 * @return
	 */
	public String testString(){
		actionResult.setString("测试字符串");
		return actionResult.getResult();
	}
	
	/**
	 * http://localhost:8080/phonebook/struts2_testImg
	 * 测试输出图片
	 * @return
	 */
	public String testImg(){
		InputStream imageStream = null;
		try {
			imageStream = new FileInputStream(new File(Struts2Action.class
					.getResource("绝对领域.jpg").getPath()));
		} catch (FileNotFoundException e) {
		}
		actionResult.setImage(imageStream);
		return actionResult.getResult();
	}
}

