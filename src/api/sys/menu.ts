import { defHttpWithTransform } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/system/menu/routers',
}

/**
 * @description: Get user menu based on id
 */
export const getMenuList = () => {
  return defHttpWithTransform.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
