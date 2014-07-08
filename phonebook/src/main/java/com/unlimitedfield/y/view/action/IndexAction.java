package com.unlimitedfield.y.view.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;
import com.unlimitedfield.y.util.date.Dateu;
import com.unlimitedfield.y.util.file.Fileu;
import com.unlimitedfield.y.util.path.Pathu;

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
	 * 测试日志位置
	 */
	public String testLog() {
		log.error("测试异常");
		// System.out.println(1/0);
		return null;
	}
	
	private String url;
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String testHtml(){
		System.out.println(url);
		if (url != null) {
			InputStream in = null;
			try {
				in = new URL(url).openStream();
				action.getValueStack().set("ms", IOUtils.toString(in));
			} catch (Exception e) {
			} finally {
				IOUtils.closeQuietly(in);
			}
		}
		
		return actionResult.getResult();
	}
	
	public String testString(){
		actionResult.setString("测试");
		return actionResult.getResult();
	}
	
	public String testImg(){
		InputStream imageStream = null;
		try {
			imageStream = new FileInputStream(new File(IndexAction.class
					.getResource("绝对领域.jpg").getPath()));
		} catch (FileNotFoundException e) {
		}
		actionResult.setImage(imageStream);
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