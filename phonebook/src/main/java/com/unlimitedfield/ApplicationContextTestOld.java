package com.unlimitedfield;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class ApplicationContextTestOld {
	
	private static ApplicationContext ac;
	
	@BeforeClass
	public static void beforeClass(){
		ac = new ClassPathXmlApplicationContext("applicationContext.xml");
	}
	
	@Test
	public void test_name() throws Exception {
		System.out.println("is?");
	}
	
	/**
	 * 测试自己创建的实例
	 */
	@Test
	public void test_showInstanceSlf(){
		int j=0;
		System.out.println("容器中的实例有：");
		for(int i=0;i<ac.getBeanDefinitionNames().length;i++){
			if(ac.getBeanDefinitionNames()[i].startsWith("org.springframework")){
				continue;
			}
			j++;
			System.out.println(ac.getBeanDefinitionNames()[i]);
		}
		System.out.println("容器中的对象总数量："+j);
	}
	
	/**
	 * 测试扫描到的所有对象
	 */
	@Test
	public void test_showInstance() {
		System.out.println("容器中的对象数量：" + ac.getBeanDefinitionCount());
		System.out.println("容器中的实例是：");
		for (String e : ac.getBeanDefinitionNames()) {
			System.out.println(e);
		}
	}
	
	/**
	 * 测试扫描到的对象
	 * 用的东西多了，这就变得没有意义了
	 */
	@Test
	public void test_showInstance_recycle1() {
		List<String> beans = Arrays.asList(ac.getBeanDefinitionNames());
		List<String> springAnnontationBeans = new ArrayList<String>();
		springAnnontationBeans.add("org.springframework.context.annotation.internalConfigurationAnnotationProcessor");
		springAnnontationBeans.add("org.springframework.context.annotation.internalAutowiredAnnotationProcessor");
		springAnnontationBeans.add("org.springframework.context.annotation.internalRequiredAnnotationProcessor");
		springAnnontationBeans.add("org.springframework.context.annotation.internalCommonAnnotationProcessor");
		springAnnontationBeans.add("org.springframework.context.annotation.internalPersistenceAnnotationProcessor");
		
		if(beans.containsAll(springAnnontationBeans)){
			System.out.println("容器中的对象数量：" + (ac.getBeanDefinitionCount()-5));
		}else{
			System.out.println("容器中的对象数量：" + ac.getBeanDefinitionCount());
		}
		/*
		 * 默认的5个就不显示了
		 * org.springframework.context.annotation.internalConfigurationAnnotationProcessor
		 * org.springframework.context.annotation.internalAutowiredAnnotationProcessor
		 * org.springframework.context.annotation.internalRequiredAnnotationProcessor
		 * org.springframework.context.annotation.internalCommonAnnotationProcessor
		 * org.springframework.context.annotation.internalPersistenceAnnotationProcessor
		 */
		System.out.println("容器中的实例是：");
		for (String e : ac.getBeanDefinitionNames()) {
			if(springAnnontationBeans.contains(e)){
				continue;
			}
			System.out.println(e);
		}
	}
}
