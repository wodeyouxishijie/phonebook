package com.unlimitedfield.y.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * <pre>
 * description：
 * 	宝具有着各自的别名
 * </pre>
 * 
 * @author y
 * @version createdate：2014/05/04
 */
@SuppressWarnings("unused")
public class TreasureAlias implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;// uuid/long
	private Treasure treasure;// 基础对象(真名)

	private String name;// 文件名称 255
	private String description;// 描述 255(概述)
	private Date gmtCreate;// 上传时间/别名的创建时间

}
