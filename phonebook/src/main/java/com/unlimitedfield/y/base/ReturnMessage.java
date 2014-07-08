package com.unlimitedfield.y.base;

/**
 * json 返回的结果<br>
 * 这个可以争议一下
 * 
 * <pre>
 * {
 *  "success": true,
 *  "message": "Message sent successfully."
 * }
 * </pre>
 * 
 * @author y
 */
public class ReturnMessage {
	private boolean success;
	private Object message;

	public ReturnMessage() {
	}

	public ReturnMessage(boolean success, Object message) {
		this.success = success;
		this.message = message;
	}

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getMessage() {
		return message;
	}

	public void setMessage(Object message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "ReturnMessage [success=" + success + ", message=" + message
				+ "]";
	}
}
