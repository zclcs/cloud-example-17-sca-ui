import { defHttpWithTransform } from '/@/utils/http/axios';
import { UserInfoModel } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  USER = '/system/user',
  CHECK_MINE_PASSWORD = '/system/user/checkMinePassword/',
  CHECK_PASSWORD = '/system/user/checkPassword/',
  UPDATE_MINE_PASSWORD = '/system/user/updateMinePassword/',
  UPDATE_PASSWORD = '/system/user/updatePassword/',
  UPDATE_USER_STATUS = '/system/user/updateUserStatus/',
  RESET_PASSWORD = '/system/user/resetPassword/',
}

// Get personal center-basic settings

export const accountInfoApi = () =>
  defHttpWithTransform.get<UserInfoModel>({ url: Api.ACCOUNT_INFO });

export const sessionTimeoutApi = () =>
  defHttpWithTransform.post<void>({ url: Api.SESSION_TIMEOUT });

export const createUserApi = (params: UserInfoModel) =>
  defHttpWithTransform.post<void>({
    url: Api.USER,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateUserApi = (params: UserInfoModel) =>
  defHttpWithTransform.put<void>({
    url: Api.USER,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const resetUserPasswordApi = (username: String) =>
  defHttpWithTransform.put<void>({
    url: Api.RESET_PASSWORD + username,
  });

export const checkUserPasswordApi = (username: String, password: String) =>
  defHttpWithTransform.get(
    {
      url: Api.CHECK_PASSWORD + username + '/' + password,
    },
    { errorMessageMode: 'none' },
  );

export const checkMinePasswordApi = (password: String) =>
  defHttpWithTransform.get(
    {
      url: Api.CHECK_MINE_PASSWORD + password,
    },
    { errorMessageMode: 'none' },
  );

export const userPasswordApi = (username: String, password: String) =>
  defHttpWithTransform.put<void>({
    url: Api.UPDATE_PASSWORD + username + '/' + password,
    params: {
      username,
      password,
    },
  });

export const minePasswordApi = (password: String) =>
  defHttpWithTransform.put<void>(
    {
      url: Api.UPDATE_MINE_PASSWORD + password,
    },
    { errorMessageMode: 'none' },
  );

export const userStatusApi = (username: String) =>
  defHttpWithTransform.put<void>({
    url: Api.UPDATE_USER_STATUS + username,
  });

export const deleteUserApi = (userIds: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.USER + '/' + userIds,
  });
