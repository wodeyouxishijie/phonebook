package com.unlimitedfield.y.base;

import com.opensymphony.xwork2.ActionContext;


/** 
 * description： 
 * 		分装，
 * 因为actionContext如果放在构造体里会是另外一个actionContext
 * @author y 
 * @version createdate：2014/06/22 
 */
public interface ActionContextAware {
	public void setActionContext(ActionContext actionContext);
}
