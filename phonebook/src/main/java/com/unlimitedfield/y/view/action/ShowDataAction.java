package com.unlimitedfield.y.view.action;

import java.io.File;
import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.unlimitedfield.y.base.BaseAction;
import com.unlimitedfield.y.util.io.Fileu;
import com.unlimitedfield.y.util.io.Pathu;
import com.unlimitedfield.y.util.io.Streamu;

/**
 * <pre>
 * description：
 *	调试用于显示一些即时的信息
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/16 
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@SuppressWarnings({"rawtypes", "serial"})
public class ShowDataAction extends BaseAction {
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(ShowDataAction.class);
	
	private static File file;
	
	//关于代理是否记录日志
	private static boolean proxy = false;
	
	private String content;
	
	static{
		file = new File(Pathu.getClassPath(ShowDataAction.class).getPath()+File.separator+ShowDataAction.class.getSimpleName()+".tc");
		try {
			Fileu.createIfNotExists(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static File getFile(){
		return file;
	}
	
	public static boolean getTag(){
		return proxy;
	}
	
	/**
	 * http://localhost:8080/happin/ShowData_showIndex
	 */
	public String showIndex(){
//		System.out.println(context.getRealPath("upload")+File.separator+"temp.tc");
//		System.out.println(new File("").getAbsolutePath());
//		System.out.println(ShowDataAction.class.getResource(""));
//		System.out.println(ShowDataAction.class.getClassLoader().getResource(""));
//		File file = new File(context.getRealPath("upload")+File.separator+"temp.tc");
//		System.out.println(file.getAbsolutePath());
		if(content==null||content.trim().equals("")){
			try {
				action.getValueStack().set("ms", Streamu.fileRead(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else{
			try {
				Streamu.fileAddWrite(file, content+"\r\n");
				action.getValueStack().set("ms", Streamu.fileRead(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return actionResult.getResult();
	}
	
	public String getData(){
//		File file = new File(context.getRealPath("upload")+File.separator+"temp.tc");
		String str=null;
		 try {
			str=Streamu.fileRead(file);
		} catch (IOException e) {
		}
		if (str == null) {
			str = "";
		}
		actionResult.setString(str);
		return actionResult.getResult();
	}
	
	public String cleanData() {
//		File file = new File(context.getRealPath("upload")+File.separator+"temp.tc");
		try {
			Streamu.fileClean(file);
		} catch (IOException e) {
		}
		actionResult.setString("");
		return actionResult.getResult();
	}

	public String checkStatus(){
		proxy = !proxy;
		if(proxy){
			actionResult.setString("1");
		}else{
			actionResult.setString("");
		}
		return actionResult.getResult();
	}
	
	//getter setter...
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}

