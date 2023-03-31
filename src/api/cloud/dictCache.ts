import { defHttp } from '/@/utils/http/axios';

export const getDictTitle = (params: any) =>
  defHttp.get<any>({ url: '/system/dict/dictTextQuery', params });

export const getDict = (params: any) => defHttp.get<any>({ url: '/system/dict/dictQuery', params });
