package com.unlimitedfield.test;

import org.junit.Test;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author y
 *
 */
public class ApplicationContextTest {
	/**
	 * 测试基本的spring的运行
	 * 测试扫描到的对象
	 */
	@Test
	public void test_run() {
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
