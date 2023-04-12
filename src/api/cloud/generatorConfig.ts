import { defHttpWithTransform } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  generatorConfig = '/system/generatorConfig',
  checkServerName = '/system/generatorConfig/checkServerName',
}

export const createGeneratorConfigApi = (params: any) =>
  defHttpWithTransform.post<void>({
    url: Api.generatorConfig,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const updateGeneratorConfigApi = (params: any) =>
  defHttpWithTransform.put<void>({
    url: Api.generatorConfig,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const deleteGeneratorConfigApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.generatorConfig + '/' + ids,
  });

export const getGeneratorConfigPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.generatorConfig, params });

export const getGeneratorConfigList = () =>
  defHttpWithTransform.get<any>({ url: Api.generatorConfig + '/list' });

export const checkServerName = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.checkServerName, params }, { errorMessageMode: 'none' });
