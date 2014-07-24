package com.unlimitedfield.test;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.tool.hbm2ddl.SchemaExport;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate3.LocalSessionFactoryBean;

import com.unlimitedfield.test.domain.Log;
import com.unlimitedfield.test.domain.User;
import com.unlimitedfield.y.util.material.Hibernateu;
import com.unlimitedfield.y.util.material.Springu;

/**
 * 模板的案例测试 当前路径
 * 
 * @author y
 * 
 */
public class SshTest {

	private static ApplicationContext applicationContext;
	private static ApplicationContext ac;
	private static SessionFactory sessionFactory;
	private static SessionFactory sf;

	@BeforeClass
	public static void beforeClass() {
		new ClassPathXmlApplicationContext("applicationContext.xml", SshTest.class);
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
	public void test_showSpringSlfInstance() throws Exception {
		System.out.println(Springu.showSlfCategoryInstance());
	}
	@Test
	public void test_showSpringInstance() throws Exception {
		System.out.println(Springu.showInstance());
	}

	/**
	 * 显示容器中的实例
	 */
	@Test
	public void test_showHibernateInstance() throws Exception {
		System.out.println(Hibernateu.showInstance());
	}

	/**
	 * 测试User的写入
	 */
	@Test
	public void test_save_user() throws Exception {
		Session s = sf.openSession();
		s.beginTransaction();
		User u = new User();
		u.setName("Miss");
		s.save(u);
		s.getTransaction().commit();
		s.close();
	}

	/**
	 * 测试Log的写入
	 */
	@Test
	public void test_save_log() throws Exception {
		Session s = sf.openSession();
		s.beginTransaction();
		Log l = new Log();
		l.setMessage("message");
		s.save(l);
		s.getTransaction().commit();
		s.close();
	}

	/**
	 * 原来想获得hibernate的config的<br>
	 * 把spring自动创表关了<br>
	 * 如果要创建表可以手动<br>
	 * 下面被空指针卡住了
	 */
	@Test
	public void test_temp() throws Exception {
		// 这里其实是获取到SessionFactory的上一级对象
		LocalSessionFactoryBean configBean = (LocalSessionFactoryBean) (ac.getBean("&sessionFactory"));
		// 证明有datasoruce
		// System.out.println(configBean.getDataSource());

		Configuration cfg = configBean.getConfiguration();
		
		//因为这个为null所以下面异常
//		System.out.println(LocalSessionFactoryBean.getConfigTimeDataSource());
		
		// datasource not exists
		// SessionFactory sessionFactory2 = cfg.buildSessionFactory();
		// System.out.println(sessionFactory2);
		
		// 自动建表或删除表的工具类SchemaExport
		SchemaExport schemaExport = new SchemaExport(cfg);
		// 第1个参数script的作用： print the DDL to the console
		// 第2个参数export的作用： export the script to the database
		//这个只是模拟运行所以没问题
//		schemaExport.create(true, false); // 自动建表
		//一旦正是创建了就异常了
		schemaExport.create(true, true); // 自动建表
		// schemaExport.drop(true, true);//自动删表
	}

}
