import { defHttp, defNoTokenHttp, defHttpWithTransform } from '/@/utils/http/axios';
import { LoginResultModel, GetUserInfoModel, RefreshTokenParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/auth/oauth2/token',
  Logout = '/auth/token/logout',
  GetUserInfo = '/system/user/info',
  GetPermCode = '/system/menu/permissions',
}

/**
 * @description: user login api
 */
export function loginApi(params: object, data: object, mode: ErrorMessageMode = 'modal') {
  return defNoTokenHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      headers: {
        authorization: 'Basic emNsY3M6MTIzNDU2',
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
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

export function refreshTokenApi(params: RefreshTokenParams) {
  return defNoTokenHttp.post<LoginResultModel>({
    url: Api.Login,
    headers: {
      authorization: 'Basic emNsY3M6MTIzNDU2',
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    params,
  });
}

export function doLogout() {
  return defHttp.delete({ url: Api.Logout });
}
