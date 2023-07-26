import { defHttp, defNoTokenHttp, defHttpWithTransform } from '/@/utils/http/axios';
import { BaseLoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/system/login/token/byUsername',
  Logout = '/system/logout',
  GetUserInfo = '/system/user/findUserInfo',
  GetPermCode = '/system/user/permissions',
}

/**
 * @description: user login api
 */
export function loginApi(params: object, data: object, mode: ErrorMessageMode = 'modal') {
  return defNoTokenHttp.post<BaseLoginResultModel>(
    {
      url: Api.Login,
      params,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttpWithTransform.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

/**
 * 获取权限
 * @returns 权限
 */
export function getPermCode() {
  return defHttpWithTransform.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.delete({ url: Api.Logout });
}
