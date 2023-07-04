import { defHttpWithTransform } from '/@/utils/http/axios';

enum Api {
  LOGINLOG = '/system/loginLog',
}

export const deleteLoginLogApi = (ids: String) =>
  defHttpWithTransform.delete<void>({
    url: Api.LOGINLOG + '/' + ids,
  });

export const getLoginLogPage = (params: any) =>
  defHttpWithTransform.get<any>({ url: Api.LOGINLOG, params });
