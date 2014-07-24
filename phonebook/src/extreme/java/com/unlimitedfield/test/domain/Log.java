package com.unlimitedfield.test.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 测试的时候用的
 * @author y
 *
 */
@Entity
@Table(name = "tbl_test_log")
public class Log {
	private Long id;
	private String message;

	@Id
	@GeneratedValue
	@Column(name = "id", unique = true, nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "message", length = 255)
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "TestLogDomain [id=" + id + ", message=" + message + "]";
	}

}
