package com.unlimitedfield.y.base;

import ognl.Ognl;
import ognl.OgnlException;

import org.apache.struts2.json.JSONResult;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;

/**
 * 包装struts2源JsonResult
 * 
 * @author y
 * 
 */
public class JsonExResult extends JSONResult {

	private static final long serialVersionUID = 1L;

	public void setExcludeNullProperties(String excludeNullProperties) {
		try {
			super.setExcludeNullProperties((Boolean) (Ognl.getValue(excludeNullProperties, //
					ActionContext.getContext().getValueStack().getRoot())));
		} catch (OgnlException e) {
		}
	}

	public void setIncludeProperties(String commaDelim) {
		try {
			super.setIncludeProperties((String) (Ognl.getValue(commaDelim, //
					ActionContext.getContext().getValueStack().getRoot())));
		} catch (OgnlException e) {
		}
	}

	public void setExcludeProperties(String commaDelim) {
		try {
			super.setExcludeProperties((String) (Ognl.getValue(commaDelim,//
					ActionContext.getContext().getValueStack().getRoot())));
		} catch (OgnlException e) {
		}
	}

	@Override
	public void execute(ActionInvocation invocation) throws Exception {
		super.execute(invocation);
	}
}
