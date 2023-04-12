import { defHttpWithTransform } from '/@/utils/http/axios';

export const getDictTitle = (params: any) =>
  defHttpWithTransform.get<any>({ url: '/system/dict/dictTextQuery', params });

export const getDict = (params: any) =>
  defHttpWithTransform.get<any>({ url: '/system/dict/dictQuery', params });
