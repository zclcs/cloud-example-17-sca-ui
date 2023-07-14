import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  Redis = '/maintenance/redis',
}

export const deleteRedisApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.Redis + '/' + ids,
  });

export const getRedisPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.Redis, params });

export const getRedis = (key: string) =>
  defHttpWithTransform.get<any>({ url: Api.Redis + '/one' + '/' + key });
