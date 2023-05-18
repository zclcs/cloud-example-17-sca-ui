import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  NACOS = '/system/nacos',
}

export const getConfigPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.NACOS + '/configs', params });

export const getServicePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.NACOS + '/services', params });
