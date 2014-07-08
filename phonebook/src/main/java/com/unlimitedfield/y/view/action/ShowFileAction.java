package com.unlimitedfield.y.view.action;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.unlimitedfield.y.base.BaseAction;

/**
 * description：
 * 	文件查看系统
 * @author y
 * @version createdate：2014/06/24
 */
@Controller
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
@SuppressWarnings({"rawtypes", "unused"})
public class ShowFileAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(ShowFileAction.class);
	protected static Integer defaultRows = 20;//修改默认页面行数
	
	private String file;
	/**
	 * 列出其文件<br>
	 * http://localhost:8080/happin/showFile_showIndex
	 */
	public String showIndex() { 
		String sp = File.separator;
		
		//预处理 xp and linux
		if(file!=null&&(file.endsWith(":"+sp+".."+sp)||file.equals(sp+".."+sp))){
			file = null;
		}
		
		//获取文件
		File[] files = null;
		if(file==null){
			files = File.listRoots();
		}else{
			try {
				File f = new File(file).getCanonicalFile();
				file = f.getPath();	
				if(file.endsWith(sp)){
					file = file.substring(0, file.length()-1);
				}
				files = f.listFiles();
			} catch (IOException e) {
				log.warn(e.getStackTrace());
			}
		} 
		
		//无结果的处理
		if(files==null||files.length==0){ 
			action.put("maxPage", 1);
			return actionResult.getResult();
		}
		
		//设置最大页
		int maxPage = files.length%rows==0?files.length/rows:files.length/rows+1;
		if(page>maxPage){
			page = maxPage;
		}
		int begin = (page-1)*rows;
		int end = page*rows-1;
		if(end>files.length-1){
			end = files.length-1;
		}
		
		//设置要显示的数组
		File[] showFiles = new File[end-begin+1];
		System.arraycopy(files, begin, showFiles, 0, showFiles.length);
		action.put("files", showFiles); 
		//设置要显示的最大页
		action.put("maxPage", maxPage);
		
		return actionResult.getResult();
	}

	/**
	 * 测试显示需要的信息
	 */
	public String testShow() {
		StringBuilder sb = new StringBuilder();
		sb.append("项目路径:\n");
		sb.append(context.getRealPath("") + "\n");
		sb.append("跟路径有:\n");
		File[] roots = File.listRoots();
		for (File file : roots) {
			sb.append(file.getAbsolutePath() + "\n");
		}
		sb.append("跟路径:\n");
		File dir = new File("/");
		sb.append(dir.getAbsolutePath());
		sb.append("跟路径的xx:\n");
		File[] files = dir.listFiles();
		for (File file : files) {
			if (file.isDirectory()) {
				sb.append(file.getAbsolutePath() + "\n");
			}
		}
		actionResult.setString(sb.toString());
		return actionResult.getResult();
	}

	// getter setter
	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

}
