package com.unlimitedfield.y.view.action;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;

/** 
 * description： 
 * 尝试网页版服务器创建
 * @author y 
 * @version createdate：2014/06/29 
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@SuppressWarnings({"rawtypes", "unused"})
public class SocketAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(SocketAction.class);
	private Thread t;
	
	@Resource
	private ServerServiceImpl serverService;
	
	public String show(){
		System.out.println(t);
		if(t!=null){
			System.out.println(t.getName());
		}
		actionResult.setString("测试");
		return actionResult.getResult();
	}
	
	/**
	 * http://localhost:8080/clean/socket_test 
	 * @return
	 */
	public String test(){
		System.out.println("once begin...");
		serverService.startServer();
	//新线程在action里会有异常的，放在service好点
//		t = new Thread(){
//			public void run() {
//				Server demo = new Server();
//				demo.start();
//				System.out.println("begin?");
//			};
//		};
//		t.start();
//		System.out.println(t.getName());
		System.out.println("once...");
//		try {
//			t.join();
//		} catch (InterruptedException e) {
//			log.warn("join err");
//		}
		actionResult.setString("结束");
		return actionResult.getResult();
	}
}
