package com.unlimitedfield.test;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;

import com.unlimitedfield.y.util.material.Hibernateu;
import com.unlimitedfield.y.util.material.Initu;
import com.unlimitedfield.y.util.material.Springu;

/**
 * 模板的案例测试
 * 默认路径
 * @author y
 *
 */
@SuppressWarnings("unused")
public class SshDefaultTest {
	
	private static ApplicationContext applicationContext;
	private static ApplicationContext ac;
	private static SessionFactory sessionFactory;
	private static SessionFactory sf;

	@BeforeClass
	public static void beforeClass() {
		Initu.initClose();
		Springu.initialize();
		applicationContext = Springu.getApplicationContext();
		ac = applicationContext;
		sessionFactory = Hibernateu.getSessionFactory();
		sf = sessionFactory;
	}

	/**
	 * 检测能否正常运行
	 */
	@Test
	public void test_begin() throws Exception {
		System.out.println("can it be run?");
	}
	
	/**
	 * 显示容器中的实例
	 */
	@Test
	public void test_showSpringInstance() throws Exception {
		System.out.println(Springu.showSlfCategoryInstance());
	}
	
	/**
	 * 显示容器中的实例
	 */
	@Test
	public void test_showHibernateInstance() throws Exception {
		System.out.println(Hibernateu.showInstance());
	}
	
	
}
