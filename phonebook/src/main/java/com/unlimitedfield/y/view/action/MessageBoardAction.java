package com.unlimitedfield.y.view.action;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.unlimitedfield.y.base.BaseAction;
import com.unlimitedfield.y.domain.MessageBoard;

/**
 * <pre>
 * description：
 * 	一个页面的基础功能：显示
 * </pre>
 * 
 * @author y
 * @version createdate：2014/06/16
 */
@SuppressWarnings({"rawtypes", "unused"})
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class MessageBoardAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(MessageBoardAction.class);

	/**
	 * 显示页面 http://localhost:8080/happin/messageBoard_showIndex
	 */
	public String showIndex() {
		return actionResult.getResult();
	}
	/**
	 * 显示列表
	 */
	public String showList() {
//		System.out.println(Thread.currentThread().getName());
		System.out.println(action);
		System.out.println(ActionContext.getContext());
//		System.out.println(action.getSession().put("1", "2")); 
//		System.out.println(ActionContext.getContext().getSession().put("2", "3"));
//		List<MessageBoard> list = messageBoardService.queryAll();
//		action.put("qwerrt", "9527");
//		ActionContext.getContext().put("asdfgh", "7259");
//		action.put("list", list);//这竟然是另外一个对象
//		ActionContext.getContext().put("list", list);
//		request.setAttribute("list", list);
		return actionResult.getResult();
	}
	/**
	 * 添加页面，添加
	 */
	public String showAdd() {
		return actionResult.getResult();
	}
	public String add() {
		actionResult.setRedirectFunction("showIndex");
		return actionResult.getResult();
	}
	/**
	 * 修改页面,修改
	 */
	public String showUpdate() {
		return actionResult.getResult();
	}

	public String update() {
		actionResult.setRedirectFunction("showIndex");
		return actionResult.getResult();
	}
	/**
	 * 删除
	 */
	public String del() {
		actionResult.setRedirectFunction("showIndex");
		return actionResult.getResult();
	}
	//如果有其他功能Ex
}
