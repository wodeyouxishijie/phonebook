package com.unlimitedfield.y.util.material;

import org.hibernate.SessionFactory;

/**
 * description： 使用前需有spring容器
 * 
 * @author y
 * @version createdate：2014/05/04
 */
public class Hibernateu {

	private static SessionFactory sessionFactory;

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static void setSessionFactory(SessionFactory sessionFactory) {
		Hibernateu.sessionFactory = sessionFactory;
	}

	/**
	 * 获取所有sessionFactory工厂中的实例
	 */
	public static String showInstance() {
		StringBuilder sb = new StringBuilder();
		sb.append("Hibernate容器中的实例有：\n");
		int j = 0;
		for (Object e : sessionFactory.getAllClassMetadata().keySet()) {
			sb.append(e + "\n");//+ "\t\t" + sessionFactory.getAllClassMetadata().get(e) 
			j++;
		}
		sb.append("容器中的对象数量：" + j + "\n");
		return sb.toString();
	}
}
