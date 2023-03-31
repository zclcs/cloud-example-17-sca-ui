import {
  UserParams,
  UserLogParams,
  DeptTreeItem,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptTreeGetResultModel,
  UserPageGetResultModel,
  UserLogPageGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  UserPage = '/system/user',
  UserLogPage = '/system/log',
  checkUsername = '/system/user/checkUsername',
  checkUserMobile = '/system/user/checkUserMobile',
  checkRoleName = '/system/role/checkRoleName',
  checkRoleCode = '/system/role/checkRoleCode',
  DeptTree = '/system/dept/tree',
  DeptOptions = '/system/dept/options',
  setRoleStatus = '/system/setRoleStatus',
  MenuTree = '/system/menu/tree',
  RolePageList = '/system/role',
  RoleOptions = '/system/role/options',
}

export const getUserPage = (params: UserParams) =>
  defHttpWithTransform.get<UserPageGetResultModel>({ url: Api.UserPage, params });

export const getUserLogPage = (params: UserLogParams) =>
  defHttpWithTransform.get<UserLogPageGetResultModel>({ url: Api.UserLogPage, params });

export const getDeptTree = (params?: DeptTreeItem) =>
  defHttpWithTransform.get<DeptTreeGetResultModel>({ url: Api.DeptTree, params });

export const getDeptOptions = (params?: DeptListItem) =>
  defHttpWithTransform.get<DeptListItem>({ url: Api.DeptOptions, params });

export const getMenuTree = (params?: MenuParams) =>
  defHttpWithTransform.get<MenuListGetResultModel>({ url: Api.MenuTree, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttpWithTransform.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getRoleOptions = (params?: RoleParams) =>
  defHttpWithTransform.get<RoleListGetResultModel>({ url: Api.RoleOptions, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttpWithTransform.post({ url: Api.setRoleStatus, params: { id, status } });

export const checkUsername = (params: any) =>
  defHttpWithTransform.get({ url: Api.checkUsername, params }, { errorMessageMode: 'none' });

export const checkUserMobile = (params: any) =>
  defHttpWithTransform.get({ url: Api.checkUserMobile, params }, { errorMessageMode: 'none' });

export const checkRoleName = (params: any) =>
  defHttpWithTransform.get({ url: Api.checkRoleName, params }, { errorMessageMode: 'none' });

export const checkRoleCode = (params: any) =>
  defHttpWithTransform.get({ url: Api.checkRoleCode, params }, { errorMessageMode: 'none' });

export const checkMenuCode = (params: any) =>
  defHttpWithTransform.get(
    { url: '/system/menu/checkMenuCode', params },
    { errorMessageMode: 'none' },
  );
export const checkDeptName = (params: any) =>
  defHttpWithTransform.get(
    { url: '/system/menu/checkDeptName', params },
    { errorMessageMode: 'none' },
  );
export const checkDeptCode = (params: any) =>
  defHttpWithTransform.get(
    { url: '/system/dept/checkDeptCode', params },
    { errorMessageMode: 'none' },
  );
