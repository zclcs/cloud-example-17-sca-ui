import { ContentTypeEnum } from '/@/enums/httpEnum';
import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  Redis = '/maintenance/redis',
}

export const deleteRedisApi = (params: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.Redis,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data: params,
  });

export const getRedisPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.Redis, params });

export const getRedis = (key: string) =>
  defHttpWithTransform.get<any>({ url: Api.Redis + '/one', params: { key: key } });
