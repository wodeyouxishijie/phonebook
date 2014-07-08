package com.unlimitedfield.y.base;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;

/**
 * 下载信息
 * 
 * @author y
 * 
 */
public class DownLoadConfig {
	private InputStream inputStream;
	private String contentType = "application/octet-stream";
	// 下载显示的文件名
	private String fileName;

	public DownLoadConfig() {
	}

	public DownLoadConfig(InputStream inputStream, String fileName) {
		setInputStream(inputStream);
		setFileName(fileName);
	}

	// getter setter
	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		// 可处理中文
		try {
			fileName = new String(fileName.getBytes("UTF-8"), "iso-8859-1");
//			fileName = URLEncoder.encode(fileName, "utf-8");
		} catch (UnsupportedEncodingException e1) {
			fileName = "ErrorEncoding";
		}
		this.fileName = "attachment;filename=\"" + fileName + "\"";
	}

}
