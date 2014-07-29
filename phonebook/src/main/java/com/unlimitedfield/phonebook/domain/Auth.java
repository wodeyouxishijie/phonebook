package com.unlimitedfield.phonebook.domain;

import java.io.Serializable;

/**
 * description： 权限
 * 
 * @author y
 * @version createdate：2014/07/29
 */
public class Auth implements Serializable {

	private static final long serialVersionUID = 1L;

	private long addSchool = 1 << 0L;// 添加学校
	private long addClass = 1 << 1L;// 添加班级
	private long addMember = 1 << 2L;// 添加班级成员
	private long updateSchool = 1 << 3L;// 更新学校
	private long updatClass = 1 << 4L;// 更新班级
	private long updateMember = 1 << 5L;// 更新班级成员
	private long deleteSchool = 1 << 6L;// 删除学校
	private long deleteClass = 1 << 7L;// 删除班级
	private long deleteMember = 1 << 8L;// 删除班级成员
	
	public long getAddSchool() {
		return addSchool;
	}
	public void setAddSchool(long addSchool) {
		this.addSchool = addSchool;
	}
	public long getAddClass() {
		return addClass;
	}
	public void setAddClass(long addClass) {
		this.addClass = addClass;
	}
	public long getAddMember() {
		return addMember;
	}
	public void setAddMember(long addMember) {
		this.addMember = addMember;
	}
	public long getUpdateSchool() {
		return updateSchool;
	}
	public void setUpdateSchool(long updateSchool) {
		this.updateSchool = updateSchool;
	}
	public long getUpdatClass() {
		return updatClass;
	}
	public void setUpdatClass(long updatClass) {
		this.updatClass = updatClass;
	}
	public long getUpdateMember() {
		return updateMember;
	}
	public void setUpdateMember(long updateMember) {
		this.updateMember = updateMember;
	}
	public long getDeleteSchool() {
		return deleteSchool;
	}
	public void setDeleteSchool(long deleteSchool) {
		this.deleteSchool = deleteSchool;
	}
	public long getDeleteClass() {
		return deleteClass;
	}
	public void setDeleteClass(long deleteClass) {
		this.deleteClass = deleteClass;
	}
	public long getDeleteMember() {
		return deleteMember;
	}
	public void setDeleteMember(long deleteMember) {
		this.deleteMember = deleteMember;
	}

}
