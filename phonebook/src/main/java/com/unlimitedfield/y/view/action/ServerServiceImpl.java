package com.unlimitedfield.y.view.action;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

import org.jfree.util.Log;
import org.junit.Test;
import org.springframework.stereotype.Service;

/**
 * 服务端
 * @author y
 *
 */
@Service("serverService")
public class ServerServiceImpl implements ServerService{
	private ServerSocket socket;
	private int port = 19888;
	
	public ServerServiceImpl(){
	}

	private void start(){
		try {
			socket = new ServerSocket(port);
		} catch (IOException e) {
//			e.printStackTrace();
			//打开端口异常
			Log.warn(getExceptionDetail(e));
		}
		
		try {
			Log.warn("等待客户端链接...");
			Socket s = this.socket.accept();
			InputStream in = s.getInputStream();
			OutputStream out = s.getOutputStream();
			PrintWriter writer = new PrintWriter(out);
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));
			
			String info = reader.readLine();
			System.out.println(info);
			
			writer.println("hi,Client！");
			writer.flush();
			
			
			info = reader.readLine();
			System.out.println(info);
			
			writer.println("再见！客户端");
			writer.flush();
			Log.warn("通信结束。");
			//socket.close();
		} catch (Exception e) {
			Log.warn("start err");
			Log.warn(getExceptionDetail(e));
		}
	}
	
	
	
	/**
	 * 测试实例
	 * @param args
	 */
	public static void main(String[] args) {
//		Server demo = new Server();
//		demo.start();
		
		new Thread(){
			public void run() {
				ServerServiceImpl demo = new ServerServiceImpl();
				demo.start();
			};
		}.start();
		
		System.out.println(".....");
	}
	
	/**
	 * 测试关于显示全部exception的详细信息
	 * @throws Exception
	 */
	@Test
	public void test_name() throws Exception {
		try {
			System.out.println(1/0);
		} catch (Exception e) {
//			e.printStackTrace();
//			System.out.println(e.getClass().getName());
//			System.out.println(e.getMessage());
//			for(StackTraceElement o:e.getStackTrace()){
//				System.out.println(o);
//			}
			System.out.println(getExceptionDetail(e));
		}
	}
	
	/**
	 * 把exception分装成string
	 */
	private String getExceptionDetail(Exception e){
		StringBuilder sb = new StringBuilder();
		sb.append(e.getClass().getName());
		sb.append(":");
		sb.append(e.getMessage());
		sb.append("\n");
		for(StackTraceElement o:e.getStackTrace()){
			sb.append(o.toString());
			sb.append("\n");
		}
		return sb.toString();
	}

	@Override
	public void startServer() {
		start();
//		Thread t = new Thread(){
//			public void run() {
//				ServerServiceImpl demo = new ServerServiceImpl();
//				demo.start();
//			};
//		};
//		t.start();
//		System.out.println(t.getName());
	}
}
