import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  NACOS = '/maintenance/nacos',
}

export const getConfigPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.NACOS + '/configs', params });

export const getServicePage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.NACOS + '/services', params });

export const getConfig = (dataId: string) =>
  defHttpWithTransform.get<any>({ url: Api.NACOS + '/config/detail', params: { dataId } });

export const updateConfig = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.NACOS + '/config',
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });
