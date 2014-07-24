package com.unlimitedfield.y.util.material;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;

import org.apache.log4j.Logger;

import com.unlimitedfield.y.util.io.Pathu;

/**
 * <pre>
 * description：
 * 加密解密临时的
 * </pre>
 * 
 * @author y
 * @version createdate：2014/07/17 
 */
public class Cipheru {
	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(Cipheru.class);
	
	private static SecretKey key;
	
	static{
		try {
			key = getKey();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static SecretKey getKey() throws  Exception{
		ObjectInputStream ois = new ObjectInputStream(new FileInputStream(Pathu.getClassPath(Cipheru.class).getPath()+File.separator+Cipheru.class.getSimpleName()+".tc"));
		SecretKey key = (SecretKey) ois.readObject();
		return key;
	}
	
	public static byte[] encrypt(byte[] bytes) throws Exception{
//		SecretKey key = getKey();
		Cipher cipher = Cipher.getInstance("DESede");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		return cipher.doFinal(bytes);
	}
	
	public static byte[] decrypt(byte[] bytes) throws Exception{
//		SecretKey key = getKey();
		Cipher cipher = Cipher.getInstance("DESede");
		cipher.init(Cipher.DECRYPT_MODE, key);
		return cipher.doFinal(bytes);
	}
}

