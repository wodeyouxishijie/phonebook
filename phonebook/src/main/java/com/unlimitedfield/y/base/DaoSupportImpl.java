package com.unlimitedfield.y.base;

/**
 * Dao的实现
 * 
 * @author y
 *
 * @param <T>
 */
public class DaoSupportImpl<T> extends DaoSupportCoreImpl<T, Long> implements DaoSupport<T> {
//	
//	private static Logger log = Logger.getLogger(DaoSupportImpl.class);
//	
//	@Resource
//	private SessionFactory sessionFactory;
//	protected Class<T> clazz;
//
//	private static List<String> condition = new ArrayList<String>();
//	static{
//		condition.add("Integer");
//		condition.add("Long");
//		condition.add("Boolean");
//		condition.add("String");
//		condition.add("Date");
//	}
//	
//	public DaoSupportImpl() {
//		if (!(getClass().getGenericSuperclass() instanceof ParameterizedType)) {
//			// 未指定泛型，或者包装的时候的new instance
//			return;
//		}
//		// 通过反射得到T的真实类型
//		// 获取当前new的对象的 泛型的父类 类型
//		ParameterizedType pt = (ParameterizedType) getClass().getGenericSuperclass();
//		// 获取第一个类型参数的真实类型
//		this.clazz = (Class) pt.getActualTypeArguments()[0];
//		// System.out.println("clazz = " + clazz.getName());
//	}
//
//	public void add(T entity) {
//		getSession().save(entity);
//	}
//
//	public void save(T entity) {
//		getSession().saveOrUpdate(entity);
//	}
//
//	public void update(T entity) {
//		getSession().update(entity);
//	}
//
//	public void delById(Long id) {
//		Object obj = queryById(id);
//		if (obj != null) {
//			getSession().delete(obj);
//		}
//	}
//
//	public void del(T entity) {
//		getSession().delete(entity);
//	}
//
//	public T queryById(Long id) {
//		return (T) getSession().get(clazz, id);
//	}
//
//	public List<T> queryById(Long[] ids) {
//		return getSession().createQuery(//
//				"from " + clazz.getSimpleName() + " where id in(:ids)")//
//				.setParameterList("ids", ids)//
//				.list();
//	}
//
//	public List<T> queryAll() {
//		return getSession().createQuery(//
//				"from " + clazz.getSimpleName())//
//				.list();
//	}
//
//	public QueryResult<T> queryAll(int firstResult, int maxResults) {
//		return new QueryResult<T>(getSession().createQuery(//
//				"from " + clazz.getSimpleName())//
//				.setFirstResult(firstResult)//
//				.setMaxResults(maxResults)//
//				.list(), queryCount());
//	}
//
//	public Long queryCount() {
//		return (Long) getSession().createQuery(//
//				"select count(*) from " + clazz.getSimpleName())//
//				.uniqueResult();
//	}
//
//	/**
//	 * 获取当前可用的Session
//	 */
//	protected Session getSession() {
//		return sessionFactory.getCurrentSession();
//	}
//
//	@Override
//	public List<T> queryAll(T entity){
//		//对象所有属性的列表
//		Field[] field = entity.getClass().getDeclaredFields();
//		//存取字段的内容
//		Map<Integer, Object> map = new HashMap<Integer, Object>();
//		String hql = "from " + clazz.getSimpleName()+getCondition(field,entity,map);
//		
//		log.trace("hql条件语句是:"+hql);
//		
//		Query q = getSession().createQuery(hql);
//		//设置变量
//		for(Integer i:map.keySet()){
//			q.setParameter(field[i].getName(), map.get(i));
//		}
//		//查询
//		List<T> list = q.list();
//		return list;
//	}
//	
//	@Override
//	public QueryResult<T> queryAll(T entity, int firstResult, int maxResults) {
//		//对象所有属性的列表
//		Field[] field = entity.getClass().getDeclaredFields();
//		//存取字段的内容
//		Map<Integer, Object> map = new HashMap<Integer, Object>();
//		String hql = "from " + clazz.getSimpleName()+getCondition(field,entity,map);
//		
//		log.trace("hql条件语句是:"+hql);
//		
//		Query q = getSession().createQuery(hql);
//		//设置变量
//		for(Integer i:map.keySet()){
//			q.setParameter(field[i].getName(), map.get(i));
//		}
//		//查询
//		List<T> list = q.setFirstResult(firstResult)//
//				.setMaxResults(maxResults)//
//				.list();
//		
//		//数量查询
//		Query q2 = getSession().createQuery("select count(*) " + hql);
//		//设置变量
//		for(Integer i:map.keySet()){
//			q2.setParameter(field[i].getName(), map.get(i));
//		}
//		Long l = (Long) q2.uniqueResult();
//		
//		
//		return new QueryResult<T>(list, l);
//	}
//	
//	/**
//	 * 拼接字符串<br>
//	 * Integer,Long,Boolean,String,Date<br>
//	 * 满足上面的类型则拼接条件<br>
//	 * map<Integer,Object>存放的是field的编号，和对象的字段值<br>
//	 */
//	private String getCondition(Field[] field, Object model,Map<Integer, Object> map){
//		String res = " where ";
//		boolean tag = false;
//		for(int i=0;i<field.length;i++){
//			String name = field[i].getName();
//			String type = field[i].getGenericType().toString();
//			if(!condition.contains(getSimpleClassName(type))){
//				continue;
//			}
//			try {
//				Object o = model.getClass().getMethod(getMethod(name)).invoke(model);
//				if(o==null){
//					continue;
//				}
//				//模糊匹配
//				if(getSimpleClassName(type).equals("String")){
//					o = "%"+((String)o) + "%"; 
//				}
//				map.put(i, o);
//				if(tag){
//					if(getSimpleClassName(type).equals("String")){
//						res += "and "+name+" like :"+name+" ";
//					}else{
//						res += "and "+name+"=:"+name+" ";
//					}
//				}else{
//					if(getSimpleClassName(type).equals("String")){
//						res += name+" like :"+name+" ";
//					}else{
//						res += name+"=:"+name+" ";
//					}
//					tag = true;
//				}
//			} catch (Exception e) {
//			}
//		}
//		if(tag){
//			return res;
//		}else{
//			return "";
//		}
//	}
//	
//	/*获取简单类名*/
//	private String getSimpleClassName(String name){
//		if(name.indexOf("<")!=-1){
//			name = name.substring(0,name.indexOf("<"));
//		}
//		return name.substring(name.lastIndexOf(".")+1);
//	}
//	
//	/*获取方法名*/
//	private String getMethod(String name){
//		return "get"+name.substring(0, 1).toUpperCase() + name.substring(1);
//	}
}
