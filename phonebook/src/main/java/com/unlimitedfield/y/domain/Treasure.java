package com.unlimitedfield.y.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * <pre>
 * description：
 * 	宝库里面放着一堆宝具
 * </pre>
 * 
 * @author y
 * @version createdate：2014/05/04
 */
@SuppressWarnings("unused")
public class Treasure implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;// uuid/long
	private Set<TreasureAlias> treasureAliases = new HashSet<TreasureAlias>();// 对象描述集

	private String md5;// md5 唯一 32
	private String suffix;// 后缀(就目前系统来说后缀决定打开方式) 8
	private Long size;// 文件大小(单位byte)
	private String location;// 位置 255
	private Date gmtCreate;// 创建时间

}
