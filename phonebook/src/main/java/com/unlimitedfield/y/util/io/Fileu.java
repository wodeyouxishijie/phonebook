package com.unlimitedfield.y.util.io;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;

import org.apache.log4j.Logger;

/**
 * 打开win系统的文件夹
 * @author y
 *
 */
public class Fileu {
	private static final Logger log = Logger.getLogger(Fileu.class);
	
	/**
	 * 打开给定的路径
	 */
	public static void openFileForMicro(String file){
		try {
			file = file.replace("/", "\\");
			Runtime.getRuntime().exec("cmd /c start explorer "+file);
		} catch (Exception e) {
			log.error("打开失败...");
		}
	}
	
	public static void openFileForMicro(URL file){
		openFileForMicro(dealUrlForMicro(file));
	}
	
	private static String dealUrlForMicro(URL file){
		String str = file.getPath();
		try {
			str = URLDecoder.decode(str, "utf-8");
		} catch (UnsupportedEncodingException e) {
			//不会发生
			log.error("不支持的编码格式");
			str = file.getPath();
		}
		if(str.startsWith("/")){
			str = str.substring(1);
		}
		return str;
	}
	
	/**
	 * 打开当前项目目录
	 */
	public static void openProForMicro(){
		String file = new File("").getAbsolutePath();
		openFileForMicro(file);
	}
	
	/**
	 * 关于文件的剪切/移动/重命名
	 * 使用前最好先确认目的目录是否存在
	 * 附带改名功能,附带目录转移功能
	 * 因为是windows平台路径自动处理为\\
	 * 文件：如果存在则覆盖(cmd命令的话是提示，需要进一步的操作)
	 * 目录：如果存在则放进去，不存在则更名
	 * 大文件：移动结束才运行下去（用判断存在不妥移动的时候两边都有）
	 */
	public static boolean moveFileForMicro(String src, String des){
		boolean b = true;
		try {
			String cmd = "move \""+src+"\" \""+des+"\"";
			cmd = cmd.replace("/", "\\");
			Process p = Runtime.getRuntime().exec("cmd /c "+cmd);
			BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream(),"gbk"));
			BufferedReader br2 = new BufferedReader(new InputStreamReader(p.getErrorStream(),"gbk"));
			StringBuilder sb = new StringBuilder();
			int c;
			while ((c = br.read()) != -1) {
				sb.append((char)c);
			}
			br.close();
			//过程信息
			log.info(sb.toString());
			StringBuilder sb2 = new StringBuilder();
			if((c=br2.read())==-1){
				//正确
			}else{
				b = false;
				//有错误
				sb2.append((char)c);
				while ((c = br2.read()) != -1) {
					sb2.append((char)c);
				}
				log.warn(sb2.toString());
			}
			br2.close();
			
		} catch (Exception e) {
			log.error("异常...");
			//此失败不应该有，打印出来看看
			e.printStackTrace();
			b = false;
		}
		return  b;
	}
	
	public static boolean moveFileForMicro(URL src, URL des){
		return moveFileForMicro(dealUrlForMicro(src),dealUrlForMicro(des));
	}
	
	/**
	 * 未完全版本
	 */
	public static boolean createIfNotExists(File file) throws IOException{
		if(file==null) return false;
		if(file.exists()){
			//System.out.println("已存在");
		}else{
			file.createNewFile();
		}
		return true;
	}
}
