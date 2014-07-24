package com.unlimitedfield.y.util.material;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * description： 使用前需有spring容器
 * 
 * @author y
 * @version createdate：2014/05/04
 */
public class Springu {
	private static ApplicationContext applicationContext;

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public static void setApplicationContext(ApplicationContext applicationContext) {
		Springu.applicationContext = applicationContext;
	}

	/**
	 * 如果spring容器未打开<br>
	 * 可以考虑开启一个
	 */
	public static void initialize() {
		new ClassPathXmlApplicationContext("applicationContext.xml");
	}
	
	/**
	 * action,service,dao,other 分类
	 */
	public static String showSlfCategoryInstance(){
		StringBuilder sb = new StringBuilder();
		sb.append("Spring容器中的实例有：\n");
		int j = 0;
		List<String> action = new ArrayList<String>();
		List<String> service = new ArrayList<String>();
		List<String> dao = new ArrayList<String>();
		List<String> other = new ArrayList<String>();
		for(int i=0;i<applicationContext.getBeanDefinitionNames().length;i++){
			if(applicationContext.getBeanDefinitionNames()[i].startsWith("org.springframework")){
				continue;
			}
			j++;
			if(applicationContext.getBeanDefinitionNames()[i].endsWith("Action")){
				action.add(applicationContext.getBeanDefinitionNames()[i]);
				continue;
			}
			if(applicationContext.getBeanDefinitionNames()[i].endsWith("Service")){
				service.add(applicationContext.getBeanDefinitionNames()[i]);
				continue;
			}
			if(applicationContext.getBeanDefinitionNames()[i].endsWith("Dao")){
				dao.add(applicationContext.getBeanDefinitionNames()[i]);
				continue;
			}
			other.add(applicationContext.getBeanDefinitionNames()[i]);
		}
		for(String o:action){
			sb.append(o+"\n");
		}
		for(String o:service){
			sb.append(o+"\n");
		}
		for(String o:dao){
			sb.append(o+"\n");
		}
		for(String o:other){
			sb.append(o+"\n");
		}
		sb.append("容器中的对象总数量：" + j + "\n");
		return sb.toString();
	}
	
	/**
	 * 测试自己创建的实例
	 */
	public static String showSlfInstance() {
		StringBuilder sb = new StringBuilder();
		int j = 0;
		sb.append("Spring容器中的实例有：\n");
		for (int i = 0; i < applicationContext.getBeanDefinitionNames().length; i++) {
			if (applicationContext.getBeanDefinitionNames()[i].startsWith("org.springframework")) {
				continue;
			}
			j++;
			sb.append(applicationContext.getBeanDefinitionNames()[i] + "\n");
		}
		sb.append("容器中的对象数量：" + j + "\n");
		return sb.toString();
	}

	/**
	 * 测试扫描到的所有对象
	 */
	public static String showInstance() {
		StringBuilder sb = new StringBuilder();
		sb.append("Spring容器中的实例有：\n");
		for (String e : applicationContext.getBeanDefinitionNames()) {
			sb.append(e + "\n");
		}
		sb.append("容器中的对象数量：" + applicationContext.getBeanDefinitionCount() + "\n");
		return sb.toString();
	}

}
