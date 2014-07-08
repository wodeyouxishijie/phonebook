package com.unlimitedfield;

import org.junit.Test;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * scan
 * @author y
 *
 */
public class App {
	/**
	 * 测试扫描到的对象
	 */
	@Test
	public void test() {
		try {
			ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
			System.out.println(ac.getBeanDefinitionCount());
			for(String e:ac.getBeanDefinitionNames()){
				System.out.println(e);
			}
		} catch (BeansException e) {
			e.printStackTrace();
		}
	}
}
