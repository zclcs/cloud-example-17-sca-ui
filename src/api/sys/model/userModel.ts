/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  randomStr: string;
  code: string;
}

export interface RefreshTokenParams {
  grant_type: string;
  refresh_token: string | undefined;
}

/**
 * @description: 权限code
 */
export interface BaseLoginResultModel {
  data: LoginResultModel;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
  expire: number;
  userinfo: GetUserInfoModel;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
}

/**
 * @description: 权限code
 */
export interface PermCodeResultModel {
  data: string[];
}
