/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  grant_type: string;
  scope: string;
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
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
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
  roleNames: string[];
}

/**
 * @description: 权限code
 */
export interface PermCodeResultModel {
  data: string[];
}
