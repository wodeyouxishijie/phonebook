package com.unlimitedfield.y.base;

import java.lang.reflect.ParameterizedType;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ApplicationAware;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.util.ServletContextAware;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

/**
 * <pre>
 * base Action
 * 
 * RequestAware、SessionAware、ApplicationAware 非耦合可用 ActionContext获得
 * ServletRequestAware、ServletResponseAware、ServletContextAware 耦合 可用ServletActionContext获得
 * </pre>
 * 
 * @author y
 * 
 */
@SuppressWarnings("unchecked")
public abstract class BaseAction<T> //
		extends
			ActionSupport //
		implements
			ModelDriven<T>,
			ServletResponseAware,
			RequestAware,
			SessionAware,
			ApplicationAware,
			ServletContextAware,
			ActionContextAware {

	public BaseAction() {
	}

	// =============== ModelDriven的支持 ==================
	private static final long serialVersionUID = 1L;
	//
	protected T model;
	{
		initializeModel();
	}
	private void initializeModel() {
		try {
			// 未指定泛型
			if (!(this.getClass().getGenericSuperclass() instanceof ParameterizedType)) {
				return;
			}
			// 通过反射获取model的真实类型
			ParameterizedType pt = (ParameterizedType) getClass().getGenericSuperclass();
			// 获取真实类型
			Class<T> clazz = (Class<T>) pt.getActualTypeArguments()[0];
			// 通过反射创建model的实例
			model = clazz.newInstance();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	public T getModel() {
		return model;
	}
	// =============== strutsAction配置 ==================
	protected ActionResult actionResult = new ActionResult();

	public ActionResult getActionResult() {
		return actionResult;
	}
	// =============== strutsAction作用域配置 ==================
	protected HttpServletResponse response;
	protected Map<String, Object> request;
	protected Map<String, Object> session;
	protected Map<String, Object> application;
	protected ActionContext action;// action 上下文
	protected ServletContext context;// getRealPath等方法需要
	@Override
	public void setRequest(Map<String, Object> request) {
		this.request = request;
	}
	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}
	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	@Override
	public void setApplication(Map<String, Object> application) {
		this.application = application;
	}
	@Override
	public void setActionContext(ActionContext actionContext) {
		this.action = actionContext;
	}
	@Override
	public void setServletContext(ServletContext context) {
		this.context = context;
	}
	// =============== 常用变量的配置 ==================
	// 如果和调用本身的冲突，此处的优先级更低
	protected Integer page;// 页面
	protected Integer rows;// 每页个数
	protected static Integer defaultRows = 10;// 默认页数,能够重写
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
	}

	// =============== Service实例的声明 ==================
	// @Resource
	// protected MessageBoardService messageBoardService;
}
